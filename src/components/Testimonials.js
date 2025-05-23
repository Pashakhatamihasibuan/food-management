"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

export default function Testimonials() {
  const testimonials = [
    {
      name: "John Doe",
      role: "Food Blogger",
      feedback: "This platform has completely transformed how I discover new cuisines. The recommendations are spot-on every time!",
      image:
        "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=2662&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 5,
    },
    {
      name: "Jane Smith",
      role: "Home Chef",
      feedback: "The seamless experience and incredible variety make this my go-to app for meal inspiration. Absolutely love it!",
      image:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 5,
    },
    {
      name: "Emily Johnson",
      role: "Nutritionist",
      feedback: "As a health professional, I appreciate the quality and diversity of options. My clients love the recommendations!",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 4,
    },
  ];

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-b from-gray-50 to-white px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-indigo-600 font-semibold text-lg mb-3 inline-block">Testimonials</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Voices of Delight</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Hear what our community says about their culinary journey with us</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group relative bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
            >
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-16 h-16 rounded-full border-4 border-white overflow-hidden shadow-md">
                  <Image src={testimonial.image} alt={testimonial.name} width={80} height={80} className="w-full h-full object-cover" />
                </div>
              </div>

              <div className="mt-8 text-center">
                <div className="flex justify-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={`text-lg ${i < testimonial.rating ? "text-amber-400" : "text-gray-300"}`} />
                  ))}
                </div>

                <FaQuoteLeft className="text-gray-300 text-3xl mx-auto mb-4" />

                <p className="text-gray-700 mb-6 italic relative">
                  <span className="absolute top-0 left-0 text-6xl text-gray-100 -translate-y-4 -translate-x-2">“</span>
                  {testimonial.feedback}
                  <span className="absolute bottom-0 right-0 text-6xl text-gray-100 translate-y-2 translate-x-2">”</span>
                </p>

                <div>
                  <h3 className="text-lg font-bold text-gray-800">{testimonial.name}</h3>
                  <p className="text-indigo-600 text-sm">{testimonial.role}</p>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.4 }} viewport={{ once: true }} className="mt-16 text-center">
          <button className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105">
            Share Your Experience
          </button>
        </motion.div>
      </div>
    </section>
  );
}
