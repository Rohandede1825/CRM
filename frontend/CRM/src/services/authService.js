const getBaseUrl = () => {
  if (typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")) {
    return "http://localhost:3000/api";
  }
  return "https://crm-pwaw.onrender.com/api";
};

export const getAuthHeaders = () => {
  const token = localStorage.getItem("dsofts_auth_token") || localStorage.getItem("velora_admin_token");
  const tenant = getCurrentTenant();
  const headers = {};
  if (token) headers["Authorization"] = `Bearer ${token}`;
  if (tenant?._id || tenant?.id) headers["x-tenant-id"] = tenant._id || tenant.id;
  return headers;
};

export const login = async (email, password) => {
  const response = await fetch(`${getBaseUrl()}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || "Invalid credentials. Please try again.");
  }

  if (result.success && result.data?.accessToken) {
    localStorage.setItem("dsofts_auth_token", result.data.accessToken);
    localStorage.setItem("velora_admin_token", result.data.accessToken);
    localStorage.setItem("dsofts_user", JSON.stringify(result.data.user));
    localStorage.setItem("velora_admin_user", JSON.stringify(result.data.user));
    if (result.data.tenant) {
      localStorage.setItem("dsofts_tenant", JSON.stringify(result.data.tenant));
    }
    return result.data;
  }
  
  throw new Error("Unable to authenticate with backend.");
};

export const registerWorkspace = async ({ workspaceName, adminName, email, password, phone, plan = "Free" }) => {
  const response = await fetch(`${getBaseUrl()}/tenant/register-workspace`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      workspaceName,
      adminName,
      email,
      password,
      phone,
      plan,
    }),
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || "Failed to create SaaS workspace.");
  }

  if (result.success && result.data?.accessToken) {
    localStorage.setItem("dsofts_auth_token", result.data.accessToken);
    localStorage.setItem("velora_admin_token", result.data.accessToken);
    localStorage.setItem("dsofts_user", JSON.stringify(result.data.user));
    localStorage.setItem("velora_admin_user", JSON.stringify(result.data.user));
    localStorage.setItem("dsofts_tenant", JSON.stringify(result.data.tenant));
    return result.data;
  }

  return result;
};

export const registerAdmin = async (name, email, password) => {
  const response = await fetch(`${getBaseUrl()}/auth/register-admin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || "Registration failed.");
  }
  return result;
};

export const logout = () => {
  localStorage.removeItem("dsofts_auth_token");
  localStorage.removeItem("velora_admin_token");
  localStorage.removeItem("dsofts_user");
  localStorage.removeItem("velora_admin_user");
  localStorage.removeItem("dsofts_tenant");
};

export const getCurrentUser = () => {
  try {
    const userStr = localStorage.getItem("dsofts_user") || localStorage.getItem("velora_admin_user");
    return userStr ? JSON.parse(userStr) : null;
  } catch (e) {
    console.error("Error reading cached user:", e);
    return null;
  }
};

export const getCurrentTenant = () => {
  try {
    const tenantStr = localStorage.getItem("dsofts_tenant");
    return tenantStr ? JSON.parse(tenantStr) : null;
  } catch (e) {
    console.error("Error reading cached tenant:", e);
    return null;
  }
};

export const setCurrentTenant = (tenant) => {
  if (tenant) {
    localStorage.setItem("dsofts_tenant", JSON.stringify(tenant));
  } else {
    localStorage.removeItem("dsofts_tenant");
  }
};

export const isAuthenticated = () => {
  return !!(localStorage.getItem("dsofts_auth_token") || localStorage.getItem("velora_admin_token"));
};

export const fetchAdminProfile = async () => {
  const response = await fetch(`${getBaseUrl()}/profile`, {
    headers: {
      ...getAuthHeaders(),
    },
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || "Failed to fetch profile info.");
  }

  if (result.success && result.data) {
    localStorage.setItem("dsofts_user", JSON.stringify(result.data));
    localStorage.setItem("velora_admin_user", JSON.stringify(result.data));
    return result.data;
  }
  return null;
};
