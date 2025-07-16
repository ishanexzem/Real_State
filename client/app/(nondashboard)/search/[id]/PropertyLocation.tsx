"use client"

import React, { useEffect } from 'react'
import mapboxgl, { Map } from 'mapbox-gl'
import { useRef } from 'react'
import { useGetPropertyQuery } from '@/state/api'
import { Compass, MapPin } from 'lucide-react'



interface PropertyLocationProps {
  propertyId: number
}

const PropertyLocation = ({ propertyId }: PropertyLocationProps) => {
  const {
    data: property,
    isError,
    isLoading
  } = useGetPropertyQuery(propertyId);
  const mapContainerRef = useRef(null);
  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN as string;

 
      useEffect(() => {
      if (isLoading || isError || !propertyId) return;
    
      const map = new mapboxgl.Map({
        container: mapContainerRef.current!,
        style: "mapbox://styles/isharawat/cmcx5jczq002601sd26m9aox0",
        center: [
            property.location.coordinates.longitude,
            property.location.coordinates.latitude,

        ],
        zoom: 14,
      });
     const marker = new mapboxgl.Marker()
  .setLngLat([
    property.location.coordinates.longitude,
    property.location.coordinates.latitude,
  ]).addTo(map);

  const markerElement = marker.getElement();
  const path = markerElement.querySelector("path[fill='#3FB1CE]");
  if(path) path.setAttribute("fill", "#0000000");

      return () => map.remove();
    }, [property,isError, isLoading]);

     if (isLoading) return <>Loading...</>
  if (isError || !property) return <div>Property not found!</div>

    
  return (
    
   
    <div className="mb-6 py-16">
        <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
            Map and Location
        </h3>
   <div className="flex justify-between items-cneter text-sm text-slate-500 mt-2">
    <div className="flex items-center text-gray-500">
        <MapPin className="w-4 h-4 mr-1 text-gray-700"/>
        Property Address:
        <span className="ml-2 font-semibold text-gray-700">
            {property.location?.address || " Address not available"}
        </span>
    </div>
    <a href ={`https://maps.google.com/?q=${encodeURIComponent(
        property.location?.address || ""
    )}`}
    target="_blank"
    rel="noopener noreferrer"
    className="flex justify-between items-center hover:underline gap-2 text-slate-800"
       
    >
        <Compass className="w-5 h-5"/> 
        Get Directions

    </a>

   </div>
   <div className="relative mt-4 h-[300px] rounded-lg overflow-hidden" ref={mapContainerRef}>

   </div>
    </div>
  )
}

export default PropertyLocation

