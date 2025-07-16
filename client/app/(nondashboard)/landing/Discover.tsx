"use client";

import React from "react";
import type { StaticImageData } from "next/image";
import { motion } from "framer-motion";
import Image from "next/image";
import Img from "@/public/landing-icon-wand.png";
import Img1 from "@/public/landing-icon-calendar.png";
import Img2 from "@/public/landing-icon-heart.png";
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};
const itemsVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
  },
};
const Discover = () => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.8 }}
      variants={containerVariants}
      className="py-12  mb-16 bg-white"
    >
      <div className="max-w-6xl xl:max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        <motion.div variants={itemsVariants} className="my-12 text-center">
          <h2 className="text-3xl font-semibold leading-tight text-gray-800">
            Discover
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Find your Dream Rental Property today.
          </p>
          <p className="mt-2 text-gray-500 max-w-3xl mx-auto">
            Searching for your dream rental property has never been easier. With
            our user friendly search feature , you can quickly find the perfect
            home that meets all your needs.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 xl:gap-16 text-center ">
          {[
            {
              imageSrc:  Img ,
              title: "Search for properties",
              description:
                "Browse through our extensive collection of rental properties in your desired location",
            },
            {
              imageSrc:  Img1 ,
              title: "Book your Rental",
              description:
                "Once you have found the perfect rental property, easily book it online.",
            },
            {
              imageSrc:  Img2 ,
              title: "Enjoy Your New Home",
              description:
                "Move into your new rental property and enjoy your home.",
            },
          ].map((card, index) => (
            <motion.div key={index} variants={itemsVariants}>
              <DiscoverCard {...card}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const DiscoverCard = ({
  imageSrc,
  title,
  description,
}: {
  imageSrc: StaticImageData;
  title: string;
  description: string;
}) => {
  return (
    <div className="px-4 py-12 shadow-lg rounded-lg bg-white md:h-72">
      <div className="bg-slate-950 p-[0.6rem] rounded-full hb-4 h-10 w-10 mx-auto">
        <Image
          src={imageSrc}
          width={30}
          height={30}
          className="w-full h-full"
          alt={title}
        />
      </div>
      <h3 className="mt-4 text-4xl font-medium text-gray-800">{title}</h3>
      <p className="mt-2 text-base text-gray-500">{description}</p>
    </div>
  );
};

export default Discover;
