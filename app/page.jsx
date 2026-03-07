import Hero from "./components/Hero";
import ProductsGrid from "./components/ProductsGrid";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <main className="pt-16">
        <Hero />
        <ProductsGrid />
      </main>
    </div>
  );
}