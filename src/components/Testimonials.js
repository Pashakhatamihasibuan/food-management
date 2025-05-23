"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Testimonials() {
  const testimonials = [
    {
      name: "John Doe",
      feedback: "This platform has changed the way I discover new foods. Highly recommended!",
      image: "/user1.jpg",
    },
    {
      name: "Jane Smith",
      feedback: "A seamless experience with a wide variety of options. Love it!",
      image: "/user2.jpg",
    },
    {
      name: "Emily Johnson",
      feedback: "Fantastic service and delicious food choices. Five stars!",
      image: "/user3.jpg",
    },
  ];

  return (
    <section id="testimonials" className="py-28 bg-white px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-12">What Our Users Say</h2>
        <div className="grid md:grid-cols-3 gap-10">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-gray-50 p-6 rounded-2xl shadow-lg text-center hover:shadow-xl transition"
            >
              <Image src={testimonial.image} alt={testimonial.name} width={80} height={80} className="mx-auto rounded-full mb-4 object-cover" />
              <p className="text-gray-700 italic mb-4">“{testimonial.feedback}”</p>
              <h3 className="text-lg font-semibold text-gray-800">{testimonial.name}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
