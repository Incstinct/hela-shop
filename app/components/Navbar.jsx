"use client";
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="text-xl font-semibold tracking-[0.2em] uppercase">
          Hela
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm text-gray-500 hover:text-black transition-colors">
            Home
          </Link>
          <Link href="/shop" className="text-sm text-gray-500 hover:text-black transition-colors">
            Shop
          </Link>
          <Link href="/about" className="text-sm text-gray-500 hover:text-black transition-colors">
            About
          </Link>
          <Link href="/contact" className="text-sm text-gray-500 hover:text-black transition-colors">
            Contact
          </Link>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <Link href="/login" className="hidden md:block text-sm text-gray-500 hover:text-black transition-colors">
            Login
          </Link>
          <button className="text-sm font-medium tracking-wide border border-black px-4 py-2 hover:bg-black hover:text-white transition-colors">
            Cart (0)
          </button>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-500 hover:text-black"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-4">
          <Link href="/" className="text-sm text-gray-500 hover:text-black transition-colors">Home</Link>
          <Link href="/shop" className="text-sm text-gray-500 hover:text-black transition-colors">Shop</Link>
          <Link href="/about" className="text-sm text-gray-500 hover:text-black transition-colors">About</Link>
          <Link href="/contact" className="text-sm text-gray-500 hover:text-black transition-colors">Contact</Link>
          <Link href="/login" className="text-sm text-gray-500 hover:text-black transition-colors">Login</Link>
        </div>
      )}
    </nav>
  );
}