import Link from "next/link";

export default function Hero() {
  return (
    <section className="h-screen flex flex-col items-center justify-center text-center px-6 bg-white">

      <span className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-6 block">
        New Collection 2026
      </span>

      <h1 className="text-7xl font-semibold tracking-tight text-black max-w-3xl leading-none mb-6">
        Wear Less. Mean More.
      </h1>

      <p className="text-gray-400 text-lg max-w-md mb-10 mx-auto">
        Minimal streetwear for people who let the clothes speak for themselves.
      </p>

      <div className="flex gap-4 justify-center">
        <Link href="/shop" className="bg-black text-white px-8 py-3 text-sm tracking-wide hover:bg-gray-800 transition-colors">
          Shop Now
        </Link>
        <Link href="/about" className="border border-black text-black px-8 py-3 text-sm tracking-wide hover:bg-gray-50 transition-colors">
          Our Story
        </Link>
      </div>

    </section>
  );
}