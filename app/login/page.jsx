"use client";
import { useState } from "react";
import Link from "next/link";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Supabase auth coming soon
  };

  return (
    <div className="min-h-screen bg-white flex">

      {/* Left side — branding */}
      <div className="hidden md:flex w-1/2 bg-black flex-col justify-center p-16">
        <div>
          <h2 className="text-4xl font-semibold text-white leading-tight mb-4">
            Welcome back.
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Sign in to access your orders, saved items and account details.
          </p>
        </div>
        <p className="text-gray-600 text-xs">
          © 2026 Hela. All rights reserved.
        </p>
      </div>

      {/* Right side — form */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-8">
        <div className="w-full max-w-sm">

          <h1 className="text-2xl font-semibold text-black mb-2">
            Sign In
          </h1>
          <p className="text-gray-400 text-sm mb-10">
            Don't have an account?{" "}
            <Link href="/register" className="text-black underline hover:text-gray-600 transition-colors">
              Register
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            <div>
              <label className="text-xs tracking-[0.15em] uppercase text-gray-400 mb-2 block">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className="w-full border border-gray-200 px-4 py-3 text-sm text-black placeholder-gray-300 focus:outline-none focus:border-black transition-colors bg-white"
              />
            </div>

            <div>
              <label className="text-xs tracking-[0.15em] uppercase text-gray-400 mb-2 block">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full border border-gray-200 px-4 py-3 text-sm text-black placeholder-gray-300 focus:outline-none focus:border-black transition-colors bg-white"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-3 h-3 accent-black" />
                <span className="text-xs text-gray-400">Remember me</span>
              </label>
              <button type="button" className="text-xs text-gray-400 hover:text-black transition-colors">
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-4 text-sm tracking-[0.15em] uppercase hover:bg-gray-800 transition-colors mt-2"
            >
              Sign In
            </button>

          </form>
        </div>
      </div>

    </div>
  );
}