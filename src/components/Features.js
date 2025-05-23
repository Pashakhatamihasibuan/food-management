"use client";

import { FaUtensils, FaMobileAlt, FaRegSmile } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Features() {
  const features = [
    {
      icon: <FaUtensils className="text-indigo-600 text-4xl mb-4" />,
      title: "Variety of Cuisines",
      description: "Explore dishes from various cultures and taste the world.",
    },
    {
      icon: <FaMobileAlt className="text-indigo-600 text-4xl mb-4" />,
      title: "User-Friendly App",
      description: "Easy to navigate interface for a seamless experience.",
    },
    {
      icon: <FaRegSmile className="text-indigo-600 text-4xl mb-4" />,
      title: "Customer Satisfaction",
      description: "Our top priority is to make you happy with our service.",
    },
  ];

  return (
    <section id="features" className="py-24 bg-gray-50 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">Our Features</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              {feature.icon}
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
