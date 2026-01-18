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

  const { signUp, user } = useAuth() as {
    signUp: (email: string, password: string, name: string) => Promise<void>;
    user: { uid: string } | null;
  };

  const router = useRouter();

  // Redirect logged-in users
  useEffect(() => {
    if (user) router.push("/");
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      await signUp(email, password, name);
      // Let useEffect handle the redirect naturally when user state updates
    } catch (err: unknown) {
      console.error("Error signing up:", err);
      const errorCode = (err as { code?: string }).code;

      switch (errorCode) {
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
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="
          flex flex-col justify-center gap-4
          bg-white
          p-8
          rounded-lg
          shadow-md
          w-full
          sm:w-3/4
          md:w-2/3
          lg:w-1/3
          min-h-[400px]
          sm:min-h-[450px]
          md:min-h-[500px]
        "
      >
        <h1 className="text-2xl font-bold text-center text-green-500">
          Create Account
        </h1>

        {error && <p className="text-red-500 text-center text-sm">{error}</p>}

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
          className="text-base sm:text-lg placeholder-gray-500 border-2 border-gray-300 p-3 rounded focus:outline-none focus:border-green-400"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="text-base sm:text-lg placeholder-gray-500 border-2 border-gray-300 p-3 rounded focus:outline-none focus:border-green-400"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="text-base sm:text-lg placeholder-gray-500 border-2 border-gray-300 p-3 rounded focus:outline-none focus:border-green-400"
          required
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          className="text-base sm:text-lg placeholder-gray-500 border-2 border-gray-300 p-3 rounded focus:outline-none focus:border-green-400"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-green-500 text-white py-2 rounded hover:bg-green-600 transition-colors duration-200"
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
