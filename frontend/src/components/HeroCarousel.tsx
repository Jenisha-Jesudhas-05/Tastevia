import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import hero1 from "@/assets/hero1.jpg"; // replace with real hero images
import hero2 from "@/assets/hero2.jpg";
import hero3 from "@/assets/hero3.jpg";

const heroImages = [hero1, hero2, hero3];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Auto-slide every 5 seconds (paused for reduced motion or hidden tab)
  useEffect(() => {
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroImages.length);
    }, 3000);

    const stopOnHide = () => {
      if (document.hidden) clearInterval(interval);
    };

    document.addEventListener("visibilitychange", stopOnHide);

    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", stopOnHide);
    };
  }, [prefersReducedMotion]);

  const activeImage = useMemo(() => heroImages[current], [current]);

  // Preload hero images once to reduce on-screen wait
  useEffect(() => {
    let cancelled = false;
    Promise.all(
      heroImages.map(
        (src) =>
          new Promise<void>((resolve) => {
            const img = new Image();
            img.onload = () => resolve();
            img.onerror = () => resolve();
            img.src = src;
          })
      )
    ).then(() => {
      if (!cancelled) setIsReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-3xl bg-gradient-to-br from-orange-50 via-white to-rose-50 shadow-2xl dark:from-slate-900 dark:via-slate-950 dark:to-slate-900">
      <AnimatePresence mode="wait" initial={!prefersReducedMotion}>
        <motion.img
          key={current}
          src={activeImage}
          alt={`Hero ${current + 1}`}
          loading={current === 0 ? "eager" : "lazy"}
          fetchPriority={current === 0 ? "high" : "low"}
          decoding="async"
          className="h-full w-full object-cover"
          initial={prefersReducedMotion ? undefined : { opacity: 0, x: 60 }}
          animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
          exit={prefersReducedMotion ? undefined : { opacity: 0, x: -60 }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.8, ease: "easeOut" }}
        />
      </AnimatePresence>

      {/* Navigation dots */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 rounded-full bg-black/35 px-3 py-2 backdrop-blur-sm">
        {heroImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2.5 w-2.5 rounded-full transition ${
              i === current ? "bg-white" : "bg-white/40"
            }`}
            disabled={!isReady && i !== 0}
          />
        ))}
      </div>
    </div>
  );
}
