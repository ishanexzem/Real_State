"use client";

import Image from "next/image";
import React from "react";
import Img from "@/public/landing-call-to-action.jpg";
import { motion } from "framer-motion";
import Link from "next/link";

const CallToActionSection = () => {
  return (
    <div className="relative h-[32rem] overflow-hidden ">
      <Image
        src={Img}
        alt="rentful search action background"
        fill
        className="object-cover object-center"
        priority
      />

      <div className="absolute inset-0 bg-black opacity-60"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="max-w-4xl xl:max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 py-12 text-center text-white">
           
          <h2 className="text-3xl md:text-4xl font-bold mb-4 ">
            Find your <span className="bg-gradient-to-r from-red-500 to-pink-300 bg-clip-text text-transparent">Dream Rental Property </span>
          </h2>
          <p className="mb-6 text-lg">
            Discover a wide range of rental properties in your desired location.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() =>
                window.scrollTo({ top: 0, behavior: "smooth" })
              }
              className="text-slate-950 bg-white rounded-lg px-6 py-3 font-semibold hover:bg-slate-500 hover:text-white transition"
            >
              Search
            </button>
            <Link
              href="/signup"
              className="text-white bg-red-500 rounded-lg px-6 py-3 font-semibold hover:bg-red-700 transition"
              scroll={false}
            >
              Sign Up
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CallToActionSection;
