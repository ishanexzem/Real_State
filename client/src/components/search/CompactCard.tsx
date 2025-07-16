"use client";

import React, { useState } from 'react';
import IMG from "@/public/placeholder.jpg";
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Star, Bath, House, Bed } from 'lucide-react';

const CompactCard = ({
  property,
  isFavorite,
  onFavoriteToggle,
  showFavoriteButton = true,
  propertyLink,
}: CardProps) => {
  const [imgSrc, setImgSrc] = useState(
    property.photoUrls?.[0] || IMG.src
  );

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg w-full mb-5 flex h-40">
      
      {/* LEFT: Image with badges */}
      <div className="relative w-1/3">
        <Image
          src={imgSrc}
          alt={property.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onError={() => setImgSrc(IMG.src)}
        />

        {/* Badges */}
        <div className="absolute bottom-2 left-2 flex flex-col gap-1">
          {property.isPetsAllowed && (
            <span className="bg-white text-black text-xs font-semibold px-2 py-1 rounded-full w-fit">
              Pets
            </span>
          )}
          {property.isParkingIncluded && (
            <span className="bg-white text-black text-xs font-semibold px-2 py-1 rounded-full w-fit">
              Parking
            </span>
          )}
        </div>
      </div>

      {/* RIGHT: Details */}
      <div className="w-2/3 p-4 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start">
            <h2 className="text-sm font-bold">
              {propertyLink ? (
                <Link
                  href={propertyLink}
                  className="hover:underline hover:text-blue-600"
                  scroll={false}
                >
                  {property.name}
                </Link>
              ) : (
                property.name
              )}
            </h2>
            {showFavoriteButton && (
              <button
                className="bg-white rounded-full p-1"
                onClick={onFavoriteToggle}
              >
                <Heart
                  className={`w-4 h-4 ${
                    isFavorite ? "text-red-500 fill-red-500" : "text-gray-600"
                  }`}
                />
              </button>
            )}
          </div>

          <p className="text-gray-600 mb-1 text-xs">
            {property?.location?.address}, {property?.location?.city}
          </p>

          <div className="flex items-center mb-1 text-xs">
            <Star className="h-3 w-3 text-yellow-400 mr-1" />
            <span className="font-semibold">
              {property.averageRating?.toFixed(1)}
            </span>
            <span className="text-gray-600 ml-1">
              ({property.numberOfReviews})
            </span>
          </div>
        </div>

        <div className="flex justify-between items-center text-gray-600 text-xs">
          <div className="flex gap-3">
            <span className="flex items-center">
              <Bed className="w-4 h-4 mr-1" />
              {property.beds}
            </span>
            <span className="flex items-center">
              <Bath className="w-4 h-4 mr-1" />
              {property.baths}
            </span>
            <span className="flex items-center">
              <House className="w-4 h-4 mr-1" />
              {property.squareFeet} sqft
            </span>
          </div>
          <div className="text-sm font-bold">
            ${property.pricePerMonth?.toFixed(0)}
            <span className="text-gray-600 font-normal"> /mo</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompactCard;
