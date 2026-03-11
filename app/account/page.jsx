"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";
import Link from "next/link";

export default function Account() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("details");
  const [form, setForm] = useState({ full_name: "", email: "" });
  const [passwordForm, setPasswordForm] = useState({ current: "", password: "", confirm: "" });
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }
      setUser(user);
      setForm({
        full_name: user.user_metadata?.full_name || "",
        email: user.email,
      });
      setLoading(false);
    };

    getUser();
  }, []);

  const handleUpdateDetails = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);

    const { error } = await supabase.auth.updateUser({
      data: { full_name: form.full_name }
    });

    if (error) {
      setError(error.message);
    } else {
      setSuccess("Details updated successfully.");
    }
    setSaving(false);
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);

    if (!passwordForm.current) {
      setError("Please enter your current password.");
      setSaving(false);
      return;
    }

    if (passwordForm.password !== passwordForm.confirm) {
      setError("Passwords don't match.");
      setSaving(false);
      return;
    }

    if (passwordForm.password.length < 6) {
      setError("Password must be at least 6 characters.");
      setSaving(false);
      return;
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: passwordForm.current,
    });

    if (signInError) {
      setError("Current password is incorrect.");
      setSaving(false);
      return;
    }

    const { error } = await supabase.auth.updateUser({
      password: passwordForm.password
    });

    if (error) {
      setError(error.message);
    } else {
      setSuccess("Check your email to confirm the password change.");
      setPasswordForm({ current: "", password: "", confirm: "" });
    }
    setSaving(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white pt-24 flex items-center justify-center">
        <div className="animate-pulse text-gray-300 text-sm tracking-wide">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-24">
      <div className="max-w-4xl mx-auto px-6 py-12">

        {/* Header */}
        <div className="mb-12">
          <span className="text-xs tracking-[0.3em] uppercase text-gray-400">
            Welcome back
          </span>
          <h1 className="text-4xl font-semibold tracking-tight text-black mt-1">
            {user.user_metadata?.full_name || user.email}
          </h1>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gray-100 mb-12" />

        {/* Tabs */}
        <div className="flex gap-8 mb-12 border-b border-gray-100">
          {["details", "password", "orders", "settings"].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setError(null);
                setSuccess(null);
              }}
              className={`text-xs tracking-[0.2em] uppercase pb-4 transition-colors ${
                activeTab === tab
                  ? "text-black border-b-2 border-black"
                  : "text-gray-400 hover:text-black"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Details Tab */}
        {activeTab === "details" && (
          <form onSubmit={handleUpdateDetails} className="max-w-md flex flex-col gap-6">
            <div>
              <label className="text-xs tracking-[0.15em] uppercase text-gray-400 mb-2 block">
                Full Name
              </label>
              <input
                type="text"
                value={form.full_name}
                onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                className="w-full border border-gray-200 px-4 py-3 text-sm text-black focus:outline-none focus:border-black transition-colors bg-white"
              />
            </div>

            <div>
              <label className="text-xs tracking-[0.15em] uppercase text-gray-400 mb-2 block">
                Email
              </label>
              <input
                type="email"
                value={form.email}
                disabled
                className="w-full border border-gray-100 px-4 py-3 text-sm text-gray-300 bg-gray-50 cursor-not-allowed"
              />
              <p className="text-xs text-gray-300 mt-2">Email cannot be changed.</p>
            </div>

            {error && <p className="text-red-500 text-xs">{error}</p>}
            {success && <p className="text-green-600 text-xs">{success}</p>}

            <button
              type="submit"
              disabled={saving}
              className={`bg-black text-white px-8 py-3 text-sm tracking-[0.15em] uppercase transition-colors w-fit ${
                saving ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-800"
              }`}
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </form>
        )}

        {/* Password Tab */}
        {activeTab === "password" && (
          <form onSubmit={handleUpdatePassword} className="max-w-md flex flex-col gap-6">
            <div>
              <label className="text-xs tracking-[0.15em] uppercase text-gray-400 mb-2 block">
                Current Password
              </label>
              <input
                type="password"
                value={passwordForm.current}
                onChange={(e) => setPasswordForm({ ...passwordForm, current: e.target.value })}
                placeholder="••••••••"
                className="w-full border border-gray-200 px-4 py-3 text-sm text-black focus:outline-none focus:border-black transition-colors bg-white"
              />
            </div>

            <div>
              <label className="text-xs tracking-[0.15em] uppercase text-gray-400 mb-2 block">
                New Password
              </label>
              <input
                type="password"
                value={passwordForm.password}
                onChange={(e) => setPasswordForm({ ...passwordForm, password: e.target.value })}
                placeholder="••••••••"
                className="w-full border border-gray-200 px-4 py-3 text-sm text-black focus:outline-none focus:border-black transition-colors bg-white"
              />
            </div>

            <div>
              <label className="text-xs tracking-[0.15em] uppercase text-gray-400 mb-2 block">
                Confirm New Password
              </label>
              <input
                type="password"
                value={passwordForm.confirm}
                onChange={(e) => setPasswordForm({ ...passwordForm, confirm: e.target.value })}
                placeholder="••••••••"
                className="w-full border border-gray-200 px-4 py-3 text-sm text-black focus:outline-none focus:border-black transition-colors bg-white"
              />
            </div>

            {error && <p className="text-red-500 text-xs">{error}</p>}
            {success && <p className="text-green-600 text-xs">{success}</p>}

            <button
              type="submit"
              disabled={saving}
              className={`bg-black text-white px-8 py-3 text-sm tracking-[0.15em] uppercase transition-colors w-fit ${
                saving ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-800"
              }`}
            >
              {saving ? "Saving..." : "Update Password"}
            </button>
          </form>
        )}

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <p className="text-gray-400 text-sm">No orders yet.</p>
            <Link
              href="/shop"
              className="bg-black text-white px-8 py-3 text-sm tracking-[0.15em] uppercase hover:bg-gray-800 transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <div className="max-w-md flex flex-col gap-12">

            {/* Notifications */}
            <div>
              <h3 className="text-sm font-semibold tracking-[0.15em] uppercase text-black mb-6">
                Notifications
              </h3>
              <div className="flex flex-col gap-4">
                {[
                  { id: "orderShipped", label: "Email me when my order ships" },
                  { id: "newDrops", label: "Notify me about new drops" },
                  { id: "newsletter", label: "Subscribe to newsletter" },
                ].map((item) => (
                  <label key={item.id} className="flex items-center justify-between cursor-pointer group">
                    <span className="text-sm text-gray-600 group-hover:text-black transition-colors">
                      {item.label}
                    </span>
                    <div className="relative">
                      <input
                        type="checkbox"
                        defaultChecked={item.id === "orderShipped"}
                        className="sr-only peer"
                        id={item.id}
                      />
                      <label
                        htmlFor={item.id}
                        className="w-10 h-5 bg-gray-200 rounded-full cursor-pointer peer-checked:bg-black transition-colors block after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:w-4 after:h-4 after:bg-white after:rounded-full after:transition-transform peer-checked:after:translate-x-5"
                      />
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="w-full h-px bg-gray-100" />

            {/* Preferences */}
            <div>
              <h3 className="text-sm font-semibold tracking-[0.15em] uppercase text-black mb-6">
                Preferences
              </h3>
              <div>
                <label className="text-xs tracking-[0.15em] uppercase text-gray-400 mb-2 block">
                  Language
                </label>
                <div className="relative">
                  <select
                    defaultValue="en"
                    className="appearance-none w-full border border-gray-200 pl-4 pr-10 py-3 text-sm text-black focus:outline-none focus:border-black transition-colors bg-white cursor-pointer"
                  >
                    <option value="en">English</option>
                    <option value="pl">Polski</option>
                    <option value="ru">Русский</option>
                    <option value="nl">Nederlands</option>
                  </select>
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xs">▾</span>
                </div>
                <p className="text-xs text-gray-300 mt-2">Multi-language support coming soon.</p>
              </div>
            </div>

            <div className="w-full h-px bg-gray-100" />

            {/* Privacy */}
            <div>
              <h3 className="text-sm font-semibold tracking-[0.15em] uppercase text-black mb-6">
                Privacy
              </h3>
              <div className="flex flex-col gap-4">
                <p className="text-sm text-gray-400 leading-relaxed">
                  Deleting your account is permanent. All your data including orders and personal details will be removed.
                </p>
                <button
                  onClick={async () => {
                    if (confirm("Are you sure you want to delete your account? This cannot be undone.")) {
                      const { error } = await supabase.rpc("delete_user");
                      if (error) {
                        alert("Something went wrong. Please try again.");
                      } else {
                        await supabase.auth.signOut();
                        router.push("/");
                      }
                    }
                  }}
                  className="w-fit text-xs tracking-[0.15em] uppercase text-red-400 hover:text-red-600 border border-red-200 hover:border-red-400 px-6 py-3 transition-colors"
                >
                  Delete Account
                </button>
              </div>
            </div>

          </div>
        )}

        {/* Divider */}
        <div className="w-full h-px bg-gray-100 mt-16 mb-8" />

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="text-xs tracking-[0.2em] uppercase text-gray-400 hover:text-black transition-colors"
        >
          Sign Out
        </button>

      </div>
    </div>
  );
}