// components/Footer.jsx
"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer id="footer" className="bg-gray-800 text-white py-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center px-6">
        <p className="text-sm">&copy; {new Date().getFullYear()} Food Platform. All rights reserved.</p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <Link href="/privacy" className="text-sm hover:underline">
            Privacy Policy
          </Link>
          <Link href="/terms" className="text-sm hover:underline">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
