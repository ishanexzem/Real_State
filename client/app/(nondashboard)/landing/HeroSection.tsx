"use client"

import Image from 'next/image'
import React, { useState } from 'react'
import M1 from "@/public/landing-splash.jpg"
import MotionWrapper from '@/components/MotionWrapper'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'
import { setFilters } from '@/state'

const HeroSection = () => {
  const dispatch = useDispatch();
  const[searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleLocationSearch = async () =>{
    try{
      const trimmedQuery = searchQuery.trim();
      if(!trimmedQuery) return; 
    const response = await fetch(
      `https://api/mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        trimmedQuery
      )}.json?access_token=${
        process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
      }&fuzzyMatch=true`
    );
    const data  = await response.json();
    if(data.fetaures && data.features.length > 0){
      const[lng, lat] = data.features[0].center;
      dispatch(
        setFilters({
          location: trimmedQuery,
          coordinates: [ lat, lng]
        })
      );
      const params = new URLSearchParams({
        location: trimmedQuery,
        lat: lat.toString(),
        lng:lng
      });
      router.push(`/search?${params.toString()}`)
    }   
  }
   catch(error){
    console.error("Error searching location", error);
      
    }
  }
  return (
    <div className='Relative h-screen'>
        <Image src={M1} alt="Herosection of rentful" 
        fill 
        className="object-cover object-center"
        priority
        />
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <MotionWrapper>
        <div className="max-w-4xl mx-auto px-16 sm:px-12">
            <h1 className="text-5xl font-bold text-white mb-4">
                <span className="bg-gradient-to-l from-pink-500 to bg-red-500 text-transparent bg-clip-text">Start</span> your journey to finding the perfect place to call home
            </h1>
            <p className="text-xl text-white mb-8 ">
                Explore our wide range of tailored property to fit your lifestyle and needs
            </p>
            <div className="flex justify-center">
                <Input
                type="text"
                value={searchQuery}
                onChange={(e) =>setSearchQuery(e.target.value)}
                placeholder="search by city or address"
                className="w-full max-w-lg rounded-none rounded-l-xl border-none bg-white h-12"
                />
                     <Button
                    onClick={handleLocationSearch}
                    className="bg-red-500 font-bold text-white rounded-none rounded-r-xl border-none hover:bg-red-600 h-12"
                    >
                   Search
                    </Button>
                
            </div>
        </div>
      </MotionWrapper>
    </div>
  )
}

export default HeroSection
