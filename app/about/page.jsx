import Link from "next/link";

export default function About() {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-40 pb-24">
        <span className="text-xs tracking-[0.3em] uppercase text-gray-400">
          Our Story
        </span>
        <h1 className="text-6xl font-semibold tracking-tight text-black max-w-2xl leading-none mt-4">
          Less noise. More substance.
        </h1>
      </section>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="w-full h-px bg-gray-100" />
      </div>

      {/* Story section */}
      <section className="max-w-6xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-2 gap-24">
        <div>
          <span className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-6 block">
            Who We Are
          </span>
          <p className="text-black text-lg leading-relaxed">
            Hela was built for people who are tired of noise. No loud logos, no seasonal gimmicks — just well-made clothing that earns its place in your wardrobe and stays there.
          </p>
          <p className="text-gray-400 text-base leading-relaxed mt-6">
            We started as a small idea — that minimal doesn't mean boring, and that quality speaks louder than branding. Every piece we carry is chosen with one question in mind: will this still feel right in five years?
          </p>
        </div>

        <div>
          <span className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-6 block">
            Where We Are
          </span>
          <p className="text-black text-lg leading-relaxed">
            Based in Warsaw, Poland — shipping across Europe.
          </p>
          <p className="text-gray-400 text-base leading-relaxed mt-6">
            We operate fully online, keeping our overhead low so we can keep our prices honest. No middlemen, no markups for the sake of it. What you pay reflects what you get.
          </p>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="w-full h-px bg-gray-100" />
      </div>

      {/* Values */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <span className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-16 block">
          What We Stand For
        </span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          <div>
            <h3 className="text-sm font-semibold tracking-[0.15em] uppercase text-black mb-4">
              Simplicity
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Every piece is stripped back to what matters. No unnecessary details, no trends chased for the sake of relevance.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-[0.15em] uppercase text-black mb-4">
              Longevity
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              We don't do fast fashion. We source materials that last and cut silhouettes that don't expire with the season.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-[0.15em] uppercase text-black mb-4">
              Honesty
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Fair pricing, real materials, no inflated brand tax. We'd rather earn your trust than your impulse buy.
            </p>
          </div>

        </div>
      </section>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="w-full h-px bg-gray-100" />
      </div>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 py-24 flex flex-col md:flex-row items-center justify-between gap-8">
        <h2 className="text-3xl font-semibold tracking-tight text-black">
          Ready to find your fit?
        </h2>
        <Link
          href="/shop"
          className="bg-black text-white px-10 py-4 text-sm tracking-[0.15em] uppercase hover:bg-gray-800 transition-colors"
        >
          Shop Now
        </Link>
      </section>

    </div>
  );
}