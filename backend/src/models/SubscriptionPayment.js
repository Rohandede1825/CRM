import mongoose from "mongoose";

const subscriptionPaymentSchema = new mongoose.Schema(
  {
    tenantId: { type: mongoose.Schema.Types.ObjectId, ref: "Tenant", required: true, index: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    plan: { type: String, enum: ["Starter", "Professional", "Enterprise"], required: true },
    billingCycle: { type: String, enum: ["monthly", "yearly"], required: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: "INR" },
    receipt: { type: String, required: true, unique: true },
    razorpayOrderId: { type: String, unique: true, sparse: true },
    razorpayPaymentId: { type: String, unique: true, sparse: true },
    status: { type: String, enum: ["created", "paid", "failed"], default: "created" },
    paidAt: Date,
  },
  { timestamps: true }
);

export default mongoose.model("SubscriptionPayment", subscriptionPaymentSchema);
