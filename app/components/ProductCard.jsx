import Link from "next/link";

export default function ProductCard({ category, image, slug }) {
  return (
    <Link href={`/shop?category=${slug}`} className="group cursor-pointer">

      {/* Image */}
      <div className="aspect-[3/4] w-full overflow-hidden bg-gray-100 relative">
        <img
          src={image}
          alt={category}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* See more overlay on hover */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
          <span className="text-white text-sm tracking-[0.15em] uppercase">
            See More →
          </span>
        </div>
      </div>

      {/* Category label */}
      <p className="text-xs tracking-[0.15em] uppercase text-gray-400 mt-4">
        {category}
      </p>

    </Link>
  );
}