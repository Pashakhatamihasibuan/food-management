"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "./Button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-indigo-600">
          FoodPlatform
        </Link>
        <div className="hidden md:flex items-center gap-6">
          {["home", "about", "features", "testimonials"].map((item) => (
            <Link key={item} href={`#${item}`} className="text-gray-700 hover:text-indigo-600 transition">
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </Link>
          ))}
          <Link href="/login">
            <Button className="text-sm px-4 py-2">Login</Button>
          </Link>
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 hover:text-indigo-600 transition">
            <svg className="h-6 w-6" fill="none" stroke="currentColor">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white shadow-md px-6 pb-4">
          {["home", "about", "features", "testimonials"].map((item) => (
            <Link key={item} href={`#${item}`} className="block py-2 text-gray-700 hover:text-indigo-600" onClick={() => setIsOpen(false)}>
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </Link>
          ))}
          <Link href="/login" className="block mt-2">
            <Button className="w-full text-sm py-2">Login</Button>
          </Link>
        </div>
      )}
    </nav>
  );
}
