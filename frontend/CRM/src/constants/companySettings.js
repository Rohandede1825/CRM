import { DEFAULT_TERMS_AND_CONDITIONS_TEMPLATE } from "./termsAndConditionsTemplates";

export const DEFAULT_COMPANY_SETTINGS = {
  companyName: "DSOFTS IT",
  tagline: "SPACES WITHIN, DESIGNED BEAUTIFULLY",
  phone: "+91 86055 26603",
  altPhone: "+91 80555 26603",
  email: "info@dsoftsit.com",
  website: "https://dsoftsit.com",
  address: "Shop No. 4, Tech Plaza, Wakad, Pune, Maharashtra 411057",
  gstNumber: "27AAACV1234F1Z5",
  panNumber: "AAACV1234F",

  // Bank & Payment QR Code
  bankName: "HDFC Bank Ltd",
  accountHolderName: "DSOFTS IT PRIVATE LIMITED",
  accountNumber: "50200067891234",
  ifscCode: "HDFC0001234",
  branch: "Wakad, Pune",
  accountType: "Current Account",
  upiId: "dsoftsit@hdfcbank",
  qrCodeUrl: "", // Base64 data URL or hosted image URL

  // SMTP Settings
  smtpHost: "",
  smtpPort: 587,
  smtpSecure: false,
  smtpUser: "",
  smtpPass: "",
  smtpFrom: "Dsofts IT CRM <crm@dsoftsit.com>",
  adminNotificationEmail: "admin@dsoftsit.com",
  enableEmailNotifications: true,

  // Terms & Conditions Templates
  termsAndConditions: DEFAULT_TERMS_AND_CONDITIONS_TEMPLATE
};

/**
 * Loads the active company & payment settings from localStorage (including tenant workspace) or defaults
 */
export const getActiveCompanySettings = () => {
  try {
    let tenantSettings = {};
    const tenantStr = localStorage.getItem("dsofts_tenant");
    if (tenantStr) {
      const tenant = JSON.parse(tenantStr);
      if (tenant?.settings) {
        tenantSettings = {
          companyName: tenant.settings.companyName || tenant.name || DEFAULT_COMPANY_SETTINGS.companyName,
          tagline: tenant.settings.tagline || DEFAULT_COMPANY_SETTINGS.tagline,
          phone: tenant.settings.phone || DEFAULT_COMPANY_SETTINGS.phone,
          email: tenant.settings.email || DEFAULT_COMPANY_SETTINGS.email,
          address: tenant.settings.address?.street || DEFAULT_COMPANY_SETTINGS.address,
          gstNumber: tenant.settings.taxation?.gstNumber || DEFAULT_COMPANY_SETTINGS.gstNumber,
          panNumber: tenant.settings.taxation?.panNumber || DEFAULT_COMPANY_SETTINGS.panNumber,
          bankName: tenant.settings.bankDetails?.bankName || DEFAULT_COMPANY_SETTINGS.bankName,
          accountHolderName: tenant.settings.bankDetails?.accountName || DEFAULT_COMPANY_SETTINGS.accountHolderName,
          accountNumber: tenant.settings.bankDetails?.accountNumber || DEFAULT_COMPANY_SETTINGS.accountNumber,
          ifscCode: tenant.settings.bankDetails?.ifscCode || DEFAULT_COMPANY_SETTINGS.ifscCode,
          branch: tenant.settings.bankDetails?.branch || DEFAULT_COMPANY_SETTINGS.branch,
          upiId: tenant.settings.bankDetails?.upiId || DEFAULT_COMPANY_SETTINGS.upiId,
        };
      }
    }

    const saved =
      localStorage.getItem("dsofts_payment_settings") ||
      localStorage.getItem("dsofts_company_settings") ||
      localStorage.getItem("velora_payment_settings") ||
      localStorage.getItem("velora_company_settings");
    if (saved) {
      const parsed = JSON.parse(saved);
      return { ...DEFAULT_COMPANY_SETTINGS, ...tenantSettings, ...parsed };
    }
    if (Object.keys(tenantSettings).length > 0) {
      return { ...DEFAULT_COMPANY_SETTINGS, ...tenantSettings };
    }
  } catch (e) {}
  return DEFAULT_COMPANY_SETTINGS;
};

/**
 * Persists updated company settings to localStorage
 */
export const saveCompanySettingsToStorage = (settings) => {
  try {
    localStorage.setItem("dsofts_payment_settings", JSON.stringify(settings));
    localStorage.setItem("dsofts_company_settings", JSON.stringify(settings));
    localStorage.setItem("velora_payment_settings", JSON.stringify(settings));
    localStorage.setItem("velora_company_settings", JSON.stringify(settings));
    window.dispatchEvent(new Event("storage"));
  } catch (e) {}
};

export const saveActiveCompanySettings = saveCompanySettingsToStorage;

