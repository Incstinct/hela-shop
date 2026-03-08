"use client";
import { useState, useEffect, use } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabase";
import { useCart } from "../../context/CartContext";

export default function ProductPage({ params }) {
  const { id } = use(params);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState(null);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (error) console.error(error);
      else setProduct(data);
      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (!selectedSize) return;
    addToCart(product, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white pt-24">
        <div className="max-w-6xl mx-auto px-6 py-12 animate-pulse">
          <div className="h-3 bg-gray-100 rounded w-24 mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="aspect-[3/4] bg-gray-100 rounded-2xl" />
            <div className="flex flex-col gap-4 justify-center">
              <div className="h-3 bg-gray-100 rounded w-1/4" />
              <div className="h-8 bg-gray-100 rounded w-3/4" />
              <div className="h-6 bg-gray-100 rounded w-1/4" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white pt-24 flex flex-col items-center justify-center">
        <p className="text-gray-400 mb-4">Product not found.</p>
        <Link href="/shop" className="text-sm underline text-black">
          Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-24">
      <div className="max-w-6xl mx-auto px-6 py-12">

        {/* Back link */}
        <Link
          href="/shop"
          className="text-xs tracking-[0.15em] uppercase text-gray-400 hover:text-black transition-colors mb-12 block"
        >
          ← Back to Shop
        </Link>

        {/* Product layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">

          {/* Image */}
          <div className="aspect-[3/4] bg-gray-100 overflow-hidden rounded-2xl">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center">
            <p className="text-xs tracking-[0.2em] uppercase text-gray-400 mb-3">
              {product.category}
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-black mb-4">
              {product.name}
            </h1>
            <p className="text-2xl text-black mb-6">
              ${product.price}
            </p>
            <p className="text-gray-500 text-sm leading-relaxed mb-10">
              {product.description}
            </p>

            {/* Size selector */}
            <div className="mb-8">
              <p className="text-xs tracking-[0.15em] uppercase text-gray-400 mb-3">
                Select Size
              </p>
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 text-xs tracking-wide border transition-colors ${
                      selectedSize === size
                        ? "bg-black text-white border-black"
                        : "border-gray-200 text-gray-600 hover:border-black"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to cart */}
            <button
              onClick={handleAddToCart}
              disabled={!selectedSize}
              className={`w-full py-4 text-sm tracking-[0.15em] uppercase transition-colors ${
                !selectedSize
                  ? "bg-gray-100 text-gray-300 cursor-not-allowed"
                  : added
                  ? "bg-green-600 text-white"
                  : "bg-black text-white hover:bg-gray-800"
              }`}
            >
              {!selectedSize ? "Select a Size" : added ? "Added to Cart ✓" : "Add to Cart"}
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}