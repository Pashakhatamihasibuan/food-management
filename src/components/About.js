"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="py-28 px-6 bg-white">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <h2 className="text-4xl font-bold text-gray-900 mb-6 leading-snug">Discover Our Food Platform</h2>
          <p className="text-gray-700 text-lg mb-4">
            From local favorites to international cuisine, we bring the world’s best dishes to your fingertips. Search, explore, and enjoy meals you love.
          </p>
          <p className="text-gray-600 text-base">
            We’re committed to transforming how you experience food by bridging tech with taste. Let’s make every meal unforgettable.
          </p>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <Image src="/about-image.svg" alt="Food platform illustration" width={500} height={500} className="w-full h-auto rounded-2xl shadow-lg" />
        </motion.div>
      </div>
    </section>
  );
}
