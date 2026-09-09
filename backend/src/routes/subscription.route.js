import express from "express";
import {
  getPlans,
  getSubscriptionStatus,
  changePlan,
} from "../controllers/subscriptionController.js";
import { protect } from "../middleware/auth.middleware.js";
import { requireTenant } from "../middleware/tenant.middleware.js";

const router = express.Router();

// Public plans list
router.get("/plans", getPlans);

// Authenticated tenant subscription operations
router.get("/status", protect, requireTenant, getSubscriptionStatus);
router.post("/change-plan", protect, requireTenant, changePlan);

export default router;
