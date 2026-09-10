import Tenant from "../models/Tenant.js";
import User from "../models/User.js";
import Project from "../models/Project.js";
import Lead from "../models/Lead.js";
import SubscriptionPayment from "../models/SubscriptionPayment.js";
import Razorpay from "razorpay";
import crypto from "crypto";

const PLANS_CONFIG = [
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

const getPlanAndAmount = (planId, billingCycle) => {
  const plan = PLANS_CONFIG.find((item) => item.id === planId);
  if (!plan) return null;

  const amount = billingCycle === "yearly" ? Math.round(plan.price * 12 * 0.8) : plan.price;
  return { plan, amount };
};

const getRazorpayClient = () => {
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) return null;
  return new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SECRET });
};

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

    return res.status(400).json({
      success: false,
      message: "Plan changes require a verified payment. Start checkout from the billing page.",
    });
  } catch (error) {
    console.error("Change Plan Error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

/** Create a Razorpay order for a paid workspace plan. */
export const createRazorpayOrder = async (req, res) => {
  try {
    const { plan: planId, billingCycle = "monthly" } = req.body;
    if (!["monthly", "yearly"].includes(billingCycle)) {
      return res.status(400).json({ success: false, message: "Invalid billing cycle" });
    }

    const selection = getPlanAndAmount(planId, billingCycle);
    if (!selection) return res.status(400).json({ success: false, message: "Invalid paid plan selected" });

    const razorpay = getRazorpayClient();
    if (!razorpay) {
      return res.status(503).json({ success: false, message: "Razorpay is not configured. Add Razorpay API keys to the server environment." });
    }

    const receipt = `sub_${req.tenant._id.toString().slice(-8)}_${Date.now()}`;
    const order = await razorpay.orders.create({
      amount: selection.amount * 100,
      currency: "INR",
      receipt,
      notes: { tenantId: req.tenant._id.toString(), plan: planId, billingCycle },
    });

    await SubscriptionPayment.create({
      tenantId: req.tenant._id,
      userId: req.user._id,
      plan: planId,
      billingCycle,
      amount: selection.amount,
      receipt,
      razorpayOrderId: order.id,
    });

    return res.status(201).json({
      success: true,
      data: {
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        keyId: process.env.RAZORPAY_KEY_ID,
        planName: selection.plan.name,
      },
    });
  } catch (error) {
    console.error("Create Razorpay Order Error:", error);
    return res.status(500).json({ success: false, message: "Unable to start Razorpay checkout." });
  }
};

/** Verify Razorpay's checkout signature, then activate the workspace plan. */
export const verifyRazorpayPayment = async (req, res) => {
  try {
    const { razorpay_payment_id: paymentId, razorpay_order_id: orderId, razorpay_signature: signature } = req.body;
    if (!paymentId || !orderId || !signature) {
      return res.status(400).json({ success: false, message: "Incomplete payment verification details." });
    }

    const payment = await SubscriptionPayment.findOne({ razorpayOrderId: orderId, tenantId: req.tenant._id });
    if (!payment) return res.status(404).json({ success: false, message: "Payment order was not found." });
    if (payment.status === "paid") return res.status(200).json({ success: true, message: "Payment was already verified." });

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${payment.razorpayOrderId}|${paymentId}`)
      .digest("hex");
    const verified = signature.length === expectedSignature.length && crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature));
    if (!verified) {
      payment.status = "failed";
      await payment.save();
      return res.status(400).json({ success: false, message: "Payment signature could not be verified." });
    }

    const selection = getPlanAndAmount(payment.plan, payment.billingCycle);
    if (!selection) return res.status(400).json({ success: false, message: "The plan attached to this payment is invalid." });

    const periodEnd = new Date();
    if (payment.billingCycle === "yearly") periodEnd.setFullYear(periodEnd.getFullYear() + 1);
    else periodEnd.setMonth(periodEnd.getMonth() + 1);

    req.tenant.plan = payment.plan;
    req.tenant.limits = selection.plan.limits;
    req.tenant.billingCycle = payment.billingCycle;
    req.tenant.subscriptionStatus = "active";
    req.tenant.currentPeriodEnd = periodEnd;
    payment.status = "paid";
    payment.razorpayPaymentId = paymentId;
    payment.paidAt = new Date();
    await Promise.all([req.tenant.save(), payment.save()]);

    return res.status(200).json({
      success: true,
      message: `${selection.plan.name} is now active.`,
      data: { plan: req.tenant.plan, billingCycle: req.tenant.billingCycle, currentPeriodEnd: req.tenant.currentPeriodEnd },
    });
  } catch (error) {
    console.error("Verify Razorpay Payment Error:", error);
    return res.status(500).json({ success: false, message: "Unable to verify the payment." });
  }
};

export const getPaymentHistory = async (req, res) => {
  try {
    const payments = await SubscriptionPayment.find({ tenantId: req.tenant._id, status: "paid" })
      .sort({ paidAt: -1 })
      .limit(10)
      .select("plan billingCycle amount currency razorpayPaymentId paidAt");
    return res.status(200).json({ success: true, data: payments });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Unable to retrieve payment history." });
  }
};
