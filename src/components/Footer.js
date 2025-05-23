"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm">&copy; {new Date().getFullYear()} Food Platform. All rights reserved.</p>
        <div className="flex gap-4 text-sm">
          <Link href="/privacy" className="hover:underline text-gray-300 hover:text-white transition">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:underline text-gray-300 hover:text-white transition">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
