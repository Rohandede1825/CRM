import mongoose from "mongoose";

const tenantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    plan: {
      type: String,
      enum: ["Free", "Starter", "Professional", "Enterprise"],
      default: "Free",
    },
    subscriptionStatus: {
      type: String,
      enum: ["trialing", "active", "past_due", "canceled"],
      default: "trialing",
    },
    billingCycle: {
      type: String,
      enum: ["monthly", "yearly"],
      default: "monthly",
    },
    trialEndsAt: {
      type: Date,
      default: () => new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days trial
    },
    currentPeriodEnd: {
      type: Date,
      default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
    limits: {
      maxUsers: { type: Number, default: 3 },
      maxProjects: { type: Number, default: 5 },
      maxStorageMb: { type: Number, default: 500 },
      maxLeadsPerMonth: { type: Number, default: 50 },
    },
    usage: {
      userCount: { type: Number, default: 1 },
      projectCount: { type: Number, default: 0 },
      storageUsedMb: { type: Number, default: 0 },
    },
    settings: {
      companyName: { type: String, default: "" },
      tagline: { type: String, default: "" },
      logoUrl: { type: String, default: "" },
      brandColor: { type: String, default: "#6366f1" },
      currency: { type: String, default: "INR" },
      currencySymbol: { type: String, default: "₹" },
      timezone: { type: String, default: "Asia/Kolkata" },
      phone: { type: String, default: "" },
      email: { type: String, default: "" },
      website: { type: String, default: "" },
      address: {
        street: { type: String, default: "" },
        city: { type: String, default: "" },
        state: { type: String, default: "" },
        country: { type: String, default: "India" },
        pincode: { type: String, default: "" },
      },
      taxation: {
        gstNumber: { type: String, default: "" },
        panNumber: { type: String, default: "" },
        enableGST: { type: Boolean, default: true },
        defaultGSTRate: { type: Number, default: 18 },
      },
      bankDetails: {
        bankName: { type: String, default: "" },
        accountName: { type: String, default: "" },
        accountNumber: { type: String, default: "" },
        ifscCode: { type: String, default: "" },
        branch: { type: String, default: "" },
        upiId: { type: String, default: "" },
      },
      termsTemplate: { type: String, default: "" },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Plan limit configurations
tenantSchema.statics.getPlanLimits = function (planName) {
  const plans = {
    Free: {
      maxUsers: 3,
      maxProjects: 5,
      maxStorageMb: 500,
      maxLeadsPerMonth: 50,
    },
    Starter: {
      maxUsers: 5,
      maxProjects: 15,
      maxStorageMb: 2000,
      maxLeadsPerMonth: 200,
    },
    Professional: {
      maxUsers: 20,
      maxProjects: 100,
      maxStorageMb: 10000,
      maxLeadsPerMonth: 1000,
    },
    Enterprise: {
      maxUsers: 99999,
      maxProjects: 99999,
      maxStorageMb: 100000,
      maxLeadsPerMonth: 99999,
    },
  };
  return plans[planName] || plans.Free;
};

export default mongoose.model("Tenant", tenantSchema);
