import Tenant from "../models/Tenant.js";

/**
 * Middleware to extract and verify tenant context for multi-tenant requests.
 * Attaches `req.tenant` and `req.tenantId` to the request object.
 */
export const requireTenant = async (req, res, next) => {
  try {
    let tenantId = null;

    // 1. From authenticated user
    if (req.user && req.user.tenantId) {
      tenantId = req.user.tenantId;
    }
    // 2. From header (x-tenant-id)
    else if (req.headers["x-tenant-id"]) {
      tenantId = req.headers["x-tenant-id"];
    }
    // 3. From query param (?tenantId=...)
    else if (req.query && req.query.tenantId) {
      tenantId = req.query.tenantId;
    }

    if (!tenantId) {
      // For backward compatibility or single-workspace dev default:
      // Try finding or creating a default tenant
      let defaultTenant = await Tenant.findOne({ slug: "default-workspace" });
      if (!defaultTenant) {
        defaultTenant = await Tenant.create({
          name: "Dsofts IT Workspace",
          slug: "default-workspace",
          ownerId: req.user ? req.user._id : "000000000000000000000000",
          plan: "Professional",
          subscriptionStatus: "active",
          settings: {
            companyName: "Dsofts IT",
            tagline: "Innovative Software & Spaces",
            email: "info@dsoftsit.com",
            phone: "+91 86055 26603",
          },
        });
      }
      tenantId = defaultTenant._id;
      req.tenant = defaultTenant;
      req.tenantId = defaultTenant._id;
      return next();
    }

    // Verify tenant exists and is active
    const tenant = await Tenant.findById(tenantId);
    if (!tenant) {
      return res.status(404).json({
        success: false,
        message: "Tenant workspace not found or has been removed.",
      });
    }

    if (!tenant.isActive) {
      return res.status(403).json({
        success: false,
        message: "This workspace is currently deactivated. Please contact support.",
      });
    }

    req.tenant = tenant;
    req.tenantId = tenant._id;
    next();
  } catch (error) {
    console.error("Tenant Middleware Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error resolving workspace tenant.",
    });
  }
};

/**
 * Utility helper to inject tenant scoping into mongoose queries
 */
export const scopeTenant = (req, baseQuery = {}) => {
  if (req.tenantId) {
    return { ...baseQuery, tenantId: req.tenantId };
  }
  return baseQuery;
};
