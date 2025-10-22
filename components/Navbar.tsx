"use client";

import { FaRegUserCircle } from "react-icons/fa";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { usePathname } from "next/navigation";

interface UserDetails {
  displayName: string | null;
  email: string | null;
}

const Navbar: React.FC = () => {
  const { user, logOut } = useAuth() as {
    user: UserDetails | null;
    logOut: () => void;
  };

  const pathname = usePathname();

  // Hide user info & auth buttons on login/register pages
  const hideUserControls = pathname === "/login" || pathname === "/register";

  return (
    <header className="sticky top-0 z-50 flex flex-col sm:flex-row justify-between items-center p-4 shadow-md bg-white text-green-500 font-semibold">
      {/* Logo / Brand */}
      <Link
        href="/"
        className="text-2xl sm:text-3xl font-bold hover:text-green-600 transition-colors mb-2 sm:mb-0"
      >
        Todo
      </Link>

      {!hideUserControls && (
        <>
          {/* User Info */}
          <div className="flex items-center gap-2 text-sm sm:text-base">
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

          {/* Auth Button */}
          <div className="mt-2 sm:mt-0">
            {user ? (
              <button
                onClick={logOut}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
              >
                Login
              </Link>
            )}
          </div>
        </>
      )}
    </header>
  );
};

export default Navbar;
