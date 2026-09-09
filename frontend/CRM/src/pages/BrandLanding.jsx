import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Building2,
  LogIn,
  Layers,
  FileSpreadsheet,
  FileText,
  Briefcase,
  Users,
  ShieldCheck,
  Zap,
  TrendingUp,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Sparkles,
  Lock,
  ChevronRight,
  Database,
  BarChart3,
  Check,
  Star,
  Globe,
  Award,
  Clock,
  FolderKanban,
  FileCheck,
  QrCode,
  Shield,
  Headphones,
} from "lucide-react";
import { isAuthenticated } from "../services/authService";

export default function BrandLanding() {
  const isAuth = isAuthenticated();
  const [activeTab, setActiveTab] = useState("boq");
  const [billingPeriod, setBillingPeriod] = useState("annual"); // "annual" | "monthly"
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased selection:bg-blue-600 selection:text-white relative overflow-x-hidden">
      {/* Background Soft Glows */}
      <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[850px] h-[400px] bg-gradient-to-r from-blue-100/70 via-indigo-100/50 to-blue-50/30 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* Top Header Navbar */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Dsofts IT Brand Logo */}
          <Link to="/" className="flex items-center gap-3.5 group">
            <div className="h-11 w-11 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center text-white shadow-md shadow-blue-600/20 group-hover:scale-105 transition-transform duration-300">
              <Building2 size={24} />
            </div>
            <div>
              <div className="font-black text-xl tracking-wider uppercase text-slate-900 leading-none flex items-center gap-1.5">
                <span>DSOFTS IT</span>
                <span className="text-blue-600 font-black">CRM</span>
              </div>
              <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-widest block mt-1">
                Enterprise Cloud Platform
              </span>
            </div>
          </Link>

          {/* Center Nav Links */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-bold text-slate-600">
            <a href="#about-dsofts" className="hover:text-blue-600 transition">
              About Company
            </a>
            <a href="#crm-modules" className="hover:text-blue-600 transition">
              CRM Modules
            </a>
            <a href="#workflow" className="hover:text-blue-600 transition">
              Workflow
            </a>
            <a href="#pricing" className="hover:text-blue-600 transition">
              Pricing Plans
            </a>
            <a href="#faq" className="hover:text-blue-600 transition">
              FAQ
            </a>
            <a href="#contact" className="hover:text-blue-600 transition">
              Contact
            </a>
          </nav>

          {/* Top Right Corner Blue Login Button */}
          <div className="flex items-center gap-3">
            {isAuth ? (
              <Link
                to="/dashboard"
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold uppercase tracking-wider rounded-xl shadow-md shadow-blue-600/20 flex items-center gap-2 transition cursor-pointer"
              >
                <span>Enter CRM Workspace</span>
                <ArrowRight size={15} />
              </Link>
            ) : (
              <Link
                to="/login"
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-md shadow-blue-600/25 flex items-center gap-2 transition hover:scale-105 active:scale-95 cursor-pointer"
              >
                <LogIn size={15} />
                <span>Client Login</span>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-extrabold tracking-wide shadow-2xs">
            <Sparkles size={14} className="text-blue-600" />
            <span>Built For Turnkey Interior Studios, Architecture & Contracting Firms</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight uppercase leading-[1.14]">
            The Operating System For <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700">
              Turnkey Design & Execution
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
            Eliminate Excel chaos, quoting errors, and disconnected site coordination. Dsofts IT CRM unifies multi-space BOQ calculations, automated GST tax invoicing, site milestones, and staff accountability in one isolated cloud workspace.
          </p>

          {/* Hero CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/login"
              className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs uppercase tracking-wider rounded-2xl shadow-xl shadow-blue-600/30 flex items-center justify-center gap-2.5 transition hover:scale-[1.02] cursor-pointer"
            >
              <LogIn size={17} />
              <span>Login to Client CRM</span>
              <ArrowRight size={16} />
            </Link>

            <a
              href="#pricing"
              className="w-full sm:w-auto px-7 py-4 bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 font-bold text-xs rounded-2xl transition flex items-center justify-center gap-2 shadow-xs"
            >
              <span>View Commercial Plans</span>
              <ChevronRight size={16} />
            </a>
          </div>

          {/* Trust Guarantees */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs text-slate-600 font-semibold">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-600" />
              <span>Dedicated Data Isolation</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-600" />
              <span>Custom White-Label PDFs</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-600" />
              <span>GST & Bank QR Compliant</span>
            </div>
          </div>
        </div>

        {/* Live Interactive Interface Showcase (Light Theme) */}
        <div className="mt-16 max-w-5xl mx-auto rounded-3xl bg-white border border-slate-200 shadow-xl p-3 sm:p-5">
          {/* Tab Navigation */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 p-1.5 bg-slate-100 rounded-2xl border border-slate-200 mb-4 overflow-x-auto">
            {[
              { id: "boq", label: "Multi-Space BOQ Engine", icon: <FileSpreadsheet size={15} /> },
              { id: "invoices", label: "Tax Invoices & Bank QR", icon: <FileText size={15} /> },
              { id: "projects", label: "Site Milestone Tracker", icon: <FolderKanban size={15} /> },
              { id: "analytics", label: "Executive Financial BI", icon: <BarChart3 size={15} /> },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-white text-blue-700 shadow-sm border border-slate-200"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <span className={activeTab === tab.id ? "text-blue-600" : "text-slate-400"}>
                  {tab.icon}
                </span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content Box */}
          <div className="bg-slate-50/80 rounded-2xl border border-slate-200 p-6 sm:p-8 text-left min-h-[300px] flex flex-col justify-between">
            {activeTab === "boq" && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase text-blue-600 tracking-wider">Module Spotlight</span>
                    <h3 className="text-xl font-black text-slate-900">Itemized Multi-Space BOQ Cost Engine</h3>
                  </div>
                  <span className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full font-bold self-start">
                    Auto Material Sizing & Tax Sync
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                    <span className="text-xs font-bold text-slate-900">Room-by-Room Grouping</span>
                    <p className="text-[11px] text-slate-500">Organize specs across Living Room, Modular Kitchen, Master Suites, and Puja Units.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                    <span className="text-xs font-bold text-slate-900">Dynamic Material Presets</span>
                    <p className="text-[11px] text-slate-500">Pre-calibrated rate cards for HDHMR, Marine Ply, Acrylic shutters, and soft-close hardware.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                    <span className="text-xs font-bold text-slate-900">Instant White-label PDF</span>
                    <p className="text-[11px] text-slate-500">Export high-resolution customer quotation PDFs with custom terms and company logo.</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "invoices" && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase text-emerald-600 tracking-wider">Module Spotlight</span>
                    <h3 className="text-xl font-black text-slate-900">Automated Tax Invoicing & Dynamic Bank UPI QR</h3>
                  </div>
                  <span className="text-xs bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 rounded-full font-bold self-start">
                    100% GST Compliance
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                    <span className="text-xs font-bold text-slate-900">Automated HSN/SAC Mapping</span>
                    <p className="text-[11px] text-slate-500">Auto-applies 18% GST with explicit breakdown of CGST, SGST, or IGST based on location.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                    <span className="text-xs font-bold text-slate-900">Instant Dynamic UPI QR</span>
                    <p className="text-[11px] text-slate-500">Generates instant payment QR on every invoice linked directly to your corporate account.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                    <span className="text-xs font-bold text-slate-900">Payment Reconciliation</span>
                    <p className="text-[11px] text-slate-500">Track stage disbursements (Advance 50%, Production 40%, Snag clearance 10%).</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "projects" && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase text-purple-600 tracking-wider">Module Spotlight</span>
                    <h3 className="text-xl font-black text-slate-900">Full Turnkey Project Lifecycle Tracker</h3>
                  </div>
                  <span className="text-xs bg-purple-50 text-purple-700 border border-purple-200 px-3 py-1 rounded-full font-bold self-start">
                    End-to-End Pipeline
                  </span>
                </div>

                <div className="grid grid-cols-5 gap-2.5 text-center text-xs">
                  {[
                    { title: "Inquiry", desc: "Lead Capture", badge: "Stage 1" },
                    { title: "BOQ & 3D", desc: "Client Approval", badge: "Stage 2" },
                    { title: "Production", desc: "Factory Cutlist", badge: "Stage 3" },
                    { title: "Installation", desc: "On-Site Fitout", badge: "Stage 4" },
                    { title: "Handover", desc: "Snag Completion", badge: "Stage 5" },
                  ].map((st, i) => (
                    <div key={i} className="p-3.5 bg-white border border-slate-200 rounded-2xl shadow-2xs space-y-1">
                      <span className="text-[9px] font-black text-blue-600 block">{st.badge}</span>
                      <div className="font-extrabold text-slate-900 text-xs">{st.title}</div>
                      <div className="text-[10px] text-slate-500">{st.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "analytics" && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase text-amber-600 tracking-wider">Module Spotlight</span>
                    <h3 className="text-xl font-black text-slate-900">Executive Business Intelligence & Forecasting</h3>
                  </div>
                  <span className="text-xs bg-amber-50 text-amber-700 border border-amber-200 px-3 py-1 rounded-full font-bold self-start">
                    Real-time Ledger
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                    <span className="text-xs font-bold text-slate-900">Revenue Trajectory</span>
                    <p className="text-[11px] text-slate-500">Monitor monthly revenue targets versus realization across commercial and residential sites.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                    <span className="text-xs font-bold text-slate-900">Sales Conversion Funnel</span>
                    <p className="text-[11px] text-slate-500">Track conversion rates from initial website/direct leads to finalized turnkey contracts.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                    <span className="text-xs font-bold text-slate-900">Outstanding Ageing Ledger</span>
                    <p className="text-[11px] text-slate-500">Real-time alerts for overdue milestone dues and upcoming client instalments.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Action Footer in Mockup */}
            <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-slate-500">
                Provided exclusively to verified design and execution firms.
              </span>
              <Link
                to="/login"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <span>Login to Workspace</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Telemetry Metrics Bar (Light Theme) */}
      <section className="py-12 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl sm:text-4xl font-black text-slate-900">₹450 Cr+</div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">Estimates Processed</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-blue-600">99.4%</div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">BOQ Accuracy Rate</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-emerald-600">45% Faster</div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">Site Turnaround</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-indigo-600">100% Isolated</div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">Tenant Data Security</div>
          </div>
        </div>
      </section>

      {/* About Dsofts IT Section (Light Theme) */}
      <section id="about-dsofts" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-extrabold uppercase tracking-wider">
              <Award size={14} />
              <span>About Dsofts IT Private Limited</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight uppercase leading-tight">
              Enterprise Technology Tailored For Interior & Construction Leaders
            </h2>

            <p className="text-sm text-slate-600 leading-relaxed">
              <strong>Dsofts IT Private Limited</strong> is a premier technology organization building domain-specific enterprise platforms, custom ERP ecosystems, and next-generation CRM infrastructure. We engineer solutions that eliminate friction between design creative studios and factory floor execution.
            </p>

            <div className="space-y-3">
              {[
                { title: "Direct Account Provisioning", desc: "Dsofts IT provisions and pre-configures your firm's dedicated workspace with custom logo, GST, and bank accounts." },
                { title: "Dedicated Database Isolation", desc: "Every studio runs on isolated multi-tenant architecture with encrypted client records and private rate cards." },
                { title: "Continuous Backups & 99.9% Uptime", desc: "Redundant cloud infrastructure guaranteeing uninterrupted access from your office or on-site inspections." },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3.5 p-4 bg-white border border-slate-200 rounded-2xl shadow-2xs">
                  <div className="p-1.5 rounded-xl bg-blue-50 text-blue-600 mt-0.5 border border-blue-100">
                    <Check size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wide">{item.title}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dsofts IT Company Card (Light/Navy Theme) */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-3xl text-white shadow-xl space-y-6">
            <div className="flex items-center gap-3.5">
              <div className="h-12 w-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black shadow-lg shadow-blue-600/30">
                <Building2 size={24} />
              </div>
              <div>
                <h3 className="text-lg font-black uppercase tracking-wider text-white">Dsofts IT Private Limited</h3>
                <span className="text-xs text-blue-400 font-semibold">Registered Enterprise Software Firm</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-700">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Headquarters</span>
                <p className="text-xs font-semibold text-slate-200">Wakad, Pune, Maharashtra 411057</p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Helpline Contact</span>
                <p className="text-xs font-semibold text-slate-200">+91 86055 26603</p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Corporate Email</span>
                <p className="text-xs font-semibold text-slate-200">info@dsoftsit.com</p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Security & Tax</span>
                <p className="text-xs font-semibold text-emerald-400">GSTIN Registered • SSL 256-Bit</p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-700">
              <Link
                to="/login"
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl text-center flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition cursor-pointer"
              >
                <LogIn size={15} />
                <span>Go to Client Login Page</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CRM Core Modules Breakdown (Light Theme) */}
      <section id="crm-modules" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200 bg-white">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-extrabold uppercase tracking-wider">
            <span>Modular Enterprise Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight uppercase">
            Everything Inside The Dsofts IT CRM Suite
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            A battle-tested set of modules designed to eliminate leakage across quoting, production, and final site handover.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <FileSpreadsheet size={22} className="text-blue-600" />,
              title: "Multi-Space BOQ Cost Engine",
              desc: "Build comprehensive itemized estimates separated by spaces (Living Room, Kitchen, Bedrooms) with pre-populated material variants and automated discount/tax calculations.",
            },
            {
              icon: <FileText size={22} className="text-emerald-600" />,
              title: "GST Tax Invoices & Bank QR",
              desc: "Generate GST-compliant tax invoices with automatic HSN/SAC codes, company GST numbers, and instant dynamic UPI QR codes for seamless client payments.",
            },
            {
              icon: <Briefcase size={22} className="text-indigo-600" />,
              title: "Project Milestone Pipeline",
              desc: "Track site progress from Consultation -> Quotation -> 3D Approval -> Factory Production -> Site Installation -> Handover.",
            },
            {
              icon: <Users size={22} className="text-amber-600" />,
              title: "Client & Inquiry Management",
              desc: "Manage high-value prospective leads, record call/meeting logs, schedule site visits, and sync enquiry data directly into projects.",
            },
            {
              icon: <ShieldCheck size={22} className="text-purple-600" />,
              title: "Staff Roles & Access Control",
              desc: "Configure role-specific permissions for Sales, Interior Designers, Project Managers, Factory Teams, and Accounts staff.",
            },
            {
              icon: <BarChart3 size={22} className="text-rose-600" />,
              title: "Executive Reports & Analytics",
              desc: "Visualize monthly revenue trajectories, team conversion ratios, pending payments, and export formatted Excel schedules.",
            },
          ].map((card, i) => (
            <div
              key={i}
              className="p-7 rounded-3xl bg-slate-50 border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all duration-300 space-y-4"
            >
              <div className="h-12 w-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shadow-2xs">
                {card.icon}
              </div>
              <h3 className="text-base font-extrabold text-slate-900">{card.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Flow (Light Theme) */}
      <section id="workflow" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-extrabold uppercase tracking-wider">
            <span>Seamless Onboarding</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight uppercase">
            How Client Access Works
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Dsofts IT delivers turn-key onboarding so your design and field operations start immediately.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              step: "01",
              title: "Workspace Created by Dsofts IT",
              desc: "Dsofts IT provisions your isolated organization workspace, configures your brand settings, and issues your master administrator ID and password.",
            },
            {
              step: "02",
              title: "Click Login on Top Corner",
              desc: "Click the blue 'Client Login' button in the top right corner of this portal to open the secure sign-in page.",
            },
            {
              step: "03",
              title: "Enter Credentials & Use CRM",
              desc: "Log in with your provided email and password to directly enter your workspace dashboard and manage your projects.",
            },
          ].map((wf, idx) => (
            <div key={idx} className="p-8 bg-white border border-slate-200 rounded-3xl shadow-xs space-y-4 relative">
              <span className="text-5xl font-black text-blue-100">{wf.step}</span>
              <h3 className="text-lg font-black text-slate-900">{wf.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{wf.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Plans Section - NO FREE PLAN (Light Theme) */}
      <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200 bg-white">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-extrabold uppercase tracking-wider">
            <span>Commercial Pricing</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight uppercase">
            Transparent Subscription Plans
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Enterprise plans built for serious interior practices, contractors, and turnkey studios.
          </p>

          {/* Billing Switcher */}
          <div className="inline-flex items-center p-1 bg-slate-100 border border-slate-200 rounded-xl mt-4">
            <button
              type="button"
              onClick={() => setBillingPeriod("monthly")}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
                billingPeriod === "monthly" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Monthly Billing
            </button>
            <button
              type="button"
              onClick={() => setBillingPeriod("annual")}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
                billingPeriod === "annual" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <span>Annual Billing</span>
              <span className="px-1.5 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-extrabold rounded">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* 3 Paid Plans Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {/* Plan 1: Starter Studio */}
          <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-black uppercase tracking-wide text-slate-900">Starter Studio</h3>
                <p className="text-xs text-slate-500 mt-1">For boutique design practices and freelance architects.</p>
              </div>

              <div className="pt-3 border-t border-slate-200">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-slate-900">
                    {billingPeriod === "annual" ? "₹1,999" : "₹2,499"}
                  </span>
                  <span className="text-xs text-slate-500">/ month</span>
                </div>
                <span className="text-[10px] text-slate-400">
                  {billingPeriod === "annual" ? "Billed annually (₹23,988/yr)" : "Billed monthly"}
                </span>
              </div>

              <ul className="space-y-3 pt-4 text-xs">
                {[
                  "Up to 5 Team Members",
                  "15 Active Projects",
                  "Multi-Space BOQ Engine",
                  "Automated GST Tax Invoicing",
                  "Custom Brand Logo & Letterhead",
                  "Excel / CSV Data Exports",
                  "Standard Email Support (24h)",
                ].map((f, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-slate-700">
                    <Check size={14} className="text-blue-600 flex-shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6 border-t border-slate-200">
              <Link
                to="/login"
                className="w-full py-3 bg-slate-200 hover:bg-slate-300 text-slate-800 font-extrabold text-xs uppercase tracking-wider rounded-xl text-center block transition"
              >
                Access Starter Workspace
              </Link>
            </div>
          </div>

          {/* Plan 2: Professional Plan (Most Popular) */}
          <div className="p-8 rounded-3xl bg-white border-2 border-blue-600 shadow-xl shadow-blue-600/10 flex flex-col justify-between space-y-6 relative scale-105">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 shadow-md">
              <Zap size={11} className="fill-amber-300 text-amber-300" />
              <span>Recommended Choice</span>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-black uppercase tracking-wide text-slate-900">Professional Tier</h3>
                <p className="text-xs text-slate-500 mt-1">Our most popular tier for fast-growing turnkey firms.</p>
              </div>

              <div className="pt-3 border-t border-slate-200">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-slate-900">
                    {billingPeriod === "annual" ? "₹4,999" : "₹5,999"}
                  </span>
                  <span className="text-xs text-slate-500">/ month</span>
                </div>
                <span className="text-[10px] text-slate-400">
                  {billingPeriod === "annual" ? "Billed annually (₹59,988/yr)" : "Billed monthly"}
                </span>
              </div>

              <ul className="space-y-3 pt-4 text-xs">
                {[
                  "Up to 20 Team Members",
                  "100 Active Projects",
                  "Full White-Label PDF Branding",
                  "Multi-Space BOQ Engine & Presets",
                  "Dynamic Bank UPI QR Code",
                  "Advanced BI Reports & Forecasting",
                  "Priority Phone & WhatsApp Support",
                ].map((f, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-slate-800 font-medium">
                    <Check size={14} className="text-blue-600 flex-shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6 border-t border-slate-200">
              <Link
                to="/login"
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs uppercase tracking-wider rounded-xl text-center block shadow-lg shadow-blue-600/30 transition hover:scale-[1.02]"
              >
                Access Professional Workspace
              </Link>
            </div>
          </div>

          {/* Plan 3: Enterprise Contractor */}
          <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-black uppercase tracking-wide text-slate-900">Enterprise Contractor</h3>
                <p className="text-xs text-slate-500 mt-1">Maximum power, custom integrations, and SLA guarantees.</p>
              </div>

              <div className="pt-3 border-t border-slate-200">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-slate-900">
                    {billingPeriod === "annual" ? "₹9,999" : "₹11,999"}
                  </span>
                  <span className="text-xs text-slate-500">/ month</span>
                </div>
                <span className="text-[10px] text-slate-400">
                  {billingPeriod === "annual" ? "Billed annually (₹1,19,988/yr)" : "Billed monthly"}
                </span>
              </div>

              <ul className="space-y-3 pt-4 text-xs">
                {[
                  "Unlimited Team Seats",
                  "Unlimited Active Projects",
                  "Custom Domain White-Labeling",
                  "Dedicated Account Manager",
                  "Custom REST API & Webhooks",
                  "99.9% Uptime SLA Guarantee",
                  "Custom Rate Card & Template Setup",
                ].map((f, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-slate-700">
                    <Check size={14} className="text-blue-600 flex-shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6 border-t border-slate-200">
              <Link
                to="/login"
                className="w-full py-3 bg-slate-200 hover:bg-slate-300 text-slate-800 font-extrabold text-xs uppercase tracking-wider rounded-xl text-center block transition"
              >
                Access Enterprise Workspace
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions (Light Theme) */}
      <section id="faq" className="py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-slate-200">
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-extrabold uppercase tracking-wider">
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {[
            {
              q: "How does our firm receive our login credentials?",
              a: "Dsofts IT provisions your firm's dedicated organization workspace, embeds your branding details, and delivers your master administrator credentials directly via secure email.",
            },
            {
              q: "Is our client and estimate data strictly isolated?",
              a: "Yes. Dsofts IT uses enterprise-grade multi-tenant database isolation. Your BOQs, rate cards, client communications, and invoices are 100% private to your firm.",
            },
            {
              q: "Can we generate GST-compliant tax invoices with our own bank QR code?",
              a: "Absolutely. You can enter your firm's GSTIN, bank account, and UPI ID to automatically generate dynamic payment QR codes on every generated invoice.",
            },
            {
              q: "Can we add our interior designers, site supervisors, and sales staff?",
              a: "Yes. From the User Management module, administrators can invite and assign specific roles (Sales, Designer, Project Manager, Factory Team, Accountant).",
            },
          ].map((faq, idx) => (
            <div
              key={idx}
              onClick={() => toggleFaq(idx)}
              className="p-5 bg-white border border-slate-200 rounded-2xl cursor-pointer hover:border-slate-300 transition shadow-2xs"
            >
              <div className="flex items-center justify-between font-bold text-sm text-slate-900">
                <span>{faq.q}</span>
                <ChevronRight
                  size={16}
                  className={`text-blue-600 transition-transform ${openFaq === idx ? "rotate-90" : ""}`}
                />
              </div>
              {openFaq === idx && (
                <p className="text-xs text-slate-600 mt-3 pt-3 border-t border-slate-100 leading-relaxed">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA Banner (Light/Blue Theme) */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="p-10 md:p-14 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 rounded-3xl text-white text-center space-y-6 shadow-xl">
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">
            Ready to Run Your Studio on Dsofts IT CRM?
          </h2>
          <p className="text-sm text-blue-100 max-w-xl mx-auto">
            Log in to manage your active pipeline, generate customer estimates, and oversee site milestones.
          </p>
          <div className="pt-2">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-blue-700 hover:bg-blue-50 font-black text-xs uppercase tracking-wider rounded-xl shadow-lg transition hover:scale-105 cursor-pointer"
            >
              <LogIn size={16} />
              <span>Login to Client CRM</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Official Footer (Light Theme) */}
      <footer id="contact" className="border-t border-slate-200 bg-white pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4 md:col-span-2">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black shadow-xs">
                  <Building2 size={20} />
                </div>
                <span className="font-black text-lg tracking-wider text-slate-900 uppercase">
                  DSOFTS IT CRM
                </span>
              </div>
              <p className="text-xs text-slate-500 max-w-md leading-relaxed">
                Dsofts IT Private Limited provides cloud ERP platforms, business automation software, and turnkey CRM infrastructure for modern commercial enterprises.
              </p>
              <div className="flex items-center gap-2 text-xs text-emerald-700 font-bold">
                <ShieldCheck size={16} className="text-emerald-600" />
                <span>GST Registered & SSL 256-Bit Encrypted Platform</span>
              </div>
            </div>

            <div className="space-y-3">
              <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Navigation</h5>
              <ul className="space-y-2 text-xs text-slate-500 font-semibold">
                <li><Link to="/login" className="hover:text-blue-600 transition">Client Login</Link></li>
                <li><a href="#about-dsofts" className="hover:text-blue-600 transition">About Dsofts IT</a></li>
                <li><a href="#crm-modules" className="hover:text-blue-600 transition">CRM Capabilities</a></li>
                <li><a href="#workflow" className="hover:text-blue-600 transition">How It Works</a></li>
                <li><a href="#pricing" className="hover:text-blue-600 transition">Pricing Plans</a></li>
              </ul>
            </div>

            <div className="space-y-3">
              <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Company Contact</h5>
              <ul className="space-y-2.5 text-xs text-slate-600">
                <li className="flex items-center gap-2">
                  <Phone size={14} className="text-blue-600" />
                  <span>+91 86055 26603 / +91 80555 26603</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail size={14} className="text-blue-600" />
                  <span>info@dsoftsit.com</span>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin size={14} className="text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>Shop No. 4, Tech Plaza, Wakad, Pune, Maharashtra 411057</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-200 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <p>&copy; {new Date().getFullYear()} Dsofts IT Private Limited. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <Link to="/login" className="hover:text-blue-600 font-semibold transition">Client Admin Sign In</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
