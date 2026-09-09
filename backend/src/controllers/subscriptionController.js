import Tenant from "../models/Tenant.js";
import User from "../models/User.js";
import Project from "../models/Project.js";
import Lead from "../models/Lead.js";

const PLANS_CONFIG = [
  {
    id: "Starter",
    name: "Starter Studio",
    price: 1999,
    interval: "month",
    priceLabel: "₹1,999 / month",
    description: "Perfect for boutique interior practices and growing design studios.",
    features: [
      "Up to 5 Team Members",
      "15 Active Projects",
      "BOQ & Itemized Space Estimator",
      "Automated Tax Invoicing (GST)",
      "Custom Brand Logo & Letterhead",
      "Excel & CSV Data Exports",
      "Standard Email Support (24h)",
    ],
    limits: {
      maxUsers: 5,
      maxProjects: 15,
      maxStorageMb: 2000,
      maxLeadsPerMonth: 200,
    },
    popular: false,
  },
  {
    id: "Starter",
    name: "Starter Plan",
    price: 1999,
    interval: "month",
    priceLabel: "₹1,999 / month",
    description: "Perfect for growing interior firms and design studios.",
    features: [
      "Up to 5 Team Members",
      "15 Active Projects",
      "Custom Brand Logo & Colors",
      "Automated Tax Invoicing (GST)",
      "Excel & CSV Data Exports",
      "Standard Email Support (24h)",
    ],
    limits: {
      maxUsers: 5,
      maxProjects: 15,
      maxStorageMb: 2000,
      maxLeadsPerMonth: 200,
    },
    popular: false,
  },
  {
    id: "Professional",
    name: "Professional Plan",
    price: 4999,
    interval: "month",
    priceLabel: "₹4,999 / month",
    description: "Designed for scaling architecture & turnkey companies.",
    features: [
      "Up to 20 Team Members",
      "100 Active Projects",
      "Full Custom PDF Branding & QR Codes",
      "Advanced BI Reports & Forecasting",
      "Priority Email & Chat Support",
      "Multi-space BOQ & Auto Revisions",
    ],
    limits: {
      maxUsers: 20,
      maxProjects: 100,
      maxStorageMb: 10000,
      maxLeadsPerMonth: 1000,
    },
    popular: true,
  },
  {
    id: "Enterprise",
    name: "Enterprise Plan",
    price: 9999,
    interval: "month",
    priceLabel: "₹9,999 / month",
    description: "Maximum power with unlimited capacity and dedicated support.",
    features: [
      "Unlimited Team Members",
      "Unlimited Active Projects",
      "Dedicated Account Manager",
      "Full White-label & Custom Domain",
      "Custom REST API Access",
      "99.9% Uptime SLA",
    ],
    limits: {
      maxUsers: 99999,
      maxProjects: 99999,
      maxStorageMb: 100000,
      maxLeadsPerMonth: 99999,
    },
    popular: false,
  },
];

/**
 * Get available plans catalog
 * GET /api/subscription/plans
 */
export const getPlans = async (req, res) => {
  return res.status(200).json({
    success: true,
    data: PLANS_CONFIG,
  });
};

/**
 * Get current subscription status, limits, and live usage
 * GET /api/subscription/status
 */
export const getSubscriptionStatus = async (req, res) => {
  try {
    const tenant = req.tenant;
    if (!tenant) {
      return res.status(404).json({ success: false, message: "Workspace not found" });
    }

    // Calculate real-time usage
    const userCount = await User.countDocuments({ tenantId: tenant._id, status: { $ne: "Suspended" } });
    const projectCount = await Project.countDocuments({ tenantId: tenant._id, isActive: true });
    const leadCount = await Lead.countDocuments({ tenantId: tenant._id });

    // Calculate trial days remaining
    let daysRemaining = 0;
    if (tenant.subscriptionStatus === "trialing" && tenant.trialEndsAt) {
      const diffTime = new Date(tenant.trialEndsAt) - new Date();
      daysRemaining = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
    }

    return res.status(200).json({
      success: true,
      data: {
        plan: tenant.plan,
        subscriptionStatus: tenant.subscriptionStatus,
        billingCycle: tenant.billingCycle,
        trialEndsAt: tenant.trialEndsAt,
        daysRemaining,
        currentPeriodEnd: tenant.currentPeriodEnd,
        limits: tenant.limits,
        usage: {
          userCount,
          projectCount,
          leadCount,
          storageUsedMb: tenant.usage?.storageUsedMb || 0,
        },
        planConfig: PLANS_CONFIG.find((p) => p.id === tenant.plan) || PLANS_CONFIG[0],
      },
    });
  } catch (error) {
    console.error("Get Subscription Status Error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Upgrade or Change Subscription Plan
 * POST /api/subscription/change-plan
 */
export const changePlan = async (req, res) => {
  try {
    const { plan, billingCycle = "monthly" } = req.body;
    const tenant = req.tenant;

    if (!tenant) {
      return res.status(404).json({ success: false, message: "Workspace not found" });
    }

    const selectedPlan = PLANS_CONFIG.find((p) => p.id === plan);
    if (!selectedPlan) {
      return res.status(400).json({ success: false, message: "Invalid plan selected" });
    }

    // Update tenant plan and limits
    tenant.plan = selectedPlan.id;
    tenant.limits = selectedPlan.limits;
    tenant.billingCycle = billingCycle;
    tenant.subscriptionStatus = "active";
    tenant.currentPeriodEnd = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    await tenant.save();

    return res.status(200).json({
      success: true,
      message: `Successfully upgraded to ${selectedPlan.name}!`,
      data: {
        plan: tenant.plan,
        subscriptionStatus: tenant.subscriptionStatus,
        limits: tenant.limits,
      },
    });
  } catch (error) {
    console.error("Change Plan Error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
