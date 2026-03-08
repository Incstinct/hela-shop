"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { supabase } from "../lib/supabase";

const categories = [
  { label: "All", value: "all" },
  { label: "T-Shirts", value: "t-shirts" },
  { label: "Bottoms", value: "bottoms" },
  { label: "Hoodies", value: "hoodies" },
  { label: "Jackets", value: "jackets" },
];

export default function Shop() {
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState("all");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const category = searchParams.get("category");
    if (category) setActiveCategory(category);
  }, [searchParams]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) console.error(error);
      else setProducts(data);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const filtered = activeCategory === "all"
    ? products
    : products.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-white pt-24">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="mb-12">
          <span className="text-xs tracking-[0.3em] uppercase text-gray-400">
            Collection
          </span>
          <h1 className="text-4xl font-semibold tracking-tight mt-1">
            Shop
          </h1>
        </div>

        {/* Category filters */}
        <div className="flex gap-2 mb-12 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-5 py-2 text-xs tracking-[0.15em] uppercase transition-colors ${
                activeCategory === cat.value
                  ? "bg-black text-white"
                  : "border border-gray-200 text-gray-500 hover:border-black hover:text-black"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Product count */}
        <p className="text-xs text-gray-400 tracking-wide mb-8">
          {loading ? "Loading..." : `${filtered.length} products`}
        </p>

        {/* Products grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12 mb-24">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[3/4] bg-gray-100 mb-4" />
                <div className="h-3 bg-gray-100 rounded mb-2 w-1/2" />
                <div className="h-3 bg-gray-100 rounded w-3/4" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12 mb-24">
            {filtered.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className="group cursor-pointer"
              >
                <div className="aspect-[3/4] w-full overflow-hidden bg-gray-100 relative mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                    <span className="text-white text-xs tracking-[0.15em] uppercase">
                      View Product →
                    </span>
                  </div>
                </div>
                <p className="text-xs tracking-[0.15em] uppercase text-gray-400 mb-1">
                  {product.category}
                </p>
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-black">{product.name}</h3>
                  <span className="text-sm text-gray-600">${product.price}</span>
                </div>
              </Link>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}