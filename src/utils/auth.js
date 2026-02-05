const AUTH_KEY = "userData";
const EXPIRY_DAYS = 7;

// Save auth with 7-day expiry
export const saveAuth = (userData) => {
  const expiresAt = new Date().getTime() + EXPIRY_DAYS * 24 * 60 * 60 * 1000;
  const authData = {
    ...userData,
    expiresAt,
  };
  localStorage.setItem(AUTH_KEY, JSON.stringify(authData));
};

// Get auth and check if expired
export const getAuth = () => {
  try {
    const data = localStorage.getItem(AUTH_KEY);
    if (!data) return null;

    const authData = JSON.parse(data);
    const now = new Date().getTime();

    // Check if expired
    if (authData.expiresAt && now > authData.expiresAt) {
      clearAuth();
      return null;
    }

    return authData;
  } catch (error) {
    console.error("Auth error:", error);
    clearAuth();
    return null;
  }
};

// Check if user is authenticated
export const isAuthenticated = () => {
  const auth = getAuth();
  return auth && auth.role === "Supervisor";
};

// Clear auth (logout)
export const clearAuth = () => {
  localStorage.removeItem(AUTH_KEY);
};
