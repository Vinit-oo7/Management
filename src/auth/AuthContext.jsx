import React, { createContext, useContext, useMemo, useState } from "react";
import { resolveUserByIdentifier } from "./accessControl";

const AUTH_STORAGE_KEY = "angel-manager-auth";

const AuthContext = createContext(null);

function getStoredUser() {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw);
    if (!parsed?.id || !parsed?.role) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() =>
    typeof window === "undefined" ? null : getStoredUser(),
  );

  const login = (identifier) => {
    const found = resolveUserByIdentifier(identifier);
    if (!found) {
      return {
        ok: false,
        message:
          "Invalid account ID. Use one of: Admin@123@gmail.com, teacher@123, student@123.",
      };
    }

    setUser(found);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(found));
    return { ok: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider.");
  }
  return context;
}
