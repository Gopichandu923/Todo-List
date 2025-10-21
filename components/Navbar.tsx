"use client";

import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { FaRegUserCircle } from "react-icons/fa";

const Navbar = () => {
  const { user, logOut } = useAuth();

  return (
    <header className="flex flex-row justify-between items-center p-4 bg-white shadow-md text-green-500 text-xl font-semibold">
      {/* Left Section: Brand */}
      <Link href="/" className="hover:text-green-600 transition">
        Todo
      </Link>

      {/* Middle Section: Greeting */}
      <div className="flex items-center gap-2">
        <FaRegUserCircle size={26} />
        {user ? (
          <span>
            Welcome,{" "}
            <strong>{user.displayName || user.email?.split("@")[0]}</strong>
          </span>
        ) : (
          <span>Welcome, Guest</span>
        )}
      </div>

      {/* Right Section: Auth Buttons */}
      <div>
        {user ? (
          <button
            onClick={logOut}
            className="bg-green-400 text-white px-4 py-1 rounded hover:bg-green-500 transition"
          >
            Logout
          </button>
        ) : (
          <Link
            href="/login"
            className="bg-green-400 text-white px-4 py-1 rounded hover:bg-green-500 transition"
          >
            Login
          </Link>
        )}
      </div>
    </header>
  );
};
export default Navbar;
