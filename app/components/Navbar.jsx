"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "../lib/supabase";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const { cartCount } = useCart();

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between relative">

        {/* Logo - left */}
        <Link href="/" className="text-xl font-semibold tracking-[0.2em] uppercase text-black">
          Hela
        </Link>

        {/* Links - center (desktop only) */}
        <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
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
          {user ? (
            <>
              <Link href="/account" className="hidden md:block text-sm text-gray-500 hover:text-black transition-colors">
                {user.user_metadata?.full_name?.split(" ")[0] || user.email}
              </Link>
              <button
                onClick={handleLogout}
                className="hidden md:block text-sm text-gray-500 hover:text-black transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <Link href="/login" className="hidden md:block text-sm text-gray-500 hover:text-black transition-colors">
              Login
            </Link>
          )}

          <Link href="/cart" className="text-sm font-medium tracking-wide border border-black px-4 py-2 hover:bg-black hover:text-white transition-colors whitespace-nowrap text-black">
            <span className="hidden md:inline">Cart {cartCount > 0 && `(${cartCount})`}</span>
            <span className="md:hidden">{cartCount > 0 ? `(${cartCount})` : "Cart"}</span>
          </Link>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-black hover:text-gray-600"
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
          {user ? (
            <>
              <Link href="/account" className="text-sm text-gray-500 hover:text-black transition-colors">Account</Link>
              <button onClick={handleLogout} className="text-sm text-gray-500 hover:text-black transition-colors text-left">
                Logout
              </button>
            </>
          ) : (
            <Link href="/login" className="text-sm text-gray-500 hover:text-black transition-colors">Login</Link>
          )}
        </div>
      )}
    </nav>
  );
}