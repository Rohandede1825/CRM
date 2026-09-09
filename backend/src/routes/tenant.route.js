import express from "express";
import {
  registerWorkspace,
  getWorkspaceSettings,
  updateWorkspaceSettings,
  getWorkspaceTeam,
  addTeamMember,
} from "../controllers/tenantController.js";
import { protect } from "../middleware/auth.middleware.js";
import { requireTenant } from "../middleware/tenant.middleware.js";
import { checkUserLimit } from "../middleware/planLimits.middleware.js";

const router = express.Router();

// Public workspace onboarding
router.post("/register-workspace", registerWorkspace);

// Authenticated tenant settings & team
router.get("/settings", protect, requireTenant, getWorkspaceSettings);
router.put("/settings", protect, requireTenant, updateWorkspaceSettings);
router.get("/team", protect, requireTenant, getWorkspaceTeam);
router.post("/team", protect, requireTenant, checkUserLimit, addTeamMember);

export default router;
