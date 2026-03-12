"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "../lib/supabase";
import ProductCard from "./ProductCard";

export default function ProductsGrid() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: true })
        .limit(6);

      if (error) console.error(error);
      else setProducts(data);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  return (
    <section className="max-w-6xl mx-auto px-6 py-24">

      {/* Section header */}
      <div className="flex items-end justify-between mb-12">
        <div>
          <span className="text-xs tracking-[0.3em] uppercase text-gray-500">
            Featured
          </span>
          <h2 className="text-3xl font-semibold tracking-tight mt-1 text-black">
            New Arrivals
          </h2>
        </div>
        <Link href="/shop" className="text-sm text-gray-400 hover:text-black transition-colors tracking-wide">
          View All →
        </Link>
      </div>

      {/* Loading skeleton */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-12">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-[3/4] bg-gray-100 mb-4" />
              <div className="h-3 bg-gray-100 rounded mb-2 w-1/2" />
              <div className="h-3 bg-gray-100 rounded w-3/4" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-12">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              category={product.category}
              image={product.image}
              slug={product.category}
            />
          ))}
        </div>
      )}

    </section>
  );
}