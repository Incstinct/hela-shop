"use client";
export const dynamic = "force-dynamic";
import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

  const shipping = cartTotal > 150 ? 0 : 12;
  const total = cartTotal + shipping;

  return (
    <div className="min-h-screen bg-white pt-24">
      <div className="max-w-6xl mx-auto px-6 py-12">

        {/* Header */}
        <div className="mb-12">
          <span className="text-xs tracking-[0.3em] uppercase text-gray-400">
            Your
          </span>
          <h1 className="text-4xl font-semibold tracking-tight text-black mt-1">
            Cart {cartItems.length > 0 && `(${cartItems.length})`}
          </h1>
        </div>

        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 gap-6">
            <p className="text-gray-400 text-sm tracking-wide">Your cart is empty.</p>
            <Link
              href="/shop"
              className="bg-black text-white px-8 py-3 text-sm tracking-[0.15em] uppercase hover:bg-gray-800 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">

            {/* Items */}
            <div className="md:col-span-2 flex flex-col gap-8">
              {cartItems.map((item) => (
                <div key={`${item.id}-${item.size}`} className="flex gap-4 pb-8 border-b border-gray-100 items-start">

                  <Link href={`/product/${item.id}`}>
                    <div className="w-20 h-28 bg-gray-100 overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </Link>

                  {/* Middle - product info + quantity */}
                  <div className="flex-1 flex flex-col justify-between h-28">
                    <div>
                      <p className="text-xs tracking-[0.15em] uppercase text-gray-400 mb-1">
                        {item.category}
                      </p>
                      <h3 className="text-sm font-medium text-black mb-1">
                        {item.name}
                      </h3>
                      <p className="text-xs text-gray-400">
                        Size: {item.size}
                        {item.selectedColor && ` · ${item.selectedColor}`}
                      </p>
                    </div>

                    <div className="flex items-center border border-gray-200 w-fit">
                      <button
                        onClick={() => updateQuantity(item.id, item.size, -1)}
                        className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-black transition-colors text-lg"
                      >
                        −
                      </button>
                      <span className="w-8 h-8 flex items-center justify-center text-sm text-black">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.size, 1)}
                        className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-black transition-colors text-lg"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Right - price + remove */}
                  <div className="flex flex-col items-end justify-between h-28 flex-shrink-0">
                    <div className="text-sm font-medium text-black text-right">
                      <span>${item.price * item.quantity}</span>
                      {item.quantity > 1 && (
                        <p className="text-xs text-gray-400 mt-1">${item.price} x {item.quantity}</p>
                      )}
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id, item.size)}
                      className="h-8 px-3 flex items-center justify-center border border-red-200 text-red-400 hover:bg-red-500 hover:text-white hover:border-red-500 transition-colors text-xs tracking-wide uppercase"
                    >
                      Remove
                    </button>
                  </div>

                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="md:col-span-1">
              <div className="border border-gray-100 p-8 sticky top-24">
                <h2 className="text-sm font-semibold tracking-[0.15em] uppercase text-black mb-8">
                  Order Summary
                </h2>

                <div className="flex flex-col gap-4 mb-8">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Subtotal</span>
                    <span className="text-black">${cartTotal}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Shipping</span>
                    <span className="text-black">
                      {shipping === 0 ? "Free" : `$${shipping}`}
                    </span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-xs text-gray-300">
                      Free shipping on orders over $150
                    </p>
                  )}
                  <div className="w-full h-px bg-gray-100" />
                  <div className="flex justify-between text-sm font-semibold">
                    <span className="text-black">Total</span>
                    <span className="text-black">${total}</span>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  className="w-full bg-black text-white py-4 text-sm tracking-[0.15em] uppercase hover:bg-gray-800 transition-colors block text-center"
                >
                  Checkout
                </Link>

                <Link
                  href="/shop"
                  className="w-full text-center text-xs text-gray-400 hover:text-black transition-colors tracking-wide uppercase mt-4 block"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}