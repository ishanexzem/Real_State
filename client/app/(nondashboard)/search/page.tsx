"use client"

import React, { useEffect } from 'react'
import { useSearchParams } from 'next/navigation';
import { NAVBAR_HEIGHT } from '@/lib/constants';
import FiltersFull from '@/components/search/FiltersFull';
import Map from "@/components/search/Map"
import { setFilters } from '@/state';
import { cleanParams } from '@/lib/utils';
import Listings from '@/components/search/Listings';

import { useAppDispatch, useAppSelector } from '@/state/redux';
import FiltersBar from '@/components/search/FiltersBar';
const searchPage = () => {
    const searchParams = useSearchParams();
      const dispatch = useAppDispatch();
      const isFiltersFullOpen = useAppSelector(
        (state) => state.global.isFiltersFullOpen
      );

    useEffect(() => {
      const initialFilters = Array.from(searchParams.entries()).reduce((
        acc:any, [key, value]) => {
          if(key === "priceRange" || key === "squareFeet"){
            acc[key] = value.split(",").map((v) => (v === "" ? null: Number(v)));
          }
          else if(key === "coordinates"){
            acc[key] = value.split(",").map(Number);
          } 
          else{
            acc[key] = value === "any" ? null : value
          }
          return acc;
        },
        {}
      );
      const cleanFilters = cleanParams(initialFilters);
      dispatch(setFilters(cleanFilters))
    },[])

  return (
    <div className="w-full mx-auto px-5 flex flex-col" style={{
        height: `calc(100vh- ${NAVBAR_HEIGHT}px)`,
        marginTop: `${NAVBAR_HEIGHT}px`,
    }}>
       <FiltersBar/>
        <div className="flex justify-between flex-1 overflow-hidden gap-3 mb-5">
            <div className={`h-full overflow-auto transition-all duration-300 ease-in-out ${isFiltersFullOpen
                ? "w-3/12 opacity-100 visible"
                :
                "w-0 opacity-0 invisible"
            }`}>
              <FiltersFull />
            </div>
             <Map/>
             <div className="basis-4/12 overflow-y-auto">
             <Listings/> 

             </div>
        </div>

      
    </div>
  )
}

export default searchPage
