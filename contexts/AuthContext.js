"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { signUpAction, signInAction, signOutAction, getSessionAction } from "../app/auth";

// Create Auth context
const AuthContext = createContext(null);

// Custom hook
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}

// Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sign Up
  const signUp = async (email, password, displayName = "") => {
    setLoading(true);
    const result = await signUpAction(email, password, displayName);
    if (result.success) {
      setUser(result.user);
      setLoading(false);
      return result.user;
    } else {
      setLoading(false);
      const error = new Error(result.error);
      error.code = result.error; // For compatibility with Firebase error handling
      throw error;
    }
  };

  // Sign In
  const signIn = async (email, password) => {
    setLoading(true);
    const result = await signInAction(email, password);
    if (result.success) {
      setUser(result.user);
      setLoading(false);
      return result.user;
    } else {
      setLoading(false);
      const error = new Error(result.error);
      error.code = result.error; // For compatibility with Firebase error handling
      throw error;
    }
  };

  // Log Out
  const logOut = async () => {
    setLoading(true);
    const result = await signOutAction();
    if (result.success) {
      setUser(null);
      setLoading(false);
    } else {
      setLoading(false);
      throw new Error(result.error);
    }
  };

  // Initial session check
  useEffect(() => {
    async function checkSession() {
      try {
        const userData = await getSessionAction();
        if (userData) {
          setUser(userData);
        }
      } catch (err) {
        console.error("Failed to restore session:", err);
      } finally {
        setLoading(false);
      }
    }
    checkSession();
  }, []);

  const value = { user, loading, signUp, signIn, logOut };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
