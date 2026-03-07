"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const allProducts = [
  {
    id: 1,
    name: "Oversized Cotton Tee",
    price: 49,
    category: "t-shirts",
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&q=80",
  },
  {
    id: 2,
    name: "Striped Pocket Tee",
    price: 45,
    category: "t-shirts",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80",
  },
  {
    id: 3,
    name: "Washed Graphic Tee",
    price: 55,
    category: "t-shirts",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80",
  },
  {
    id: 4,
    name: "Relaxed Cargo Pants",
    price: 89,
    category: "bottoms",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80",
  },
  {
    id: 5,
    name: "Wide Leg Trousers",
    price: 79,
    category: "bottoms",
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&q=80",
  },
  {
    id: 6,
    name: "Slim Chinos",
    price: 69,
    category: "bottoms",
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&q=80",
  },
  {
    id: 7,
    name: "Washed Zip Hoodie",
    price: 110,
    category: "hoodies",
    image: "https://images.unsplash.com/photo-1509942774463-acf339cf87d5?w=600&q=80",
  },
  {
    id: 8,
    name: "Oversized Pullover",
    price: 95,
    category: "hoodies",
    image: "https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?w=600&q=80",
  },
  {
    id: 9,
    name: "Slim Track Jacket",
    price: 95,
    category: "jackets",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80",
  },
  {
    id: 10,
    name: "Oversized Denim Jacket",
    price: 120,
    category: "jackets",
    image: "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=600&q=80",
  },
];

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

  useEffect(() => {
    const category = searchParams.get("category");
    if (category) setActiveCategory(category);
  }, [searchParams]);

  const filtered = activeCategory === "all"
    ? allProducts
    : allProducts.filter((p) => p.category === activeCategory);

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
          {filtered.length} products
        </p>

        {/* Products grid */}
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

      </div>
    </div>
  );
}