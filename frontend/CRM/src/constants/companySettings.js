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
 * Loads the active company & payment settings from localStorage or defaults
 */
export const getActiveCompanySettings = () => {
  try {
    const saved = localStorage.getItem("dsofts_payment_settings") || localStorage.getItem("dsofts_company_settings") || localStorage.getItem("velora_payment_settings") || localStorage.getItem("velora_company_settings");
    if (saved) {
      const parsed = JSON.parse(saved);
      return { ...DEFAULT_COMPANY_SETTINGS, ...parsed };
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

