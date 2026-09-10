import express from "express";
import {
  getPlans,
  getSubscriptionStatus,
  changePlan,
  createRazorpayOrder,
  verifyRazorpayPayment,
  getPaymentHistory,
} from "../controllers/subscriptionController.js";
import { protect, restrictTo } from "../middleware/auth.middleware.js";
import { requireTenant } from "../middleware/tenant.middleware.js";

const router = express.Router();

// Public plans list
router.get("/plans", getPlans);

// Authenticated tenant subscription operations
router.get("/status", protect, requireTenant, getSubscriptionStatus);
router.post("/change-plan", protect, requireTenant, restrictTo("Admin", "Super Admin"), changePlan);
router.post("/razorpay/order", protect, requireTenant, restrictTo("Admin", "Super Admin"), createRazorpayOrder);
router.post("/razorpay/verify", protect, requireTenant, restrictTo("Admin", "Super Admin"), verifyRazorpayPayment);
router.get("/payments", protect, requireTenant, restrictTo("Admin", "Super Admin"), getPaymentHistory);

export default router;
