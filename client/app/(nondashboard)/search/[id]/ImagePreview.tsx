"use client";
import React, { useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type ImagePreviewProps = {
  images: StaticImageData[];
};

const ImagePreview = ({ images }: ImagePreviewProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePreview = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative h-[450px] w-full overflow-hidden">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
        >
          <Image
            src={image}
            alt={`Property Image ${index + 1}`}
            fill
            priority={index === 0}
            className="object-cover cursor-pointer transition-transform duration-500 ease-in-out"
          />

          <button
            onClick={handlePreview}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-900 bg-opacity-50 p-2 rounded-full focus:outline-none focus:ring focus:ring-slate-300"
            aria-label="Previous image"
          >
            <ChevronLeft className="text-white" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-900 bg-opacity-50 p-2 rounded-full focus:outline-none focus:ring focus:ring-slate-300"
            aria-label="Next image"
          >
            <ChevronRight className="text-white" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default ImagePreview;
