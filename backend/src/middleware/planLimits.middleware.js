import User from "../models/User.js";
import Project from "../models/Project.js";
import Lead from "../models/Lead.js";

/**
 * Middleware to check if the current tenant has reached their plan's user limit.
 */
export const checkUserLimit = async (req, res, next) => {
  try {
    if (!req.tenant) return next();

    const maxUsers = req.tenant.limits?.maxUsers || 3;
    const currentUsers = await User.countDocuments({ tenantId: req.tenant._id, status: { $ne: "Suspended" } });

    if (currentUsers >= maxUsers) {
      return res.status(403).json({
        success: false,
        message: `Plan limit reached! Your ${req.tenant.plan} plan allows up to ${maxUsers} team members. Please upgrade your subscription to add more members.`,
        limitReached: true,
        limitType: "users",
        currentUsage: currentUsers,
        maxAllowed: maxUsers,
      });
    }

    next();
  } catch (error) {
    console.error("User Limit Check Error:", error);
    next();
  }
};

/**
 * Middleware to check if the current tenant has reached their plan's project limit.
 */
export const checkProjectLimit = async (req, res, next) => {
  try {
    if (!req.tenant) return next();

    const maxProjects = req.tenant.limits?.maxProjects || 5;
    const currentProjects = await Project.countDocuments({ tenantId: req.tenant._id, isActive: true });

    if (currentProjects >= maxProjects) {
      return res.status(403).json({
        success: false,
        message: `Project limit reached! Your ${req.tenant.plan} plan allows up to ${maxProjects} active projects. Please upgrade your subscription to create more projects.`,
        limitReached: true,
        limitType: "projects",
        currentUsage: currentProjects,
        maxAllowed: maxProjects,
      });
    }

    next();
  } catch (error) {
    console.error("Project Limit Check Error:", error);
    next();
  }
};
