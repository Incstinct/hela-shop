"use client";
export const dynamic = "force-dynamic";
import { useState, useEffect, Suspense } from "react";
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

function ShopContent() {
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState("all");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [priceFilter, setPriceFilter] = useState("all");
  const [sortBy, setSortBy] = useState("default");

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

  const filtered = products
    .filter((p) => activeCategory === "all" || p.category === activeCategory)
    .filter((p) => {
      if (priceFilter === "under50") return p.price < 50;
      if (priceFilter === "50to100") return p.price >= 50 && p.price <= 100;
      if (priceFilter === "over100") return p.price > 100;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "name-asc") return a.name.localeCompare(b.name);
      return 0;
    });

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

        {/* Filters row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">

          {/* Category filters */}
          <div className="flex gap-2 flex-wrap">
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

          {/* Right side — price + sort */}
          <div className="flex items-center gap-3">

            {/* Price filter */}
            <div className="relative">
              <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="appearance-none border border-gray-200 pl-4 pr-10 py-2 text-xs text-gray-500 uppercase tracking-[0.15em] focus:outline-none transition-colors bg-white cursor-pointer"
              >
                <option value="all">All Prices</option>
                <option value="under50">Under $50</option>
                <option value="50to100">$50 — $100</option>
                <option value="over100">Over $100</option>
              </select>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xs">▾</span>
            </div>

            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none border border-gray-200 pl-4 pr-10 py-2 text-xs text-gray-500 uppercase tracking-[0.15em] focus:outline-none transition-colors bg-white cursor-pointer"
              >
                <option value="default">Sort By</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
              </select>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xs">▾</span>
            </div>
          </div>
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

export default function Shop() {
  return (
    <Suspense>
      <ShopContent />
    </Suspense>
  );
}