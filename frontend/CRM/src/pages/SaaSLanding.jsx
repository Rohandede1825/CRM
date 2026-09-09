import { Link } from "react-router-dom";
import {
  Briefcase,
  Layers,
  FileSpreadsheet,
  FileText,
  ShieldCheck,
  Zap,
  ArrowRight,
  Sparkles,
  Users,
  CheckCircle2,
  TrendingUp,
  Building2,
  Lock,
  Phone,
  Mail,
  MapPin,
  LogIn,
  ChevronRight,
  Database,
  BarChart3,
  Sliders,
  Check,
} from "lucide-react";
import { isAuthenticated, getCurrentUser, getCurrentTenant } from "../services/authService";

export default function SaaSLanding() {
  const isAuth = isAuthenticated();
  const user = getCurrentUser();
  const tenant = getCurrentTenant();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-600 selection:text-white relative overflow-x-hidden">
      {/* Dynamic Background Glow Elements */}
      <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-r from-blue-600/20 via-indigo-600/20 to-purple-600/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-[800px] right-[-100px] w-[500px] h-[500px] bg-blue-500/10 blur-[140px] rounded-full pointer-events-none" />

      {/* Top SaaS Header Navbar */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          {/* Company Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="h-10 w-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-600/30 group-hover:scale-105 transition">
              <Building2 size={22} />
            </div>
            <div>
              <div className="font-black text-lg tracking-wider uppercase text-white flex items-center gap-1.5">
                <span>DSOFTS IT</span>
                <span className="text-blue-500 font-light">CRM</span>
              </div>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block -mt-1">
                Enterprise SaaS Suite
              </span>
            </div>
          </Link>

          {/* Center Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-slate-300">
            <a href="#features" className="hover:text-blue-400 transition">
              Core Modules
            </a>
            <a href="#how-it-works" className="hover:text-blue-400 transition">
              How It Works
            </a>
            <a href="#pricing" className="hover:text-blue-400 transition">
              SaaS Plans
            </a>
            <a href="#company" className="hover:text-blue-400 transition">
              About Company
            </a>
          </nav>

          {/* Right Action: Client Login / Go to Workspace */}
          <div className="flex items-center gap-3">
            {isAuth ? (
              <Link
                to="/dashboard"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-blue-600/30 flex items-center gap-2 transition"
              >
                <span>Go to Workspace ({tenant?.name || user?.name || "CRM"})</span>
                <ArrowRight size={14} />
              </Link>
            ) : (
              <Link
                to="/login"
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-extrabold uppercase tracking-wider rounded-xl shadow-lg shadow-blue-600/30 flex items-center gap-2 transition hover:scale-[1.02] cursor-pointer"
              >
                <LogIn size={15} />
                <span>Client Login</span>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Main Hero Section */}
      <section className="relative pt-16 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold tracking-wide">
            <Sparkles size={14} className="animate-pulse text-amber-400" />
            <span>Turnkey Interior, Architecture & Contract CRM Platform</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight uppercase leading-[1.1]">
            Scale Your Business With <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Dsofts IT</span> Cloud CRM
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
            The all-in-one SaaS platform built for high-growth design studios, turnkey executors, and commercial contractors. Complete with multi-space BOQ engines, automated GST invoicing, and project stage tracking.
          </p>

          {/* Hero Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/login"
              className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs uppercase tracking-wider rounded-2xl shadow-xl shadow-blue-600/40 flex items-center justify-center gap-2.5 transition hover:scale-105 cursor-pointer"
            >
              <ShieldCheck size={18} />
              <span>Access Client Admin Portal</span>
              <ArrowRight size={16} />
            </Link>

            <a
              href="#features"
              className="w-full sm:w-auto px-6 py-3.5 bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700/80 font-bold text-xs rounded-2xl transition flex items-center justify-center gap-2"
            >
              <span>Explore Platform Features</span>
              <ChevronRight size={14} />
            </a>
          </div>

          {/* Trust Guarantees */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-medium">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={15} className="text-emerald-400" />
              <span>Dedicated Isolated Workspaces</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={15} className="text-emerald-400" />
              <span>White-Label Brand PDF Generation</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={15} className="text-emerald-400" />
              <span>GST Compliant Invoicing</span>
            </div>
          </div>
        </div>

        {/* Live Interactive CRM Dashboard Preview Mockup */}
        <div className="mt-16 max-w-5xl mx-auto rounded-3xl p-2 sm:p-3 bg-gradient-to-b from-slate-800/60 to-slate-900/80 border border-slate-700/80 shadow-2xl shadow-blue-900/20 backdrop-blur-xl">
          <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden text-left">
            {/* Window Top Controls */}
            <div className="h-10 bg-slate-900 px-4 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="text-[11px] font-mono text-slate-400 ml-3">
                  crm.dsoftsit.com/workspace/dashboard
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-blue-400 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Live Telemetry Active</span>
              </div>
            </div>

            {/* Dashboard Mock Content */}
            <div className="p-6 space-y-6">
              {/* Top Stats Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Active Projects", val: "24 Units", sub: "+12% this month", icon: <Briefcase size={16} className="text-blue-400" /> },
                  { label: "Pipeline Revenue", val: "₹1.68 Cr", sub: "84% Target Achieved", icon: <TrendingUp size={16} className="text-emerald-400" /> },
                  { label: "BOQ Estimates Built", val: "142 Generated", sub: "99.4% approval rate", icon: <FileSpreadsheet size={16} className="text-purple-400" /> },
                  { label: "Client Invoices", val: "₹42.5 L Cleared", sub: "GST Auto-reconciled", icon: <FileText size={16} className="text-amber-400" /> },
                ].map((s, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-slate-400 font-bold uppercase">{s.label}</span>
                      {s.icon}
                    </div>
                    <div className="text-lg font-black text-white">{s.val}</div>
                    <div className="text-[10px] text-slate-400">{s.sub}</div>
                  </div>
                ))}
              </div>

              {/* Middle Section: Stages & Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 p-4 rounded-xl bg-slate-900/50 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-200">Active Turnkey Lifecycle Stages</span>
                    <span className="text-[10px] text-blue-400 font-semibold">Real-time Sync</span>
                  </div>
                  <div className="grid grid-cols-5 gap-2 text-center text-[11px]">
                    {[
                      { stage: "Inquiry", count: "14 Leads", color: "bg-blue-500/20 text-blue-300 border-blue-500/40" },
                      { stage: "BOQ Ready", count: "8 Quotes", color: "bg-purple-500/20 text-purple-300 border-purple-500/40" },
                      { stage: "Production", count: "6 In Factory", color: "bg-amber-500/20 text-amber-300 border-amber-500/40" },
                      { stage: "Installation", count: "4 On-Site", color: "bg-indigo-500/20 text-indigo-300 border-indigo-500/40" },
                      { stage: "Handover", count: "12 Completed", color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40" },
                    ].map((st, i) => (
                      <div key={i} className={`p-2.5 rounded-lg border ${st.color}`}>
                        <div className="font-extrabold">{st.stage}</div>
                        <div className="text-[10px] opacity-80 mt-0.5">{st.count}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-gradient-to-br from-blue-900/30 to-indigo-900/30 border border-blue-800/40 flex flex-col justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-blue-300">
                      <Lock size={13} />
                      <span>Tenant Workspace</span>
                    </div>
                    <div className="text-sm font-black text-white">Client Admin Portal</div>
                    <p className="text-[11px] text-slate-300">
                      Log in using the dedicated administrator credentials provided by Dsofts IT.
                    </p>
                  </div>
                  <Link
                    to="/login"
                    className="mt-3 w-full py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-extrabold rounded-lg text-center shadow transition block"
                  >
                    Enter Workspace
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Platform Modules */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/80">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <h2 className="text-xs font-extrabold text-blue-400 uppercase tracking-widest">
            Complete Operations Engine
          </h2>
          <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase">
            Everything You Need To Deliver Turnkey Projects
          </h3>
          <p className="text-xs sm:text-sm text-slate-400">
            Engineered specifically for interior designers, architects, and modular fabricators.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <FileSpreadsheet size={24} className="text-blue-400" />,
              title: "Multi-Space BOQ Builder",
              desc: "Build comprehensive itemized estimates grouped by space (Kitchen, Living, Bedrooms) with pre-configured HDHMR, Marine Ply, and Hardware material rates.",
            },
            {
              icon: <FileText size={24} className="text-emerald-400" />,
              title: "GST Tax Invoicing & Bank QR",
              desc: "Issue tax-compliant invoices with automatic HSN/SAC codes, company GSTIN, and custom dynamic payment QR codes directly linked to your bank account.",
            },
            {
              icon: <Briefcase size={24} className="text-purple-400" />,
              title: "Milestone & Stage Pipeline",
              desc: "Track client sites from initial Inquiry -> BOQ -> 3D Approval -> Factory Production -> Site Installation -> Final Handover.",
            },
            {
              icon: <Users size={24} className="text-amber-400" />,
              title: "Client & Lead CRM",
              desc: "Synchronize client communications across Phone, WhatsApp, and Site Meetings with audit activity trails.",
            },
            {
              icon: <ShieldCheck size={24} className="text-indigo-400" />,
              title: "Multi-Tenant Data Isolation",
              desc: "Enterprise-grade database isolation ensuring every client organization's estimates, leads, and financials remain strictly confidential.",
            },
            {
              icon: <BarChart3 size={24} className="text-rose-400" />,
              title: "Executive Reports & Exports",
              desc: "Export Excel schedules, download white-labeled PDF proposals with your company letterhead, and review revenue forecasting.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-blue-500/50 hover:bg-slate-900 transition-all duration-300 space-y-4 shadow-xs"
            >
              <div className="p-3 rounded-2xl bg-slate-800 w-fit border border-slate-700/80">
                {item.icon}
              </div>
              <h4 className="text-base font-black text-white">{item.title}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How Company Provisions Client Admin Accounts */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/80">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <h2 className="text-xs font-extrabold text-blue-400 uppercase tracking-widest">
            Simple SaaS Workflow
          </h2>
          <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase">
            How Client Admin Accounts Work
          </h3>
          <p className="text-xs sm:text-sm text-slate-400">
            Dsofts IT manages the infrastructure so your team can focus on designing and building.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {[
            {
              step: "01",
              title: "Company Provisions Workspace",
              desc: "Dsofts IT creates your dedicated organization tenant, configures your custom branding, and provides the master administrator credentials.",
            },
            {
              step: "02",
              title: "Client Logs Into Portal",
              desc: "Use the 'Client Login' button on this portal with your admin account to securely enter your isolated CRM dashboard.",
            },
            {
              step: "03",
              title: "Invite Staff & Run Operations",
              desc: "Add project managers, designers, and sales reps to your team. Build BOQs, generate invoices, and track site milestones seamlessly.",
            },
          ].map((s, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4 relative overflow-hidden"
            >
              <div className="text-5xl font-black text-blue-500/20">{s.step}</div>
              <h4 className="text-lg font-black text-white">{s.title}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SaaS Pricing / Tiers Overview */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/80">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <h2 className="text-xs font-extrabold text-blue-400 uppercase tracking-widest">
            Transparent Subscription Plans
          </h2>
          <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase">
            Choose Your Studio Scale
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Starter Studio",
              price: "₹1,999",
              interval: "/ month",
              desc: "For boutique design practices and freelance architects.",
              features: ["Up to 5 Team Members", "15 Active Projects", "BOQ & Estimate Builder", "Custom PDF Branding", "Standard Email Support"],
              popular: false,
            },
            {
              name: "Professional Plan",
              price: "₹4,999",
              interval: "/ month",
              desc: "Our most popular tier for growing turnkey interior firms.",
              features: ["Up to 20 Team Members", "100 Active Projects", "Automated GST Invoicing", "White-label PDF Branding", "Priority Chat & Phone Support", "Multi-Space BOQ Engine"],
              popular: true,
            },
            {
              name: "Enterprise Contractor",
              price: "₹9,999",
              interval: "/ month",
              desc: "Limitless scale with custom integrations and SLA guarantee.",
              features: ["Unlimited Team Seats", "Unlimited Projects", "Custom Domain White-label", "Dedicated Account Manager", "REST API & Custom Reports"],
              popular: false,
            },
          ].map((p, idx) => (
            <div
              key={idx}
              className={`p-8 rounded-3xl border flex flex-col justify-between ${
                p.popular
                  ? "bg-slate-900 border-blue-500 shadow-2xl shadow-blue-500/10 scale-105"
                  : "bg-slate-900/50 border-slate-800"
              }`}
            >
              <div className="space-y-4">
                {p.popular && (
                  <span className="px-3 py-1 rounded-full bg-blue-500 text-white text-[10px] font-extrabold uppercase tracking-wider">
                    Recommended
                  </span>
                )}
                <h4 className="text-lg font-black text-white uppercase">{p.name}</h4>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-white">{p.price}</span>
                  <span className="text-xs text-slate-400">{p.interval}</span>
                </div>
                <p className="text-xs text-slate-400">{p.desc}</p>

                <ul className="space-y-2.5 pt-4 text-xs">
                  {p.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-slate-300">
                      <Check size={14} className="text-blue-400 flex-shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8">
                <Link
                  to="/login"
                  className={`w-full py-3 rounded-xl text-xs font-black uppercase tracking-wider text-center block transition ${
                    p.popular
                      ? "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30"
                      : "bg-slate-800 hover:bg-slate-700 text-white"
                  }`}
                >
                  Get Admin Access
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About Company & Contact Footer */}
      <footer id="company" className="border-t border-slate-800/80 bg-slate-950 pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4 md:col-span-2">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black">
                  <Building2 size={20} />
                </div>
                <span className="font-black text-lg tracking-wider text-white">DSOFTS IT CRM</span>
              </div>
              <p className="text-xs text-slate-400 max-w-md leading-relaxed">
                Dsofts IT Private Limited provides cutting-edge enterprise software solutions, CRM systems, and cloud infrastructure for the design and construction industry.
              </p>
              <div className="flex items-center gap-2 text-xs text-emerald-400 font-bold">
                <ShieldCheck size={16} />
                <span>GST Registered & SSL 256-Bit Encrypted Platform</span>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-3">
              <h5 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Navigation</h5>
              <ul className="space-y-2 text-xs text-slate-400">
                <li><Link to="/login" className="hover:text-white transition">Client Admin Login</Link></li>
                <li><a href="#features" className="hover:text-white transition">Core CRM Modules</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition">Onboarding Guide</a></li>
                <li><a href="#pricing" className="hover:text-white transition">Subscription Plans</a></li>
              </ul>
            </div>

            {/* Official Contact Info */}
            <div className="space-y-3">
              <h5 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Company Contact</h5>
              <ul className="space-y-2.5 text-xs text-slate-400">
                <li className="flex items-center gap-2">
                  <Phone size={14} className="text-blue-400" />
                  <span>+91 86055 26603</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail size={14} className="text-blue-400" />
                  <span>info@dsoftsit.com</span>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin size={14} className="text-blue-400 flex-shrink-0 mt-0.5" />
                  <span>Wakad, Pune, Maharashtra 411057</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <p>&copy; {new Date().getFullYear()} Dsofts IT Private Limited. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link to="/login" className="hover:text-slate-300 transition">Client Access</Link>
              <span>•</span>
              <span className="text-slate-400">Enterprise Cloud CRM v2.4</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
