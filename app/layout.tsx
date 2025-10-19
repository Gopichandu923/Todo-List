import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { FaRegUserCircle } from "react-icons/fa";
import { AuthProvider } from "../contexts/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Todo Application",
  description: "To store and access the daily tasks",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="flex flex-row justify-between p-4 text-green-400 text-2xl font-bold">
          <Link href="/">Todo</Link>
          <h1>Welcome Gopi</h1>
          <FaRegUserCircle />
        </header>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
