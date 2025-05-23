"use client";

import { FaUtensils, FaMobileAlt, FaRegSmile, FaLeaf, FaStar, FaHeart } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Features() {
  const features = [
    {
      icon: <FaUtensils className="text-4xl" />,
      title: "Global Cuisines",
      description: "Discover authentic flavors from every corner of the world, carefully curated by our culinary experts.",
      color: "text-amber-500",
    },
    {
      icon: <FaMobileAlt className="text-4xl" />,
      title: "Seamless Experience",
      description: "Our intuitive platform makes ordering your favorite meals effortless and enjoyable.",
      color: "text-blue-500",
    },
    {
      icon: <FaRegSmile className="text-4xl" />,
      title: "Happy Customers",
      description: "Join thousands of satisfied food lovers who trust us for their culinary adventures.",
      color: "text-emerald-500",
    },
    {
      icon: <FaLeaf className="text-4xl" />,
      title: "Fresh Ingredients",
      description: "Only the freshest, highest quality ingredients in every dish we deliver.",
      color: "text-green-500",
    },
    {
      icon: <FaStar className="text-4xl" />,
      title: "Top Rated",
      description: "Consistently rated 5-stars for taste, quality, and delivery experience.",
      color: "text-yellow-500",
    },
    {
      icon: <FaHeart className="text-4xl" />,
      title: "Made with Love",
      description: "Every dish prepared with passion and attention to detail.",
      color: "text-rose-500",
    },
  ];

  return (
    <section id="features" className="py-20 bg-gradient-to-b from-white to-gray-50 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-indigo-600 font-semibold text-lg mb-3 inline-block">Why Choose Us</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Exceptional Dining Experience</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We combine quality ingredients, expert chefs, and passionate service to create memorable meals
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group relative bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div
                  className={`w-16 h-16 ${feature.color} rounded-full flex items-center justify-center mb-6 mx-auto group-hover:bg-opacity-10 group-hover:scale-110 transition-all`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">{feature.title}</h3>
                <p className="text-gray-600 text-center">{feature.description}</p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.4 }} viewport={{ once: true }} className="mt-16 text-center">
          <button className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105">
            Explore Our Menu
          </button>
        </motion.div>
      </div>
    </section>
  );
}
