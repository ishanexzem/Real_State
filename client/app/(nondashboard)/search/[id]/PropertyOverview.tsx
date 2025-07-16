"use client"

import React from 'react'
import { useGetPropertyQuery } from '@/state/api'
import { MapPin,Star } from 'lucide-react'

interface PropertyOverviewProps {
  propertyId: number
}

const PropertyOverview = ({ propertyId }: PropertyOverviewProps) => {
  const {
    data: property,
    isError,
    isLoading
  } = useGetPropertyQuery(propertyId)

  if (isLoading) return <>Loading...</>
  if (isError || !property) return <div>Property not found!</div>

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <div className="text-sm text-gray-500 mb-1">
          Indonesia / Bali /{" "}
          <span className="font-semibold text-gray-600">South Kuta</span>
        </div>
        <h1 className="text-3xl font-bold mb-4">{property.name}</h1>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <span className="flex items-center text-gray-500">
            <MapPin className="w-4 h-4 mr-1 text-gray-700" />
            {property.location?.city}, {property.location?.state}, {property.location?.country}
          </span>
<div className="flex gap-4 text-sm sm:text-base items-center">
  <span className="flex items-center text-yellow-500">
  <Star className="w-4 h-4 mr-1 fill-yellow-500" />
  {property?.averageRating?.toFixed(1) ?? "N/A"} ({property?.numberofReviews ?? 0} Reviews)
</span>

  <span className="text-green-600 font-semibold">Verified Listing</span>
</div>




        </div>


      </div>

      {/* Details */}
      <div className="border border-slate-200 rounded-xl p-6 mb-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-sm text-gray-500">Monthly Rent</div>
            <div className="font-semibold text-lg">${property.pricePerMonth.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Bedrooms</div>
            <div className="font-semibold">{property.beds} bd</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Bathrooms</div>
            <div className="font-semibold">{property.baths} ba</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Square Feet</div>
            <div className="font-semibold">{property.squareFeet.toLocaleString()} sq ft</div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div>
        <h2 className="text-xl font-semibold mb-5">About {property.name}</h2>
        <p className="text-gray-500 leading-7 whitespace-pre-line">
          {property.description}

          {"\n\n"}Experience resort style luxury living at Seacrest Homes, where the ocean and city are seamlessly intertwined. Our newly built community features sophisticated two and three-bedroom residences, each complete with high end designer finishes, quartz counter tops, stainless steel whirlpool appliances, office nook, and a full size in-unit washer and dryer.

          Find your personal escape at home beside stunning swimming pools and spas with poolside cabanas. Experience your very own oasis surrounded by lavish landscaped courtyards, with indoor/outdoor entertainment seating.

          By day, lounge in the BBQ area and experience the breathtaking unobstructed views stretching from the Palos Verdes Peninsula to Downtown Los Angeles, or watch the beauty of the SoHo Bay skyline light up by night.

          Start or end your day with a workout at our full-size state of the art fitness club and yoga studio. Save the commute and plan your next meeting in the business centers conference room, adjacent to our internet and coffee lounge.

          Conveniently located near beautiful local beaches with easy access to the 110, 405 and 91 freeways, exclusive shopping at the largest mall in the Western United States “The Del Amo Fashion Center” to the hospital of your choice—Kaiser Hospital, UCLA Harbor Medical Center, Torrance Memorial Medical Center, and Providence Little Company of Mary Hospital.

          Contact us today to embrace the Seacrest luxury lifestyle as your own. Seacrest Homes Apartments is an apartment community located in Los Angeles County and the 90501 ZIP Code. This area is served by the Los Angeles Unified attendance zone.
        </p>
      </div>
    </div>
  )
}

export default PropertyOverview
