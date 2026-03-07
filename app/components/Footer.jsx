import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-white mt-24">
      <div className="max-w-6xl mx-auto px-6 py-16">

        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

          {/* Brand */}
          <div className="md:col-span-2">
            <span className="text-xl font-semibold tracking-[0.2em] uppercase">
              Hela
            </span>
            <p className="text-gray-400 text-sm leading-relaxed mt-4 max-w-xs">
              Minimal streetwear for people who let the clothes speak for themselves.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-gray-500 mb-4">
              Navigation
            </h4>
            <div className="flex flex-col gap-3">
              <Link href="/" className="text-sm text-gray-400 hover:text-white transition-colors">Home</Link>
              <Link href="/shop" className="text-sm text-gray-400 hover:text-white transition-colors">Shop</Link>
              <Link href="/about" className="text-sm text-gray-400 hover:text-white transition-colors">About</Link>
              <Link href="/contact" className="text-sm text-gray-400 hover:text-white transition-colors">Contact</Link>
            </div>
          </div>

          {/* Account */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-gray-500 mb-4">
              Account
            </h4>
            <div className="flex flex-col gap-3">
              <Link href="/login" className="text-sm text-gray-400 hover:text-white transition-colors">Login</Link>
              <Link href="/register" className="text-sm text-gray-400 hover:text-white transition-colors">Register</Link>
            </div>
          </div>

        </div>

        {/* Newsletter */}
        <div className="border-t border-white/10 pt-12 mb-12">
          <div className="max-w-md">
            <h4 className="text-xs tracking-[0.2em] uppercase text-gray-500 mb-2">
              Newsletter
            </h4>
            <p className="text-sm text-gray-400 mb-4">
              New drops, restocks, nothing else.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 bg-white/5 border border-white/10 px-4 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-white/30 transition-colors"
              />
              <button className="bg-white text-black px-6 py-2 text-sm tracking-wide hover:bg-gray-200 transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600">
            © 2026 Hela. All rights reserved.
          </p>
          <p className="text-xs text-gray-600">
            Built by <span className="text-gray-400">Incstinct X</span>
          </p>
        </div>

      </div>
    </footer>
  );
}