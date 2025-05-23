"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "./Button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-blue-600">
            MyLogo
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link href="#home" className="text-gray-700 hover:text-blue-600 transition">
              Home
            </Link>
            <Link href="#about" className="text-gray-700 hover:text-blue-600 transition">
              About
            </Link>
            <Link href="#features" className="text-gray-700 hover:text-blue-600 transition">
              Features
            </Link>
            <Link href="#testimonials" className="text-gray-700 hover:text-blue-600 transition">
              Testimonials
            </Link>

            <Link href="/login">
              <Button className="px-4 py-2">Login</Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md">
          <Link href="#home" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition" onClick={() => setIsOpen(false)}>
            Home
          </Link>
          <Link href="#about" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition" onClick={() => setIsOpen(false)}>
            About
          </Link>
          <Link href="#features" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition" onClick={() => setIsOpen(false)}>
            Features
          </Link>
          <Link href="#testimonials" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition" onClick={() => setIsOpen(false)}>
            Testimonials
          </Link>
          <Link href="/login" onClick={() => setIsOpen(false)} className="block px-4 py-2">
            <Button className="w-full">Login</Button>
          </Link>
        </div>
      )}
    </nav>
  );
}
