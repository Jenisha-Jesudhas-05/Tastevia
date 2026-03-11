import { Link } from "react-router-dom";
import { Pizza, IceCream, Coffee } from "lucide-react";
import { motion } from "framer-motion";
import TestimonialsCarousel from "../components/TestimonialsCarousel";
import HeroCarousel from "../components/HeroCarousel"; // Hero carousel import

export default function Home() {
  const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } };

  return (
    <div className="font-sans text-gray-900 overflow-x-hidden">

      {/* HERO SECTION */}
      <section className="relative h-screen flex flex-col md:flex-row items-center justify-between px-6 md:px-16 bg-linear-to-br from-orange-50 via-white to-orange-50 overflow-hidden">
        {/* Floating shapes */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-orange-200 rounded-full opacity-20 blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-pink-200 rounded-full opacity-20 blur-3xl animate-pulse"></div>
        <div className="absolute -top-10 -right-20 w-60 h-60 bg-yellow-200 rounded-full opacity-30 blur-2xl animate-bounce"></div>

        {/* Left content */}
        <motion.div
          className="md:w-1/2 flex flex-col gap-6 z-10"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 leading-tight">
            Fresh Meals Delivered <br /> To Your Doorstep
          </h1>
          <p className="text-gray-600 text-lg md:text-xl">
            Fast, delicious, and reliable. Tastevia brings your favorite meals straight to you.
          </p>

          <div className="flex gap-4">
            <Link
              to="/menu"
              className="bg-linear-to-r from-orange-500 to-pink-500 text-white px-8 py-3 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
            >
              Order Now
            </Link>
            <Link
              to="/signup"
              className="border border-orange-500 text-orange-500 px-8 py-3 rounded-xl hover:bg-orange-50 transition"
            >
              Sign Up
            </Link>
          </div>

          {/* Icons */}
          <div className="flex gap-6 mt-6 text-orange-400">
            <Pizza size={40} className="animate-bounce" />
            <IceCream size={36} className="animate-bounce delay-200" />
            <Coffee size={34} className="animate-bounce delay-400" />
          </div>
        </motion.div>

        {/* Right hero carousel */}
        <motion.div
          className="md:w-1/2 mt-10 md:mt-0 z-10 relative"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <HeroCarousel />
          <div className="absolute -bottom-10 left-1/4 w-40 h-40 bg-pink-300 rounded-full opacity-20 blur-2xl animate-pulse"></div>
        </motion.div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-24 bg-linear-to-b from-white via-orange-50 to-white text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 w-96 h-96 bg-yellow-200 rounded-full opacity-10 blur-3xl -translate-x-1/2 animate-spin-slow"></div>
        <h2 className="text-4xl font-bold text-gray-800 mb-16">Why Choose Tastevia?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            { title: "Fast Delivery", desc: "Get your favorite meals delivered quickly.", icon: <Pizza size={48} className="text-red-500" /> },
            { title: "Fresh Ingredients", desc: "High-quality fresh ingredients in every meal.", icon: <Coffee size={48} className="text-yellow-500" /> },
            { title: "Variety of Meals", desc: "Choose from a wide variety of dishes.", icon: <IceCream size={48} className="text-pink-500" /> },
            { title: "Healthy Options", desc: "Balanced and nutritious meals.", icon: <Pizza size={48} className="text-green-500" /> },
            { title: "24/7 Support", desc: "Always here to help.", icon: <Coffee size={48} className="text-blue-500" /> },
            { title: "Customizable Meals", desc: "Pick exactly what you want.", icon: <IceCream size={48} className="text-purple-500" /> },
          ].map((feature, i) => (
            <motion.div
              key={i}
              className="bg-white/70 backdrop-blur-md p-8 rounded-2xl shadow-lg flex flex-col items-center hover:scale-105 transition-transform duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 bg-linear-to-b from-gray-50 to-white text-center relative overflow-hidden">
        <h2 className="text-4xl font-bold mb-12">How It Works</h2>
        <div className="flex flex-col md:flex-row gap-10 max-w-6xl mx-auto">
          {[
            { title: "Order", desc: "Choose your favorite meals.", icon: <Pizza size={50} className="text-red-500 mx-auto mb-4" /> },
            { title: "Cook", desc: "Meals prepared fresh by our chefs.", icon: <Coffee size={50} className="text-yellow-500 mx-auto mb-4" /> },
            { title: "Deliver", desc: "Delivered hot at your doorstep.", icon: <IceCream size={50} className="text-pink-500 mx-auto mb-4" /> },
          ].map((step, i) => (
            <motion.div
              key={i}
              className="bg-white/70 backdrop-blur-md p-8 rounded-2xl shadow-lg flex-1 hover:scale-105 transition-transform duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
            >
              {step.icon}
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* POPULAR MEALS */}
      <section className="py-24 bg-linear-to-b from-white via-orange-50 to-white text-center relative">
        <h2 className="text-4xl font-bold mb-12">Popular Meals</h2>
        <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto">
          {[1, 2, 3, 4, 5, 6].map((meal) => (
            <motion.div
              key={meal}
              className="w-72 bg-white/70 backdrop-blur-md rounded-3xl shadow-xl overflow-hidden hover:scale-105 transition-transform duration-300 relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: meal * 0.1 }}
            >
              <img src={"/assets/logo.png"} alt={`Meal ${meal}`} className="w-full h-48 object-cover"/>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Delicious Meal {meal}</h3>
                <p className="text-gray-600 mb-4">$ {8 + meal}.99</p>
                <Link
                  to="/menu"
                  className="bg-linea-to-r from-orange-500 to-pink-500 text-white px-6 py-2 rounded-lg shadow hover:scale-105 transition-transform duration-300"
                >
                  Add to Cart
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS CAROUSEL */}
      <TestimonialsCarousel />

      {/* FAQ */}
      <section className="py-24 bg-linear-to-b from-gray-50 to-white text-center">
        <h2 className="text-4xl font-bold mb-12">Frequently Asked Questions</h2>
        <div className="max-w-4xl mx-auto text-left space-y-4">
          {[
            { q: "How fast is delivery?", a: "Delivery is typically under 30 minutes depending on your location." },
            { q: "Can I customize my meal?", a: "Yes, you can select ingredients and portion sizes before ordering." },
            { q: "Are there healthy options?", a: "We provide balanced meals suitable for all diets." },
          ].map((faq, i) => (
            <details key={i} className="bg-white/70 backdrop-blur-md p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
              <summary className="font-semibold cursor-pointer">{faq.q}</summary>
              <p className="mt-2 text-gray-600">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="py-24 bg-white text-center relative overflow-hidden">
        <h2 className="text-4xl font-bold mb-6">Join Our Newsletter</h2>
        <p className="text-gray-600 mb-6">Get the latest updates and offers directly in your inbox.</p>
        <div className="flex justify-center gap-4 max-w-md mx-auto">
          <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"/>
          <button className="bg-linear-to-r from-orange-500 to-pink-500 text-white px-6 py-3 rounded-lg hover:scale-105 transition-transform duration-300">
            Subscribe
          </button>
        </div>
      </section>

      {/* CALL-TO-ACTION */}
      <section className="py-24 text-center bg-linear-to-r from-orange-500 to-pink-500 text-white relative overflow-hidden">
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Ready to Taste the Best?
        </motion.h2>
        <motion.p
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Join thousands of happy users enjoying delicious food every day.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <Link
            to="/menu"
            className="bg-white text-orange-600 px-10 py-4 rounded-2xl font-semibold hover:scale-105 transition-transform duration-300"
          >
            Get Started
          </Link>
        </motion.div>
      </section>

      

    </div>
  );
}