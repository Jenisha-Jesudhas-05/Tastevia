import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const testimonials = [
  { quote: "Tastevia makes ordering food so easy and fast!", name: "Alex P." },
  { quote: "The desserts are amazing, and delivery is always on time!", name: "Priya S." },
  { quote: "I love the variety and quick delivery times!", name: "Rahul K." },
  { quote: "The interface is smooth, and meals always arrive hot!", name: "Sanya M." },
];

export default function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0);

  // Auto-rotate every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-24 bg-gradient-to-r from-orange-50 to-pink-50 text-center overflow-hidden">
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-orange-200 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-pink-200 rounded-full opacity-20 blur-3xl"></div>

      <h2 className="text-3xl md:text-4xl font-bold mb-16 relative z-10">
        What Our Users Say
      </h2>

      <div className="max-w-3xl mx-auto relative z-10">
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={current}
            className="p-10 bg-white/70 backdrop-blur-md rounded-3xl shadow-xl"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.8 }}
          >
            <svg
              className="w-10 h-10 text-orange-400 mb-4 mx-auto"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M7.17 6A5 5 0 007 11h4v4H5v-4h2.17A3 3 0 017.17 6zm10 0a5 5 0 00-.17 5H19v4h-6v-4h2.17a3 3 0 01.17-5z" />
            </svg>

            <p className="text-gray-800 italic text-lg mb-4">
              "{testimonials[current].quote}"
            </p>
            <cite className="block font-semibold text-gray-900">
              — {testimonials[current].name}
            </cite>
          </motion.blockquote>
        </AnimatePresence>

        <div className="flex justify-center gap-3 mt-6">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-3 h-3 rounded-full ${
                i === current ? "bg-orange-500" : "bg-gray-300"
              } transition`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
}