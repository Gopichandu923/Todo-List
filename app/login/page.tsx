"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FirebaseError } from "firebase/app";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { signIn, user } = useAuth() as {
    signIn: (email: string, password: string) => Promise<void>;
    user: { uid: string } | null;
  };

  const router = useRouter();

  useEffect(() => {
    if (user) router.push("/");
  }, [user, router]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      await signIn(email, password);
      router.push("/");
    } catch (err: unknown) {
      console.error(err);
      const errorCode = (err as FirebaseError).code;

      switch (errorCode) {
        case "auth/invalid-credential":
          setError("Invalid email or password.");
          break;
        case "auth/invalid-email":
          setError("Invalid email format.");
          break;
        default:
          setError("Login failed. Please try again.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200 p-4">
      <form
        onSubmit={handleLogin}
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
        <h1 className="text-2xl font-bold text-center text-green-500">Login</h1>

        {error && <p className="text-red-500 text-center text-sm">{error}</p>}

        <input
          type="email"
          value={email}
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
          className="text-base sm:text-lg placeholder-gray-500 border-2 border-gray-300 p-3 rounded focus:outline-none focus:border-green-400"
          required
        />

        <input
          type="password"
          value={password}
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
          className="text-base sm:text-lg placeholder-gray-500 border-2 border-gray-300 p-3 rounded focus:outline-none focus:border-green-400"
          required
        />

        <button
          type="submit"
          className="bg-green-500 text-white py-2 rounded hover:bg-green-600 transition-colors duration-200"
        >
          Sign In
        </button>

        <p className="text-center text-sm mt-2">
          Don’t have an account?{" "}
          <Link href="/register" className="text-green-500 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
