"use client";

import React from 'react'
import { motion } from "framer-motion"
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import Img from "@/public/landing-search3.png"
const containerVariants = {
     hidden: { opacity: 0 , y: 50},
     visible: {
        opacity:1 ,
        y:0,
        transition : {
            duration: 0.5,
            staggerChildren: 0.2
        }
     }
}
const itemsVariants = {
    hidden: { opacity: 0, y:20},
    visible:{
        opacity:1,
        y:0
    },
}
const FeaturesSection = () => {
  return (
  <motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true}}
  variants= {containerVariants}
  className="py-24 px-6 sm:px-8 lg:px-12 xl:px-16 bg-white"
  >
<div className="max-w-4xl xl:max-w-6xl mx-auto">
    <motion.h2
    variants={itemsVariants}
    className="text-3xl font-bold text-center mb-12 w-full sm:w-2/3 mx-auto ">
     Quickly find the home you want using our effective filters!
    </motion.h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 xl:gap-16">
   {[0, 1, 2].map((index) => (
  <motion.div key={index} variants={itemsVariants}>
    <FeatureCard
    imageSrc={Img}
    title={
        [
            "Trustworthy and verified Listings",
            "Browse Rental Listings with ease",
            "Simplify Your rental Search with advances."
        ][index]
    }
    description={
        [
            "Discover the best rental options with user review and ratings.",
            "Get access to user reviews and ratings for a better understanding.",
            "Find trustworthy and verified rental listings."
        ][index]
    }
    linkText={["Explore","Search", "Discover"] [index]}
    linkHref={["/explore","/search", "/discover"] [index]}
    />
  </motion.div>
))}

    </div>
</div>
  </motion.div>
  );
}

const FeatureCard = ({
  imageSrc,
  title,
  description,
  linkText,
  linkHref,
}: {
  imageSrc: StaticImageData;
  title: string;
  description: string;
  linkText: string;
  linkHref: string;
}) => {
  return (
    <div className="flex flex-col text-center items-center p-6 border border-gray-200 rounded-lg shadow-md">
      <div className="p-4 rounded-lg mb-4 flex items-center justify-center h-48 w-full">
        <Image
          src={imageSrc}
          width={400}
          height={400}
          className="w-full h-full object-contain"
          alt={title}
        />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="mb-4">{description}</p>
      <Link
        href={linkHref}
        className="inline-block border border-gray-300 rounded px-4 py-2 hover:bg-gray-100"
        scroll={false}
      >
        {linkText}
      </Link>
    </div>
  );
};


export default FeaturesSection
