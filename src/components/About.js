"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="py-24 bg-white px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">About Our Food Platform</h2>
          <p className="text-gray-700 text-lg mb-6">
            We provide access to a variety of cuisines from around the world. Whether you&apos;re craving traditional dishes or looking to try something new,
            our platform helps you find the best food available with just a few clicks.
          </p>
          <p className="text-gray-600">
            Our mission is to connect people with great food experiences through technology and innovation. Join us and taste the difference.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2"
        >
          <Image src="/about-image.svg" alt="About us illustration" width={500} height={500} className="w-full h-auto rounded-xl shadow-md" />
        </motion.div>
      </div>
    </section>
  );
}
