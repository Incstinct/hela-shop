"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";

export default function Admin() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("products");
  const [products, setProducts] = useState([]);
  const [messages, setMessages] = useState([]);
  const [productForm, setProductForm] = useState({
    name: "", description: "", price: "", category: "t-shirts", image: "", sizes: []
  });
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const allSizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const categories = ["t-shirts", "bottoms", "hoodies", "jackets"];

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/login"); return; }

      const { data: profile } = await supabase
        .from("profiles")
        .select("is_admin")
        .eq("id", user.id)
        .single();

      if (!profile?.is_admin) { router.push("/"); return; }

      setLoading(false);
      fetchProducts();
      fetchMessages();
    };

    checkAdmin();
  }, []);

  const fetchProducts = async () => {
    const { data } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: true });
    setProducts(data || []);
  };

  const fetchMessages = async () => {
    const { data } = await supabase
      .from("messages")
      .select("*")
      .order("created_at", { ascending: false });
    setMessages(data || []);
  };

  const handleSizeToggle = (size) => {
    setProductForm((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size]
    }));
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);

    if (!productForm.name || !productForm.price || !productForm.image || productForm.sizes.length === 0) {
      setError("Please fill in all fields and select at least one size.");
      setSaving(false);
      return;
    }

    const payload = {
      name: productForm.name,
      description: productForm.description,
      price: Number(productForm.price),
      category: productForm.category,
      image: productForm.image,
      sizes: productForm.sizes,
    };

    if (editingId) {
      const { error } = await supabase
        .from("products")
        .update(payload)
        .eq("id", editingId);

      if (error) setError(error.message);
      else {
        setSuccess("Product updated.");
        resetForm();
        fetchProducts();
      }
    } else {
      const { error } = await supabase
        .from("products")
        .insert([payload]);

      if (error) setError(error.message);
      else {
        setSuccess("Product added.");
        resetForm();
        fetchProducts();
      }
    }
    setSaving(false);
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setProductForm({
      name: product.name,
      description: product.description || "",
      price: product.price,
      category: product.category,
      image: product.image,
      sizes: product.sizes || [],
    });
    setError(null);
    setSuccess(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) setError(error.message);
    else fetchProducts();
  };

  const resetForm = () => {
    setEditingId(null);
    setProductForm({
      name: "", description: "", price: "", category: "t-shirts", image: "", sizes: []
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white pt-24 flex items-center justify-center">
        <p className="text-gray-300 text-sm animate-pulse">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-24">
      <div className="max-w-6xl mx-auto px-6 py-12">

        {/* Header */}
        <div className="mb-12">
          <span className="text-xs tracking-[0.3em] uppercase text-gray-400">
            Hela
          </span>
          <h1 className="text-4xl font-semibold tracking-tight text-black mt-1">
            Admin Dashboard
          </h1>
        </div>

        <div className="w-full h-px bg-gray-100 mb-12" />

        {/* Tabs */}
        <div className="flex gap-8 mb-12 border-b border-gray-100">
          {["products", "messages"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-xs tracking-[0.2em] uppercase pb-4 transition-colors ${
                activeTab === tab
                  ? "text-black border-b-2 border-black"
                  : "text-gray-400 hover:text-black"
              }`}
            >
              {tab}
              {tab === "messages" && messages.length > 0 && (
                <span className="ml-2 bg-black text-white text-xs px-2 py-0.5 rounded-full">
                  {messages.length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Products Tab */}
        {activeTab === "products" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">

            {/* Form */}
            <div>
              <h2 className="text-sm font-semibold tracking-[0.15em] uppercase text-black mb-8">
                {editingId ? "Edit Product" : "Add Product"}
              </h2>

              <form onSubmit={handleProductSubmit} className="flex flex-col gap-5">

                <div>
                  <label className="text-xs tracking-[0.15em] uppercase text-gray-400 mb-2 block">Name</label>
                  <input
                    type="text"
                    value={productForm.name}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    className="w-full border border-gray-200 px-4 py-3 text-sm text-black focus:outline-none focus:border-black transition-colors bg-white"
                  />
                </div>

                <div>
                  <label className="text-xs tracking-[0.15em] uppercase text-gray-400 mb-2 block">Description</label>
                  <textarea
                    value={productForm.description}
                    onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                    rows={3}
                    className="w-full border border-gray-200 px-4 py-3 text-sm text-black focus:outline-none focus:border-black transition-colors bg-white resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs tracking-[0.15em] uppercase text-gray-400 mb-2 block">Price ($)</label>
                    <input
                      type="number"
                      value={productForm.price}
                      onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                      className="w-full border border-gray-200 px-4 py-3 text-sm text-black focus:outline-none focus:border-black transition-colors bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs tracking-[0.15em] uppercase text-gray-400 mb-2 block">Category</label>
                    <select
                      value={productForm.category}
                      onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                      className="w-full border border-gray-200 px-4 py-3 text-sm text-black focus:outline-none focus:border-black transition-colors bg-white"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs tracking-[0.15em] uppercase text-gray-400 mb-2 block">Image URL</label>
                  <input
                    type="text"
                    value={productForm.image}
                    onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full border border-gray-200 px-4 py-3 text-sm text-black focus:outline-none focus:border-black transition-colors bg-white"
                  />
                  {productForm.image && (
                    <img
                      src={productForm.image}
                      alt="preview"
                      className="mt-2 h-24 w-16 object-cover border border-gray-100"
                    />
                  )}
                </div>

                <div>
                  <label className="text-xs tracking-[0.15em] uppercase text-gray-400 mb-3 block">Sizes</label>
                  <div className="flex gap-2 flex-wrap">
                    {allSizes.map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => handleSizeToggle(size)}
                        className={`w-10 h-10 text-xs border transition-colors ${
                          productForm.sizes.includes(size)
                            ? "bg-black text-white border-black"
                            : "border-gray-200 text-gray-600 hover:border-black"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {error && <p className="text-red-500 text-xs">{error}</p>}
                {success && <p className="text-green-600 text-xs">{success}</p>}

                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={saving}
                    className={`bg-black text-white px-8 py-3 text-sm tracking-[0.15em] uppercase transition-colors ${
                      saving ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-800"
                    }`}
                  >
                    {saving ? "Saving..." : editingId ? "Update Product" : "Add Product"}
                  </button>
                  {editingId && (
                    <button
                      type="button"
                      onClick={resetForm}
                      className="border border-gray-200 text-gray-500 px-8 py-3 text-sm tracking-[0.15em] uppercase hover:border-black hover:text-black transition-colors"
                    >
                      Cancel
                    </button>
                  )}
                </div>

              </form>
            </div>

            {/* Products list */}
            <div>
              <h2 className="text-sm font-semibold tracking-[0.15em] uppercase text-black mb-8">
                All Products ({products.length})
              </h2>
              <div className="flex flex-col gap-4">
                {products.map((product) => (
                  <div key={product.id} className="flex gap-4 items-center p-4 border border-gray-100 hover:border-gray-300 transition-colors">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-16 object-cover bg-gray-100 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-black truncate">{product.name}</p>
                      <p className="text-xs text-gray-400">{product.category} — ${product.price}</p>
                    </div>
                    <div className="flex gap-3 flex-shrink-0">
                      <button
                        onClick={() => handleEdit(product)}
                        className="text-xs text-gray-400 hover:text-black transition-colors uppercase tracking-wide"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="text-xs text-gray-400 hover:text-red-500 transition-colors uppercase tracking-wide"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* Messages Tab */}
        {activeTab === "messages" && (
          <div className="flex flex-col gap-6">
            {messages.length === 0 ? (
              <p className="text-gray-400 text-sm">No messages yet.</p>
            ) : (
              messages.map((msg) => (
                <div key={msg.id} className="border border-gray-100 p-6 hover:border-gray-300 transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-sm font-medium text-black">{msg.name}</p>
                      <p className="text-xs text-gray-400">{msg.email}</p>
                    </div>
                    <p className="text-xs text-gray-300">
                      {new Date(msg.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{msg.message}</p>
                </div>
              ))
            )}
          </div>
        )}

      </div>
    </div>
  );
}