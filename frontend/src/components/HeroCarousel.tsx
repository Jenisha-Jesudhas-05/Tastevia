import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import hero1 from "@/assets/hero1.jpg"; // replace with real hero images
import hero2 from "@/assets/hero2.jpg";
import hero3 from "@/assets/hero3.jpg";

const heroImages = [hero1, hero2, hero3];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden rounded-3xl shadow-2xl">
      <AnimatePresence mode="wait">
        <motion.img
          key={current}
          src={heroImages[current]}
          alt={`Hero ${current + 1}`}
          className="w-full h-full object-cover"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 1 }}
        />
      </AnimatePresence>

      {/* Navigation dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {heroImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full ${
              i === current ? "bg-white" : "bg-gray-400/50"
            } transition`}
          />
        ))}
      </div>
    </div>
  );
}