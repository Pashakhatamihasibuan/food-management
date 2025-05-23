"use client";

import Button from "./Button";
import Link from "next/link";
import Image from "next/image";
import foodImage from "@/app/assets/images/foods.png";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex flex-col-reverse md:flex-row items-center justify-between bg-gradient-to-b from-white via-indigo-50 to-indigo-100 pt-32 px-6 md:px-16"
    >
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full md:w-1/2 text-center md:text-left"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
          Discover <span className="text-indigo-600">Delicious</span> Food <br className="hidden md:block" /> Everyday
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-8">
          Explore the best dishes from various cuisines. Join our community and find your favorite meals today.
        </p>
        <div className="flex justify-center md:justify-start">
          <Link href="/login">
            <Button>Get Started</Button>
          </Link>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full md:w-1/2 mb-12 md:mb-0 flex justify-center"
      >
        <Image
          src={foodImage}
          alt="Delicious food illustration"
          width={700}
          height={700}
          className="w-full max-w-sm md:max-w-lg h-auto object-contain rounded-2xl"
        />
      </motion.div>
    </section>
  );
}
