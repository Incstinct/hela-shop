"use client";
import { useState, use } from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar";

const allProducts = [
  {
    id: 1,
    name: "Oversized Cotton Tee",
    price: 49,
    category: "t-shirts",
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&q=80",
    description: "A relaxed fit cotton tee cut for everyday wear. Garment washed for a lived-in feel.",
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: 2,
    name: "Striped Pocket Tee",
    price: 45,
    category: "t-shirts",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80",
    description: "Classic striped tee with a subtle chest pocket. 100% organic cotton.",
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: 3,
    name: "Washed Graphic Tee",
    price: 55,
    category: "t-shirts",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80",
    description: "Vintage washed graphic tee with a faded print. Slightly oversized fit.",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 4,
    name: "Relaxed Cargo Pants",
    price: 89,
    category: "bottoms",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80",
    description: "Relaxed cargo pants with side pockets. Tapered at the ankle for a clean silhouette.",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 5,
    name: "Wide Leg Trousers",
    price: 79,
    category: "bottoms",
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&q=80",
    description: "Wide leg trousers in a lightweight fabric. High waisted with a clean drape.",
    sizes: ["XS", "S", "M", "L"],
  },
  {
    id: 6,
    name: "Slim Chinos",
    price: 69,
    category: "bottoms",
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&q=80",
    description: "Slim fit chinos in a stretch cotton blend. Versatile and minimal.",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 7,
    name: "Washed Zip Hoodie",
    price: 110,
    category: "hoodies",
    image: "https://images.unsplash.com/photo-1509942774463-acf339cf87d5?w=600&q=80",
    description: "Garment washed zip hoodie in a heavy fleece. Relaxed fit with a dropped shoulder.",
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: 8,
    name: "Oversized Pullover",
    price: 95,
    category: "hoodies",
    image: "https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?w=600&q=80",
    description: "Oversized pullover hoodie in a midweight fleece. Minimal branding, maximum comfort.",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 9,
    name: "Slim Track Jacket",
    price: 95,
    category: "jackets",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80",
    description: "Slim fit track jacket in a recycled nylon. Lightweight and packable.",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 10,
    name: "Oversized Denim Jacket",
    price: 120,
    category: "jackets",
    image: "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=600&q=80",
    description: "Oversized denim jacket in a washed indigo. A wardrobe essential.",
    sizes: ["XS", "S", "M", "L", "XL"],
  },
];

export default function ProductPage({ params }) {
  const { id } = use(params);
  const product = allProducts.find((p) => p.id === Number(id));
  const [selectedSize, setSelectedSize] = useState(null);
  const [added, setAdded] = useState(false);

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

  const handleAddToCart = () => {
    if (!selectedSize) return;
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

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