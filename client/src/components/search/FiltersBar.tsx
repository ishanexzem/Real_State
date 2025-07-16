"use client";

import React, { useState } from "react";
import { debounce } from "lodash";
import { useRouter, usePathname } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/state/redux";
import { List,Grid } from "lucide-react";
import { setViewMode } from "@/state";
import { formatPriceValue } from "@/lib/utils";
import { setFilters, toggleFiltersFullOpen } from "@/state";
import type { FiltersState } from "@/state";
import {Button} from "@/components/ui/button"
import { cn } from "@/lib/utils";
import {Search} from "lucide-react"
import {Filter} from "lucide-react"
import { PropertyTypeIcons } from "@/lib/constants";

import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
    

const cleanParams = (filters: FiltersState) => {
  const cleaned: Record<string, any> = {};
  Object.entries(filters).forEach(([key, value]) => {
    if (
      (Array.isArray(value) && value.some((v) => v !== null && v !== "any")) ||
      (!Array.isArray(value) && value !== "any" && value !== null)
    ) {
      cleaned[key] = value;
    }
  });
  return cleaned;
};
const FiltersBar = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const filters = useAppSelector((state) => state.global.filters);
  const isFiltersFullOpen = useAppSelector((state) => state.global.isFiltersFullOpen);
  const viewMode = useAppSelector((state) => state.global.viewMode);

  const [searchInput, setSearchInput] = useState(filters.location);

  const updateURL = debounce((newFilters: FiltersState) => {
    const cleanFilters = cleanParams(newFilters);
    const updatedSearchParams = new URLSearchParams();

    Object.entries(cleanFilters).forEach(([key, value]) => {
      updatedSearchParams.set(
        key,
        Array.isArray(value) ? value.join(",") : value.toString()
      );
    });

    router.push(`${pathname}?${updatedSearchParams.toString()}`);
  }, 300); // optional debounce delay

  const handleFilterChange = (
    key: string,
    value: any,
    isMin: boolean | null = null
  ) => {
    let newValue: any = value;

    if (key === "priceRange" || key === "squareFeet") {
      const currentArrayRange = [...filters[key]];
      if (isMin !== null) {
        const index = isMin ? 0 : 1;
        currentArrayRange[index] = value === "any" ? null : Number(value);
      }
      newValue = currentArrayRange;
    } else if (key === "coordinates") {
      newValue = value === "any" ? [0, 0] : value.map(Number);
    } else {
      newValue = value === "any" ? "any" : value;
    }

    const newFilters = { ...filters, [key]: newValue };
    dispatch(setFilters(newFilters));
    updateURL(newFilters);
  };

  const handleLocationSearch = async () =>{
    try{
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
         searchInput
        )}.json.access_token=${
          process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
        }&fuzzyMatch=true`
      )
      const data= await response.json();
      if(data.features && data.features.length > 0){
        const [lng,lat] = data.features[0].center;
      dispatch(
  setFilters({
    location: searchInput,
    coordinates: [lng, lat]
  })
)
      }
    }
    catch(error){
    console.error("Error searching location",error)
    }
  } 

  return (
    <div className="flex justify-between itesm-center w-full py-5">
     <div className="flex justify-between items-center gap-4 p-2">
        <Button
        variant="outline"
        className={cn(
            "gap-2 rounded-xl border-slate-400 hover:bg-slate-500 hover:text-white",
            isFiltersFullOpen  && "bg-black text-white"
        )}
        onClick ={() => dispatch(toggleFiltersFullOpen())}
        >
        <Filter className="w-4 h-4"/>
        <span>All</span>
        </Button>

        <div className="flex items-center">
            <Input placeholder="search location"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-40 rounded-xl rounded-r-none border-slate-400 border-r-0"
            />
         <Button
         onClick={handleLocationSearch}  
         className="rounded-r-xl rounded-l-none border-l-none border-slate-400 shadow-none  border hover:bg-black hover:text-slate-50"
         >
          <Search className="w-4 h-4"/>
         </Button>
        </div>
        {/* price range */}

 <div className="flex gap-1 ">
  <Select
  value={filters.priceRange[0]?.toString() || "any"}
  onValueChange = {(value) => 
    handleFilterChange("priceRange", value,true)
  }
  >
    <SelectTrigger className="w-44 rounded-xl border-slate-400">
      <SelectValue>
        {formatPriceValue(filters.priceRange[0], true)}
      </SelectValue>
    </SelectTrigger>
    <SelectContent className="bg-white">
      <SelectItem value="any">Any Min Price
      </SelectItem>
      {[500, 1000, 1500, 2000, 3000, 5000, 10000].map((price) => (
  <SelectItem key={price} value={price.toString()}>
    ${price / 1000}k+
  </SelectItem>
))}

    </SelectContent>

  </Select>


  <Select
  value={filters.priceRange[1]?.toString() || "any"}
  onValueChange = {(value) => 
    handleFilterChange("priceRange", value,true)
  }
  >
    <SelectTrigger className="w-44 rounded-xl border-slate-400">
      <SelectValue>
       {formatPriceValue(filters.priceRange[1], true) }
      </SelectValue>
    </SelectTrigger>
    <SelectContent className="bg-white">
      <SelectItem value="any">Any Max Price
      </SelectItem>
      {[500, 1000, 1500, 2000, 3000, 5000, 10000].map((price) => (
  <SelectItem key={price} value={price.toString()}>
    ${price / 1000}k+
  </SelectItem>
))}

    </SelectContent>

  </Select>
 </div>


 {/* Beds and Baths  */}
 <div className="flex gap-1 ">
  <Select
  value={filters.beds}
  onValueChange = {(value) => 
    handleFilterChange("beds", value,null)
  }
  >
    <SelectTrigger className="w-44 rounded-xl border-slate-400">
      <SelectValue placeholder="Beds"/>
    </SelectTrigger>
    <SelectContent className="bg-white">
      <SelectItem value="any">Any Beds
      </SelectItem>
      <SelectItem value="1">1+ bed
      </SelectItem>
      <SelectItem value="2">2+ beds
      </SelectItem>
      <SelectItem value="3">3+ beds
      </SelectItem>
      <SelectItem value="4">4+ beds
      </SelectItem>
    </SelectContent>

  </Select>

  <Select
  value={filters.baths}
  onValueChange = {(value) => 
    handleFilterChange("baths", value,null)
  }
  >
    <SelectTrigger className="w-44 rounded-xl border-slate-400">
      <SelectValue placeholder="Baths"/>
    </SelectTrigger>
    <SelectContent className="bg-white">
      <SelectItem value="any">Any Baths
      </SelectItem>
      <SelectItem value="1">1+ baths
      </SelectItem>
      <SelectItem value="2">2+ baths
      </SelectItem>
      <SelectItem value="3">3+ baths
      </SelectItem>
    </SelectContent>

  </Select>
 </div>

<Select
  value={filters.propertyType || "any"}
  onValueChange = {(value) => 
    handleFilterChange("propertyType", value,null)
  }
  >
    <SelectTrigger className="w-44 rounded-xl border-slate-400">
      <SelectValue placeholder="Home Type"/>
    </SelectTrigger>
    <SelectContent className="bg-white">
      <SelectItem value="any">Any Property Type
      </SelectItem>
     {Object.entries(PropertyTypeIcons).map(([type,Icon]) => (
      <SelectItem key ={type} value={type}>
        <div className="flex items-center">
          <Icon className="w-4 h-4 mr-2"/>
          <span>{type}</span> 
        </div>
      </SelectItem>
     ))}
    </SelectContent>

  </Select>
     </div>
     <div className="flex justify-between items-center gap-4 p-2">
     <div className="flex border rounded-xl overflow-hidden">
  <Button
    variant="ghost"
    className={cn(
      "px-3 py-1 rounded-none hover:bg-slate-600 hover:text-slate-50",
      viewMode === "list" && "bg-black text-slate-50"
    )}
    onClick={() => dispatch(setViewMode("list"))}
  >
    <List className="w-5 h-5" />
  </Button>
  <Button
    variant="ghost"
    className={cn(
      "px-3 py-1 rounded-none hover:bg-slate-600 hover:text-slate-50",
      viewMode === "grid" && "bg-black text-slate-50"
    )}
    onClick={() => dispatch(setViewMode("grid"))}
  >
    <Grid className="w-5 h-5" />
  </Button>
</div>



     </div>

    </div>
  );
};

export default FiltersBar;
