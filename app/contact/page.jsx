"use client";
import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setLoading(true);
    setError(null);

    const { error } = await supabase
      .from("messages")
      .insert([{ name: form.name, email: form.email, message: form.message }]);

    if (error) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    } else {
      setSubmitted(true);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">

      {/* Header */}
      <section className="max-w-6xl mx-auto px-6 pt-40 pb-24">
        <span className="text-xs tracking-[0.3em] uppercase text-gray-400">
          Get In Touch
        </span>
        <h1 className="text-6xl font-semibold tracking-tight text-black max-w-2xl leading-none mt-4">
          We'd love to hear from you.
        </h1>
      </section>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="w-full h-px bg-gray-100" />
      </div>

      {/* Content */}
      <section className="max-w-6xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-2 gap-24">

        {/* Left — info */}
        <div>
          <div className="mb-12">
            <span className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-4 block">
              Based In
            </span>
            <p className="text-black text-lg">Warsaw, Poland</p>
            <p className="text-gray-400 text-sm mt-2">Shipping across Europe</p>
          </div>

          <div className="mb-12">
            <span className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-4 block">
              Email
            </span>
            <p className="text-black text-lg">hello@hela.com</p>
            <p className="text-gray-400 text-sm mt-2">We reply within 24 hours</p>
          </div>

          <div>
            <span className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-4 block">
              Hours
            </span>
            <p className="text-black text-lg">Mon — Fri, 9am — 6pm CET</p>
          </div>
        </div>

        {/* Right — form */}
        <div>
          {submitted ? (
            <div className="h-full flex flex-col justify-center">
              <h2 className="text-2xl font-semibold text-black mb-4">
                Message sent.
              </h2>
              <p className="text-gray-400 text-sm">
                Thanks for reaching out — we'll get back to you within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">

              <div>
                <label className="text-xs tracking-[0.15em] uppercase text-gray-400 mb-2 block">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full border border-gray-200 px-4 py-3 text-sm text-black placeholder-gray-300 focus:outline-none focus:border-black transition-colors bg-white"
                />
              </div>

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
                  Message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="What's on your mind?"
                  rows={6}
                  className="w-full border border-gray-200 px-4 py-3 text-sm text-black placeholder-gray-300 focus:outline-none focus:border-black transition-colors bg-white resize-none"
                />
              </div>

              {error && (
                <p className="text-red-500 text-xs">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className={`bg-black text-white px-8 py-4 text-sm tracking-[0.15em] uppercase transition-colors ${
                  loading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-800"
                }`}
              >
                {loading ? "Sending..." : "Send Message"}
              </button>

            </form>
          )}
        </div>

      </section>
    </div>
  );
}