import { Link } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  ArrowRight,
  Bike,
  Coffee,
  IceCream,
  Pizza,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";
import { motion } from "framer-motion";

import HeroCarousel from "../components/HeroCarousel";
import { useProducts } from "@/features/products/hooks/useProducts";
import ProductCard from "@/features/products/components/ProductCard";
import { subscribeNewsletter } from "@/features/newsletter/newsletter.service";

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0 },
};

const features = [
  {
    title: "Chef-crafted taste",
    desc: "Balanced flavors, rich textures, and plated meals that still feel premium on delivery.",
    icon: Sparkles,
    accent: "from-orange-400/20 to-yellow-300/20",
  },
  {
    title: "Fast neighborhood delivery",
    desc: "Smart routing keeps your order warm, crisp, and on time from kitchen to doorstep.",
    icon: Bike,
    accent: "from-amber-400/20 to-orange-300/20",
  },
  {
    title: "Fresh ingredients daily",
    desc: "We focus on quality produce, proteins, and pantry staples that taste clean and comforting.",
    icon: ShieldCheck,
    accent: "from-emerald-400/20 to-lime-300/20",
  },
];

const categories = [
  { label: "Wood-fired Pizza", caption: "Bold crusts and melty toppings", icon: Pizza },
  { label: "Specialty Drinks", caption: "Coffee, shakes, and cool sips", icon: Coffee },
  { label: "Dessert Fixes", caption: "Sweet finishes worth saving room for", icon: IceCream },
];

const steps = [
  { title: "Pick your mood", desc: "Explore crowd favorites, comfort classics, and quick treats." },
  { title: "Customize in seconds", desc: "Adjust portions, toppings, and extras without slowing down." },
  { title: "Track to your door", desc: "Know when your meal is cooking, leaving, and arriving hot." },
];

const faqs = [
  {
    q: "How fast is delivery?",
    a: "Most orders arrive in around 30 minutes, depending on your address and kitchen rush.",
  },
  {
    q: "Can I customize my meal?",
    a: "Yes. You can update ingredients, quantities, and add-ons during checkout.",
  },
  {
    q: "Do you have lighter options?",
    a: "Tastevia includes balanced picks alongside indulgent meals, so both cravings and goals are covered.",
  },
];

export default function Home() {
  const [email, setEmail] = useState("");
  const [subscribeLoading, setSubscribeLoading] = useState(false);
  const { products } = useProducts();
  const popularMeals = products.slice(0, 6);

  const handleSubscribe = async () => {
    const trimmed = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(trimmed)) {
      toast.error("Please enter a valid email.");
      return;
    }

    setSubscribeLoading(true);
    try {
      const response = await subscribeNewsletter(trimmed);
      toast.success(response.message || "Subscribed successfully!");
      setEmail("");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.error ||
          error?.message ||
          "Unable to subscribe right now."
      );
    } finally {
      setSubscribeLoading(false);
    }
  };

  return (
    <div className="overflow-x-hidden bg-[linear-gradient(180deg,#fff7ed_0%,#fffaf5_14%,#ffffff_34%,#fff7ed_64%,#fff1f2_100%)] text-slate-900 dark:bg-[radial-gradient(circle_at_15%_20%,rgba(255,124,64,0.12),transparent_30%),radial-gradient(circle_at_80%_10%,rgba(244,114,182,0.12),transparent_26%),linear-gradient(180deg,#0f172a_0%,#0b1225_45%,#0a1020_100%)] dark:text-slate-50">
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(251,146,60,0.24),_transparent_30%),radial-gradient(circle_at_85%_20%,_rgba(244,114,182,0.18),_transparent_24%),radial-gradient(circle_at_bottom_center,_rgba(253,224,71,0.18),_transparent_28%)]" />
        <div className="absolute left-[-6rem] top-24 h-64 w-64 rounded-full bg-orange-300/20 blur-3xl" />
        <div className="absolute bottom-0 right-[-5rem] h-72 w-72 rounded-full bg-rose-300/20 blur-3xl" />

        <div className="relative mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl items-center gap-14 px-6 py-16 md:grid-cols-[1.05fr_0.95fr] lg:px-10 lg:py-20">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/75 px-4 py-2 text-sm text-orange-700 shadow-sm backdrop-blur dark:border-orange-500/30 dark:bg-orange-500/10 dark:text-orange-200">
              <Sparkles className="h-4 w-4" />
              Flavor-forward meals, delivered beautifully
            </div>

            <div className="space-y-5">
              <h1 className="max-w-2xl text-5xl font-semibold leading-tight tracking-tight text-slate-900 dark:text-white md:text-6xl">
                Tastevia turns everyday delivery into your favorite part of the day.
              </h1>
              <p className="max-w-xl text-base leading-8 text-slate-600 dark:text-slate-300 md:text-lg">
                Warm comfort food, playful desserts, and quick drinks brought together in a landing experience that feels as fresh as the menu.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                to="/menu"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-7 py-3.5 text-sm font-semibold text-white shadow-[0_18px_50px_-18px_rgba(15,23,42,0.7)] transition-transform duration-300 hover:-translate-y-0.5"
              >
                Explore Menu
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/signup"
                className="inline-flex items-center justify-center rounded-2xl border border-orange-200 bg-white/70 px-7 py-3.5 text-sm font-semibold text-orange-700 backdrop-blur transition-colors hover:bg-orange-50"
              >
                Create Account
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { value: "30 min", label: "Average delivery window" },
                { value: "4.8/5", label: "Loved by regulars" },
                { value: "50+", label: "Comfort-first dishes" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-3xl border border-white/70 bg-white/70 p-5 shadow-[0_20px_50px_-35px_rgba(249,115,22,0.7)] backdrop-blur dark:border-slate-800 dark:bg-slate-900/60 dark:shadow-[0_24px_60px_-40px_rgba(0,0,0,0.65)]"
                >
                  <p className="text-2xl font-semibold text-slate-900 dark:text-slate-50">{stat.value}</p>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="relative"
          >
            <div className="absolute -left-6 top-8 hidden rounded-3xl border border-white/60 bg-white/80 p-4 shadow-xl backdrop-blur dark:border-slate-800 dark:bg-slate-900/70 md:block">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-orange-100 p-3 text-orange-600 dark:bg-orange-500/15 dark:text-orange-200">
                  <Star className="h-5 w-5 fill-current" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Customer favorite</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Fresh combos trending this week</p>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/60 bg-white/55 p-3 shadow-[0_30px_80px_-35px_rgba(249,115,22,0.65)] backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/60 dark:shadow-[0_30px_70px_-40px_rgba(0,0,0,0.7)]">
              <HeroCarousel />
            </div>

            <div className="absolute -bottom-6 right-3 rounded-3xl bg-slate-950 px-5 py-4 text-white shadow-2xl">
              <p className="text-xs uppercase tracking-[0.28em] text-orange-200">Live now</p>
              <p className="mt-1 text-sm font-medium">Cravings are being delivered across the city.</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="grid gap-6 md:grid-cols-3">
          {categories.map((category, index) => {
            const Icon = category.icon;

            return (
              <motion.div
                key={category.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ delay: index * 0.12 }}
                className="rounded-[2rem] border border-orange-100 bg-white/80 p-7 shadow-[0_25px_60px_-40px_rgba(15,23,42,0.45)] backdrop-blur dark:border-slate-800 dark:bg-slate-900/65 dark:shadow-[0_25px_60px_-40px_rgba(0,0,0,0.7)]"
              >
                <div className="mb-5 inline-flex rounded-2xl bg-orange-100 p-4 text-orange-600 dark:bg-orange-500/15 dark:text-orange-200">
                  <Icon className="h-7 w-7" />
                </div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50">{category.label}</h2>
                <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{category.caption}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="relative overflow-hidden py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-orange-500">
                Why Tastevia
              </p>
              <h2 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900 dark:text-white">
                Built for modern food cravings, not generic delivery screens.
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300">
              Tastevia blends warm visuals, confident motion, and clear messaging to make ordering feel inviting from the very first scroll.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 36 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: index * 0.12 }}
                  className="group rounded-[2rem] border border-white/70 bg-white/80 p-8 shadow-[0_30px_70px_-40px_rgba(15,23,42,0.45)] backdrop-blur dark:border-slate-800 dark:bg-slate-900/65 dark:shadow-[0_30px_70px_-40px_rgba(0,0,0,0.75)]"
                >
                  <div className={`mb-6 inline-flex rounded-2xl bg-gradient-to-br ${feature.accent} p-4 text-slate-900 dark:text-slate-100`}>
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-50">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{feature.desc}</p>
                  <div className="mt-6 h-1.5 w-20 rounded-full bg-gradient-to-r from-orange-400 to-rose-400 transition-all duration-300 group-hover:w-28" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="grid gap-8 rounded-[2rem] bg-slate-950 px-8 py-10 text-white shadow-[0_35px_90px_-45px_rgba(15,23,42,0.9)] lg:grid-cols-[0.95fr_1.05fr] lg:px-12 lg:py-14">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-orange-200">
              How It Works
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight">
              A smoother order flow from craving to checkout.
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-7 text-slate-300">
              Each step is simple, mobile-friendly, and designed to keep users moving without friction.
            </p>
          </div>

          <div className="grid gap-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ delay: index * 0.12 }}
            className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5 backdrop-blur dark:border-slate-800/80 dark:bg-slate-900/60"
          >
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-400 to-rose-400 text-sm font-bold text-white">
                    0{index + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{step.title}</h3>
                    <p className="mt-1 text-sm leading-7 text-slate-300">{step.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-orange-500">
                Popular Now
              </p>
              <h2 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900 dark:text-white">
                Crowd favorites worth featuring on the first visit.
              </h2>
            </div>
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 text-sm font-semibold text-orange-600 transition-colors hover:text-orange-700"
          >
            See full menu
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          {popularMeals.map((meal, index) => (
            <motion.div
              key={meal.id}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ delay: index * 0.08 }}
            >
              <ProductCard {...meal} />
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] border border-orange-100 bg-white/85 p-8 shadow-[0_25px_70px_-45px_rgba(249,115,22,0.9)] dark:border-slate-800 dark:bg-slate-900/70 dark:shadow-[0_25px_70px_-40px_rgba(0,0,0,0.75)]">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-orange-500">
              Stay in the Loop
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 dark:text-white">
              Weekly offers and seasonal drops.
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
              Sign up for warm weekend deals, limited drops, and meal launches worth keeping an eye on.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="min-h-12 flex-1 rounded-2xl border border-orange-100 bg-orange-50/60 px-4 text-sm text-slate-700 outline-none transition focus:border-orange-300 focus:bg-white dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-orange-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                onClick={handleSubscribe}
                disabled={subscribeLoading}
                className="rounded-2xl bg-gradient-to-r from-orange-500 to-rose-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {subscribeLoading ? "Subscribing..." : "Subscribe"}
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.details
                key={faq.q}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.08 }}
                className="rounded-[1.5rem] border border-slate-200 bg-white/80 p-5 shadow-[0_24px_60px_-50px_rgba(15,23,42,0.9)] backdrop-blur dark:border-slate-800 dark:bg-slate-900/70 dark:shadow-[0_24px_60px_-45px_rgba(0,0,0,0.75)]"
              >
                <summary className="cursor-pointer list-none text-base font-semibold text-slate-900 dark:text-slate-100">
                  {faq.q}
                </summary>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{faq.a}</p>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-20 lg:px-10">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-orange-500 via-orange-400 to-rose-500 px-8 py-14 text-center text-white shadow-[0_35px_90px_-45px_rgba(249,115,22,0.95)] lg:px-12">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-semibold tracking-tight md:text-5xl"
          >
            Ready for something delicious?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-orange-50 md:text-base"
          >
            Explore the menu, discover your next comfort favorite, and get it delivered with speed and style.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8"
          >
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-3.5 text-sm font-semibold text-orange-600 transition-transform hover:-translate-y-0.5"
            >
              Order Now
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
