"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signUp, user } = useAuth();
  const router = useRouter();

  // Redirect logged-in users
  useEffect(() => {
    if (user) router.push("/");
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      await signUp(email, password, name);
      router.push("/");
    } catch (err: any) {
      console.error("Error signing up:", err);
      switch (err.code) {
        case "auth/email-already-in-use":
          setError("Email already in use. Try logging in instead.");
          break;
        case "auth/weak-password":
          setError("Password should be at least 6 characters.");
          break;
        case "auth/invalid-email":
          setError("Invalid email address.");
          break;
        default:
          setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 w-80 bg-white p-6 rounded-lg shadow-md"
      >
        <h1 className="text-2xl font-bold text-center text-green-500 mb-2">
          Create Account
        </h1>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
          className="border p-2 rounded"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="border p-2 rounded"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="border p-2 rounded"
          required
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          className="border p-2 rounded"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-green-400 text-white py-2 rounded hover:bg-green-500 transition"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="text-center text-sm mt-2">
          Already have an account?{" "}
          <Link href="/login" className="text-green-500 hover:underline">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
}
