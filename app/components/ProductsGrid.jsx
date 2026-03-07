import ProductCard from "./ProductCard";
import Link from "next/link";

const products = [
  {
    id: 1,
    name: "Oversized Cotton Tee",
    price: "49",
    category: "T-Shirts",
    slug: "t-shirts",
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&q=80",
  },
  {
    id: 2,
    name: "Relaxed Cargo Pants",
    price: "89",
    category: "Bottoms",
    slug: "bottoms",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80",
  },
  {
    id: 3,
    name: "Washed Zip Hoodie",
    price: "110",
    category: "Hoodies",
    slug: "hoodies",
    image: "https://images.unsplash.com/photo-1509942774463-acf339cf87d5?w=600&q=80",
  },
  {
    id: 4,
    name: "Slim Track Jacket",
    price: "95",
    category: "Jackets",
    slug: "jackets",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80",
  },
  {
    id: 5,
    name: "Ribbed Tank Top",
    price: "35",
    category: "T-Shirts",
    slug: "t-shirts",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80",
  },
  {
    id: 6,
    name: "Wide Leg Trousers",
    price: "79",
    category: "Bottoms",
    slug: "bottoms",
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&q=80",
  },
];

export default function ProductsGrid() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-24">

      {/* Section header */}
      <div className="flex items-end justify-between mb-12">
        <div>
          <span className="text-xs tracking-[0.3em] uppercase text-gray-400">
            Featured
          </span>
          <h2 className="text-3xl font-semibold tracking-tight mt-1">
            New Arrivals
          </h2>
        </div>
        <Link href="/shop" className="text-sm text-gray-400 hover:text-black transition-colors tracking-wide">
          View All →
        </Link>
      </div>

      {/* Products grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-12">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            name={product.name}
            price={product.price}
            category={product.category}
            image={product.image}
            slug={product.slug}
          />
        ))}
      </div>

    </section>
  );
}