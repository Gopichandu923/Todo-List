import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "../contexts/AuthContext";
import Navbar from "@/components/Navbar";
import React, { ReactNode } from "react";

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

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body
        className={`
          ${geistSans.variable} ${geistMono.variable} 
          antialiased 
          bg-gray-50 
          min-h-screen 
          flex 
          flex-col
        `}
      >
        <AuthProvider>
          <Navbar />
          <main className="flex-1 overflow-auto p-4">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
