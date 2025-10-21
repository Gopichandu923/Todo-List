"use client";

import { FaRegUserCircle } from "react-icons/fa";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

interface UserDetails {
  displayName: string | null;
  email: string | null;
}

const Navbar: React.FC = () => {
  const { user, logOut } = useAuth() as {
    user: UserDetails | null;
    logOut: () => void;
  };

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
