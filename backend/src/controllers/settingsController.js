import CompanySetting from "../models/CompanySetting.js";
import { logActivity } from "../services/auditService.js";
import { sendEmail, testSmtpConnection } from "../services/email.service.js";

// GET /api/erp/settings
export const getSettings = async (req, res) => {
  try {
    const query = req.tenantId ? { tenantId: req.tenantId } : {};
    let settings = await CompanySetting.findOne(query);
    if (!settings) {
      settings = await CompanySetting.create({
        tenantId: req.tenantId || null,
        companyName: req.tenant?.settings?.companyName || "DSOFTS IT",
        email: req.tenant?.settings?.email || "info@dsoftsit.com",
        phone: req.tenant?.settings?.phone || "+91 86055 26603",
      });
    }
    res.json({ success: true, data: settings });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/erp/settings
export const updateSettings = async (req, res) => {
  try {
    const query = req.tenantId ? { tenantId: req.tenantId } : {};
    let settings = await CompanySetting.findOne(query);
    if (!settings) {
      settings = await CompanySetting.create({ ...req.body, tenantId: req.tenantId || null });
    } else {
      Object.assign(settings, req.body);
      await settings.save();
    }

    await logActivity({
      userName: req.user?.name || "Admin",
      action: "Updated",
      module: "Settings",
      description: "Updated Company, Payment QR, Bank & SMTP Settings",
      tenantId: req.tenantId,
    });

    res.json({ success: true, data: settings, message: "Settings updated successfully" });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// POST /api/erp/settings/test-email
export const testEmail = async (req, res) => {
  try {
    const { targetEmail, smtpConfig } = req.body;
    const recipient = targetEmail || req.user?.email || "admin@veloradesign.com";

    const result = await testSmtpConnection(smtpConfig, recipient);
    res.json({
      success: true,
      message: `Test email dispatched to ${recipient}`,
      details: result
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
