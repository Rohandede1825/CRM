import { useState, useEffect } from "react";
import erpApi from "../services/erpService";
import { getCurrentTenant, setCurrentTenant } from "../services/authService";
import {
  Zap,
  Check,
  ShieldCheck,
  Sparkles,
  Users,
  FolderKanban,
  Database,
  Calendar,
  CreditCard,
  CheckCircle,
  AlertCircle,
  Loader2,
  TrendingUp,
} from "lucide-react";

export default function BillingManager() {
  const [subscription, setSubscription] = useState(null);
  const [plans, setPlans] = useState([]);
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [loading, setLoading] = useState(true);
  const [upgradingPlan, setUpgradingPlan] = useState(null);
  const [statusMessage, setStatusMessage] = useState({ type: "", text: "" });

  const fetchSubscriptionData = async () => {
    try {
      setLoading(true);
      const [subRes, plansRes] = await Promise.all([
        erpApi.getSubscriptionStatus().catch(() => null),
        erpApi.getPlans().catch(() => null),
      ]);

      if (subRes?.data) {
        setSubscription(subRes.data);
      }
      if (plansRes?.data) {
        setPlans(plansRes.data);
      }
    } catch (err) {
      console.error("Failed to fetch billing data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptionData();
  }, []);

  const handleUpgrade = async (planId) => {
    try {
      setUpgradingPlan(planId);
      setStatusMessage({ type: "", text: "" });

      const res = await erpApi.changePlan(planId, billingCycle);
      if (res?.success) {
        setStatusMessage({
          type: "success",
          text: `Workspace upgraded to ${planId} Plan successfully!`,
        });
        // Update cached tenant
        const currentTenant = getCurrentTenant() || {};
        currentTenant.plan = planId;
        setCurrentTenant(currentTenant);
        await fetchSubscriptionData();
      }
    } catch (err) {
      setStatusMessage({
        type: "error",
        text: err.message || "Failed to upgrade subscription plan.",
      });
    } finally {
      setUpgradingPlan(null);
    }
  };

  const currentPlanId = subscription?.plan || "Free";
  const limits = subscription?.limits || { maxUsers: 3, maxProjects: 5, maxStorageMb: 500, maxLeadsPerMonth: 50 };
  const usage = subscription?.usage || { userCount: 1, projectCount: 0, leadCount: 0, storageUsedMb: 0 };

  const userPercent = Math.min(100, Math.round((usage.userCount / limits.maxUsers) * 100));
  const projectPercent = Math.min(100, Math.round((usage.projectCount / limits.maxProjects) * 100));
  const leadPercent = Math.min(100, Math.round((usage.leadCount / limits.maxLeadsPerMonth) * 100));

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Subscription & SaaS Billing
            </h1>
            <span className="px-3 py-1 bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold rounded-full uppercase flex items-center gap-1.5">
              <Sparkles size={12} className="text-blue-600" />
              {currentPlanId} Plan
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Manage your workspace subscription tier, resource limits, and company billing invoices.
          </p>
        </div>

        {/* Billing Cycle Toggle */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 self-start">
          <button
            type="button"
            onClick={() => setBillingCycle("monthly")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              billingCycle === "monthly" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500 hover:text-slate-900"
            }`}
          >
            Monthly Billing
          </button>
          <button
            type="button"
            onClick={() => setBillingCycle("yearly")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              billingCycle === "yearly" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500 hover:text-slate-900"
            }`}
          >
            <span>Annual Billing</span>
            <span className="px-1.5 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-extrabold rounded-md">
              Save 20%
            </span>
          </button>
        </div>
      </div>

      {/* Notifications */}
      {statusMessage.text && (
        <div
          className={`p-4 rounded-2xl flex items-center gap-3 text-xs border ${
            statusMessage.type === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-800"
              : "bg-rose-50 border-rose-200 text-rose-800"
          }`}
        >
          {statusMessage.type === "success" ? (
            <CheckCircle size={18} className="text-emerald-600 flex-shrink-0" />
          ) : (
            <AlertCircle size={18} className="text-rose-600 flex-shrink-0" />
          )}
          <p className="font-semibold">{statusMessage.text}</p>
        </div>
      )}

      {/* Live Resource Usage Dashboard */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
              <TrendingUp size={18} />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">Workspace Resource Utilization</h2>
              <p className="text-xs text-slate-500">Live capacity metrics for your current plan</p>
            </div>
          </div>

          {subscription?.daysRemaining > 0 && (
            <div className="px-3 py-1.5 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl text-xs font-bold flex items-center gap-2">
              <Calendar size={14} className="text-amber-600" />
              <span>{subscription.daysRemaining} days remaining in trial</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* User Seats Meter */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-700 flex items-center gap-1.5">
                <Users size={14} className="text-slate-500" />
                Team Member Seats
              </span>
              <span className="font-extrabold text-slate-900">
                {usage.userCount} / {limits.maxUsers >= 9999 ? "∞" : limits.maxUsers}
              </span>
            </div>
            <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  userPercent >= 90 ? "bg-rose-500" : userPercent >= 70 ? "bg-amber-500" : "bg-blue-600"
                }`}
                style={{ width: `${userPercent}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>{userPercent}% utilized</span>
              <span>{Math.max(0, limits.maxUsers - usage.userCount)} seats left</span>
            </div>
          </div>

          {/* Active Projects Meter */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-700 flex items-center gap-1.5">
                <FolderKanban size={14} className="text-slate-500" />
                Active Projects
              </span>
              <span className="font-extrabold text-slate-900">
                {usage.projectCount} / {limits.maxProjects >= 9999 ? "∞" : limits.maxProjects}
              </span>
            </div>
            <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  projectPercent >= 90 ? "bg-rose-500" : projectPercent >= 70 ? "bg-amber-500" : "bg-emerald-500"
                }`}
                style={{ width: `${projectPercent}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>{projectPercent}% utilized</span>
              <span>{Math.max(0, limits.maxProjects - usage.projectCount)} projects left</span>
            </div>
          </div>

          {/* Storage / Cloud Meter */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-700 flex items-center gap-1.5">
                <Database size={14} className="text-slate-500" />
                Cloud Assets & Storage
              </span>
              <span className="font-extrabold text-slate-900">
                {limits.maxStorageMb >= 1000 ? `${(limits.maxStorageMb / 1000).toFixed(0)} GB` : `${limits.maxStorageMb} MB`}
              </span>
            </div>
            <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-500 rounded-full" style={{ width: "25%" }} />
            </div>
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>High speed SSD cloud</span>
              <span>Unlimited PDFs</span>
            </div>
          </div>
        </div>
      </div>

      {/* Plan Selection Matrix */}
      <div>
        <div className="text-center max-w-xl mx-auto mb-8">
          <h2 className="text-xl font-black text-slate-900 tracking-tight">
            Flexible Plans for Growing Agencies
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Upgrade anytime as your team and pipeline expand. Cancel or change tiers seamlessly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {(plans.length > 0 ? plans : [
            {
              id: "Free",
              name: "Free Trial",
              price: 0,
              priceLabel: "₹0 / 14 Days",
              description: "For freelancers and new studios testing workflows.",
              features: ["3 Team Members", "5 Active Projects", "BOQ & Estimate Builder", "Standard PDF Invoicing", "Community Support"],
            },
            {
              id: "Starter",
              name: "Starter Plan",
              price: 1999,
              priceLabel: "₹1,999 / mo",
              description: "Designed for boutique design firms needing team coordination.",
              features: ["5 Team Members", "15 Active Projects", "Custom Brand Logo & Theme", "Automated GST Invoicing", "Excel/CSV Data Exports", "Email Support (24h)"],
            },
            {
              id: "Professional",
              name: "Professional",
              price: 4999,
              priceLabel: "₹4,999 / mo",
              description: "Our most popular tier for fast-growing turnkey contractors.",
              popular: true,
              features: ["20 Team Members", "100 Active Projects", "Full White-label PDFs", "Advanced BI & Analytics", "Priority Chat & Phone Support", "Multi-Space BOQ Engine"],
            },
            {
              id: "Enterprise",
              name: "Enterprise",
              price: 9999,
              priceLabel: "₹9,999 / mo",
              description: "Maximum power, limitless scale, and dedicated manager.",
              features: ["Unlimited Team Seats", "Unlimited Projects", "Custom Domain White-label", "Dedicated Account Manager", "REST API & Webhooks", "99.9% Uptime SLA"],
            },
          ]).map((plan) => {
            const isCurrent = currentPlanId === plan.id;
            const priceDisplay =
              plan.price === 0
                ? "₹0"
                : billingCycle === "yearly"
                ? `₹${Math.round(plan.price * 0.8 * 12).toLocaleString("en-IN")}`
                : `₹${plan.price.toLocaleString("en-IN")}`;
            const intervalDisplay =
              plan.price === 0 ? "for 14 days" : billingCycle === "yearly" ? "/ year" : "/ month";

            return (
              <div
                key={plan.id}
                className={`relative rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 border ${
                  plan.popular
                    ? "bg-slate-900 text-white border-blue-500 shadow-xl shadow-blue-500/10 scale-[1.02]"
                    : "bg-white text-slate-800 border-slate-200 hover:border-slate-300 shadow-xs"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-3 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1 shadow-md">
                    <Zap size={10} className="fill-current text-amber-300" />
                    <span>Most Popular</span>
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <h3 className="text-base font-black uppercase tracking-wide">{plan.name}</h3>
                    <p className={`text-xs mt-1 min-h-[32px] ${plan.popular ? "text-slate-400" : "text-slate-500"}`}>
                      {plan.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-200/20">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black">{priceDisplay}</span>
                      <span className={`text-xs ${plan.popular ? "text-slate-400" : "text-slate-500"}`}>
                        {intervalDisplay}
                      </span>
                    </div>
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-2.5 pt-4">
                    <p className={`text-[11px] font-bold uppercase tracking-wider ${plan.popular ? "text-blue-400" : "text-slate-700"}`}>
                      Included Features:
                    </p>
                    <ul className="space-y-2 text-xs">
                      {plan.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check
                            size={14}
                            className={`flex-shrink-0 mt-0.5 ${
                              plan.popular ? "text-blue-400" : "text-emerald-600"
                            }`}
                          />
                          <span className={plan.popular ? "text-slate-300" : "text-slate-600"}>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Upgrade Button */}
                <div className="mt-8 pt-4 border-t border-slate-200/20">
                  {isCurrent ? (
                    <button
                      disabled
                      className="w-full py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400 cursor-not-allowed"
                    >
                      Active Plan
                    </button>
                  ) : (
                    <button
                      type="button"
                      disabled={upgradingPlan === plan.id}
                      onClick={() => handleUpgrade(plan.id)}
                      className={`w-full py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-2 ${
                        plan.popular
                          ? "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30"
                          : "bg-slate-900 hover:bg-slate-800 text-white"
                      }`}
                    >
                      {upgradingPlan === plan.id ? (
                        <>
                          <Loader2 size={14} className="animate-spin" />
                          <span>Upgrading...</span>
                        </>
                      ) : (
                        <span>Switch to {plan.name}</span>
                      )}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Security & Invoicing Guarantee Footer */}
      <div className="p-6 bg-slate-50 border border-slate-200 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <div className="flex items-center gap-3">
          <ShieldCheck size={24} className="text-blue-600 flex-shrink-0" />
          <div>
            <p className="font-bold text-slate-800">Secure GST-compliant SaaS Billing</p>
            <p>Automatic tax invoices dispatched to your registered billing email on every cycle.</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-slate-400">
          <CreditCard size={16} />
          <span>UPI • Cards • Net Banking Supported</span>
        </div>
      </div>
    </div>
  );
}
