import { Link } from "react-router-dom";
import { Clock3, Instagram, MapPin, Phone, Sparkles } from "lucide-react";

const footerLinks = [
  { label: "Home", to: "/" },
  { label: "Menu", to: "/menu" },
  { label: "Orders", to: "/orders" },
  { label: "Cart", to: "/cart" },
];

const highlights = ["Chef-curated meals", "Quick doorstep delivery", "Fresh ingredients daily"];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(249,115,22,0.22),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(244,114,182,0.18),_transparent_28%)]" />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-[1.4fr_0.8fr_1fr] lg:px-10">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-orange-100 backdrop-blur">
            <Sparkles className="h-4 w-4 text-orange-300" />
            Crafted for comfort cravings
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Tastevia makes everyday meals feel a little special.
            </h2>
            <p className="max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
              Fresh bowls, indulgent bites, and fast delivery wrapped into one warm, modern food experience.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {highlights.map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-5">
          <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-200">
            Explore
          </h3>
          <div className="grid gap-3 text-sm text-slate-300">
            {footerLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-5">
          <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-200">
            Contact
          </h3>
          <div className="space-y-4 text-sm text-slate-300">
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 text-orange-300" />
              <span>Serving fresh favorites across your neighborhood.</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-orange-300" />
              <span>+91 98765 43210</span>
            </div>
            <div className="flex items-center gap-3">
              <Clock3 className="h-4 w-4 text-orange-300" />
              <span>Open daily, 9:00 AM to 11:00 PM</span>
            </div>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm transition-colors hover:bg-white/10 hover:text-white"
            >
              <Instagram className="h-4 w-4" />
              Follow Tastevia
            </a>
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-5 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between lg:px-10">
          <p>Copyright 2026 Tastevia. Fresh food, fast moods.</p>
          <p>Designed to keep cravings simple, quick, and beautiful.</p>
        </div>
      </div>
    </footer>
  );
}
