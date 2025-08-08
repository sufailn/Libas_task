import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="footer-lux mt-5">
      {/* Privileges strip */}
      <section className="container py-6">
        <div className="rounded-2xl border border-zinc-200/80 bg-gradient-to-br from-stone-50 to-zinc-50 p-2 shadow-[0_6px_28px_rgba(0,0,0,0.06)]">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            <Link
              href="/products"
              className="group flex items-center justify-between rounded-xl bg-white/70 px-4 py-4 backdrop-blur-sm transition hover:bg-white no-underline"
            >
              <div>
                <div className="font-brand-serif text-lg font-semibold tracking-wide text-zinc-800">
                  Personalised Message
                </div>
                <div className="text-dim text-sm">Available on all products</div>
              </div>
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-zinc-300 text-zinc-600 transition group-hover:border-zinc-900 group-hover:bg-zinc-900 group-hover:text-white">
                <ChevronRight className="h-4 w-4" />
              </span>
            </Link>

            <Link
              href="/products"
              className="group flex items-center justify-between rounded-xl bg-white/70 px-4 py-4 backdrop-blur-sm transition hover:bg-white no-underline"
            >
              <div>
                <div className="font-brand-serif text-lg font-semibold tracking-wide text-zinc-800">
                  Iconic Libas Packaging
                </div>
                <div className="text-dim text-sm">Seasonal and unique</div>
              </div>
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-zinc-300 text-zinc-600 transition group-hover:border-zinc-900 group-hover:bg-zinc-900 group-hover:text-white">
                <ChevronRight className="h-4 w-4" />
              </span>
            </Link>

            <Link
              href="/products"
              className="group flex items-center justify-between rounded-xl bg-white/70 px-4 py-4 backdrop-blur-sm transition hover:bg-white no-underline"
            >
              <div>
                <div className="font-brand-serif text-lg font-semibold tracking-wide text-zinc-800">
                  Free Delivery and Return
                </div>
                <div className="text-dim text-sm">Complimentary delivery for all orders</div>
              </div>
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-zinc-300 text-zinc-600 transition group-hover:border-zinc-900 group-hover:bg-zinc-900 group-hover:text-white">
                <ChevronRight className="h-4 w-4" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer Links */}
      <section className="container py-6 border-t border-zinc-200">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="font-brand-serif text-lg font-semibold text-zinc-800">Libas Boutiques</h3>
            <ul className="mt-2 space-y-1">
              <li><Link href="/about" className="text-sm text-zinc-600 no-underline hover:text-zinc-800">About Libas</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-brand-serif text-lg font-semibold text-zinc-800">Client Services</h3>
            <ul className="mt-2 space-y-1">
              <li><Link href="/contact" className="text-sm text-zinc-600 no-underline hover:text-zinc-800">Contact</Link></li>
              <li><Link href="/faq" className="text-sm text-zinc-600 no-underline hover:text-zinc-800">FAQ</Link></li>
              <li><Link href="/delivery" className="text-sm text-zinc-600 no-underline hover:text-zinc-800">Delivery & Returns</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-brand-serif text-lg font-semibold text-zinc-800">Libas House</h3>
            <ul className="mt-2 space-y-1">
              <li><Link href="/ethics" className="text-sm text-zinc-600 no-underline hover:text-zinc-800">Ethics & Compliance</Link></li>
              <li><Link href="/career" className="text-sm text-zinc-600 no-underline hover:text-zinc-800">Career</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-brand-serif text-lg font-semibold text-zinc-800">Legals</h3>
            <ul className="mt-2 space-y-1">
              <li><Link href="/terms" className="text-sm text-zinc-600 no-underline hover:text-zinc-800">Legal terms and conditions</Link></li>
              <li><Link href="/privacy" className="text-sm text-zinc-600 no-underline hover:text-zinc-800">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
      </section>

      {/* Social Links */}
      <section className="container py-6 border-t border-zinc-200 text-center">
        <p className="text-sm text-zinc-600">Follow us:</p>
        <div className="mt-2 flex justify-center space-x-4">
          <Link href="https://www.tiktok.com" className="text-sm text-zinc-600 no-underline hover:text-zinc-800">TikTok</Link>
          <Link href="https://www.instagram.com" className="text-sm text-zinc-600 no-underline hover:text-zinc-800">Instagram</Link>
          <Link href="https://www.twitter.com" className="text-sm text-zinc-600 no-underline hover:text-zinc-800">X</Link>
          <Link href="https://www.facebook.com" className="text-sm text-zinc-600 no-underline hover:text-zinc-800">Facebook</Link>
          <Link href="https://www.snapchat.com" className="text-sm text-zinc-600 no-underline hover:text-zinc-800">Snapchat</Link>
        </div>
      </section>
    </footer>
  );
}
