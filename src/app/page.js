"use client";

import Hero from "@/components/Hero";
import About from "@/components/About";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Features />
      <Testimonials />
      <Footer />
    </>
  );
}
