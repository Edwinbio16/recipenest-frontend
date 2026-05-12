// AuthContext.js
//
// Provides the currently logged-in chef to any component in the
// tree via React context. The chef object is persisted to
// localStorage so a page refresh doesn't kick the user out of the
// dashboard, and the login/logout functions are exposed for the
// LoginPage and Navbar to call.
//
// This is a stand-in for full session management: the frontend
// trusts whatever it has in localStorage and re-authenticates on
// every page load by calling the login endpoint again. In a
// production system we would issue a server-side session token or
// JWT and validate it on every protected request, but for a
// coursework demo this simpler model demonstrates the same
// authentication concepts without the extra plumbing.

import { createContext, useContext, useEffect, useState } from "react";
import { apiFetch } from "./api";

const STORAGE_KEY = "recipenest.currentChef";

const AuthContext = createContext({
  currentChef: null,
  login: async () => {},
  logout: () => {}
});

export function AuthProvider({ children }) {
  // Lazy initial state - reads from localStorage exactly once on
  // first render so the dashboard isn't briefly "logged out" on
  // page refresh.
  const [currentChef, setCurrentChef] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  // Whenever the chef changes, mirror the change to localStorage
  // so the next page load can pick it up.
  useEffect(() => {
    if (currentChef) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(currentChef));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [currentChef]);

  // login posts to /api/auth/login. apiFetch will throw on a 401
  // with the server's "Invalid email or password" message, which
  // the LoginPage component catches and displays.
  const login = async (email, password) => {
    const chef = await apiFetch("/auth/login", {
      method: "POST",
      body: { email, password }
    });
    setCurrentChef(chef);
    return chef;
  };

  const logout = () => setCurrentChef(null);

  // Update the stored chef in place when the dashboard saves
  // profile changes - keeps the navbar greeting in sync.
  const updateCurrentChef = (updates) => {
    setCurrentChef((prev) => (prev ? { ...prev, ...updates } : prev));
  };

  return (
    <AuthContext.Provider
      value={{ currentChef, login, logout, updateCurrentChef }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// useAuth is the only thing other components import from this
// file. Hiding the context object behind a hook means the
// implementation can change later without breaking call sites.
export function useAuth() {
  return useContext(AuthContext);
}
