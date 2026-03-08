"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "../lib/supabase";

export default function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const registered = searchParams.get("registered");

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!form.email || !form.password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen bg-white flex">

      {/* Left side */}
      <div className="hidden md:flex w-1/2 bg-black flex-col justify-center p-16">
        <div>
          <h2 className="text-4xl font-semibold text-white leading-tight mb-4">
            Welcome back.
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Sign in to access your orders, saved items and account details.
          </p>
        </div>
        <p className="text-gray-600 text-xs mt-16">
          © 2025 Hela. All rights reserved.
        </p>
      </div>

      {/* Right side */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-8">
        <div className="w-full max-w-sm">

          {registered && (
            <div className="bg-green-50 border border-green-200 text-green-700 text-xs px-4 py-3 mb-6">
              Account created! Please check your email to confirm, then sign in.
            </div>
          )}

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

            {error && (
              <p className="text-red-500 text-xs">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-black text-white py-4 text-sm tracking-[0.15em] uppercase transition-colors mt-2 ${
                loading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-800"
              }`}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>

          </form>
        </div>
      </div>

    </div>
  );
}