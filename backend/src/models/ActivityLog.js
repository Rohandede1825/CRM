import mongoose from "mongoose";

const activityLogSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    userRole: { type: String, default: "Admin" },
    action: {
      type: String,
      enum: ["Created", "Updated", "Deleted", "Approved", "Rejected", "Exported", "Login"],
      required: true
    },
    module: { type: String, required: true }, // e.g., "Leads", "BOQ", "Projects"
    description: { type: String, required: true },
    targetId: { type: String, default: "" },
    ipAddress: { type: String, default: "127.0.0.1" },
    tenantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tenant",
      index: true,
    },
  },
  { timestamps: true }
);

activityLogSchema.index({ tenantId: 1, createdAt: -1 });

export default mongoose.model("ActivityLog", activityLogSchema);
