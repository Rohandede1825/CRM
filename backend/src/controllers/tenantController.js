import Tenant from "../models/Tenant.js";
import User from "../models/User.js";
import CompanySetting from "../models/CompanySetting.js";
import jwt from "jsonwebtoken";

const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
      tenantId: user.tenantId,
      type: "User",
    },
    process.env.JWT_SECRET || "supersecretjwtkey123",
    { expiresIn: "7d" }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
      tenantId: user.tenantId,
      type: "User",
    },
    process.env.JWT_REFRESH_SECRET || "supersecretjwtrefreshkey123",
    { expiresIn: "30d" }
  );
};

/**
 * Register a new SaaS Workspace (Company / Agency)
 * POST /api/tenant/register-workspace
 */
export const registerWorkspace = async (req, res) => {
  try {
    const {
      workspaceName,
      slug,
      adminName,
      email,
      password,
      plan = "Free",
      phone,
      industry,
    } = req.body;

    if (!workspaceName || !adminName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Workspace name, admin name, email, and password are required.",
      });
    }

    // Check if email already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "An account with this email already exists.",
      });
    }

    // Generate slug from workspaceName if not provided
    const workspaceSlug =
      slug ||
      workspaceName
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "") + `-${Math.floor(1000 + Math.random() * 9000)}`;

    // Verify slug uniqueness
    const existingTenant = await Tenant.findOne({ slug: workspaceSlug });
    if (existingTenant) {
      return res.status(400).json({
        success: false,
        message: "Workspace slug already in use. Please choose another name or handle.",
      });
    }

    const planLimits = Tenant.getPlanLimits(plan);

    // Create Tenant
    const tenant = new Tenant({
      name: workspaceName,
      slug: workspaceSlug,
      ownerId: null, // assigned right after user creation
      plan,
      subscriptionStatus: plan === "Free" ? "trialing" : "active",
      limits: planLimits,
      settings: {
        companyName: workspaceName,
        email,
        phone: phone || "",
        brandColor: "#6366f1",
      },
    });

    // Create Admin User
    const user = new User({
      name: adminName,
      email,
      password,
      role: "Admin",
      tenantId: tenant._id,
      isTenantOwner: true,
      status: "Active",
    });

    await user.save();

    // Link ownerId
    tenant.ownerId = user._id;
    await tenant.save();

    // Create initial CompanySetting
    await CompanySetting.create({
      companyName: workspaceName,
      email,
      phone: phone || "",
      tenantId: tenant._id,
    });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    user.password = undefined;

    return res.status(201).json({
      success: true,
      message: "Workspace registered successfully!",
      data: {
        user,
        tenant,
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    console.error("Register Workspace Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to register workspace",
    });
  }
};

/**
 * Get current workspace settings & branding
 * GET /api/tenant/settings
 */
export const getWorkspaceSettings = async (req, res) => {
  try {
    const tenant = req.tenant;
    if (!tenant) {
      return res.status(404).json({ success: false, message: "Workspace not found" });
    }

    return res.status(200).json({
      success: true,
      data: {
        tenantId: tenant._id,
        name: tenant.name,
        slug: tenant.slug,
        plan: tenant.plan,
        subscriptionStatus: tenant.subscriptionStatus,
        trialEndsAt: tenant.trialEndsAt,
        limits: tenant.limits,
        usage: tenant.usage,
        settings: tenant.settings,
      },
    });
  } catch (error) {
    console.error("Get Workspace Settings Error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Update workspace settings & branding
 * PUT /api/tenant/settings
 */
export const updateWorkspaceSettings = async (req, res) => {
  try {
    const tenant = req.tenant;
    const { settings, name } = req.body;

    if (!tenant) {
      return res.status(404).json({ success: false, message: "Workspace not found" });
    }

    if (name) tenant.name = name;
    if (settings) {
      tenant.settings = { ...tenant.settings.toObject(), ...settings };
    }

    await tenant.save();

    // Also sync to CompanySetting if exists
    await CompanySetting.findOneAndUpdate(
      { tenantId: tenant._id },
      {
        companyName: tenant.settings?.companyName || tenant.name,
        email: tenant.settings?.email,
        phone: tenant.settings?.phone,
        address: tenant.settings?.address?.street,
        gstNumber: tenant.settings?.taxation?.gstNumber,
        panNumber: tenant.settings?.taxation?.panNumber,
        bankName: tenant.settings?.bankDetails?.bankName,
        accountHolderName: tenant.settings?.bankDetails?.accountName,
        accountNumber: tenant.settings?.bankDetails?.accountNumber,
        ifscCode: tenant.settings?.bankDetails?.ifscCode,
        branch: tenant.settings?.bankDetails?.branch,
        upiId: tenant.settings?.bankDetails?.upiId,
      },
      { upsert: true }
    );

    return res.status(200).json({
      success: true,
      message: "Workspace settings updated successfully",
      data: tenant,
    });
  } catch (error) {
    console.error("Update Workspace Settings Error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Get all team members in the workspace
 * GET /api/tenant/team
 */
export const getWorkspaceTeam = async (req, res) => {
  try {
    const users = await User.find({ tenantId: req.tenant._id })
      .select("-password")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.error("Get Workspace Team Error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Add / Invite team member to workspace
 * POST /api/tenant/team
 */
export const addTeamMember = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "A user with this email address already exists.",
      });
    }

    const user = new User({
      name,
      email,
      password: password || "Welcome@123",
      role: role || "Sales",
      tenantId: req.tenant._id,
      isTenantOwner: false,
      status: "Active",
    });

    await user.save();

    // Update usage
    await Tenant.findByIdAndUpdate(req.tenant._id, {
      $inc: { "usage.userCount": 1 },
    });

    user.password = undefined;

    return res.status(201).json({
      success: true,
      message: "Team member added successfully",
      data: user,
    });
  } catch (error) {
    console.error("Add Team Member Error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
