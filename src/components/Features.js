"use client";

import { FaUtensils, FaMobileAlt, FaRegSmile } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Features() {
  const features = [
    {
      icon: <FaUtensils />,
      title: "Variety of Cuisines",
      description: "Explore dishes from cultures around the world.",
    },
    {
      icon: <FaMobileAlt />,
      title: "User-Friendly App",
      description: "Enjoy a smooth and intuitive food discovery experience.",
    },
    {
      icon: <FaRegSmile />,
      title: "Customer Satisfaction",
      description: "We focus on delivering joy through every order.",
    },
  ];

  return (
    <section id="features" className="py-28 bg-gray-50 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-12">What Makes Us Special</h2>
        <div className="grid md:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition"
            >
              <div className="text-indigo-600 text-5xl mb-4 mx-auto">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
