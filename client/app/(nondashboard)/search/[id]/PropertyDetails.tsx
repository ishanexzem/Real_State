"use client"

import React from 'react'
import { useGetPropertyQuery } from '@/state/api'
import { AmenityIcons, HighlightIcons } from '@/lib/constants'
import { HelpCircle } from 'lucide-react'
import { formatEnumString } from '@/lib/utils'

import { Tabs,TabsContent,TabsList, TabsTrigger } from '@/components/ui/tabs'


interface PropertyDetailsProps {
  propertyId: number
}

const PropertyDetails = ({ propertyId }: PropertyDetailsProps) => {
  const {
    data: property,
    isError,
    isLoading
  } = useGetPropertyQuery(propertyId)

  if (isLoading) return <>Loading...</>
  if (isError || !property) return <div>Property not found!</div>

  return (
    <div className="mb-6">
        {/*Amentites*/}
        <div className="text-xl  font-semibold my-3">
            Property Amenities
            <div className="grid mt-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {property.amenities.map((amenity: AmenityEnum) => {
                    const Icon = AmenityIcons[amenity as AmenityEnum] || HelpCircle
                    return (
                        <div
                        key={amenity}
                        className="flex flex-col items-center border rounded-xl py-8 px-4"
                        >
                            <Icon className="w-8 h-8 mb-2 text-gray-700" />
                            <span className="text-sm text-center text-gray-700">
                                {formatEnumString(amenity)}

                            </span>

                        </div>
                    );
                })}
            </div>

        </div>

        {/*Highlights*/}
        <div className="mt-12 mb-16">
       <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
        Highlights
       </h3>
       <div className="grid mt-4  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
    {(property?.highlights ?? []).map((highlight: HighlightEnum) => {
      const Icon = HighlightIcons[highlight as HighlightEnum] || HelpCircle;

      return (
        <div
          key={highlight}
          className="flex flex-col items-center border rounded-xl py-8 px-4"
        >
          <Icon className="w-8 h-8 mb-2 text-slate-600 dark:text-slate-300" />
          <span className="text-sm text-center text-slate-600 dark:text-slate-100">
            {formatEnumString(highlight)}
          </span>
        </div>
      );
    })}
  </div>
</div>


{/* Tabs section */}
<div>
    <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-5">
        Fees and Policies
    </h3>
<p className="text-sm text-slate-600 dark:text-slate-300 mt-2">
   The fee below are based on community-supplied fate and may exclude additional fees and utilities.

</p>
<Tabs defaultValue="required-fees" className="mt-8">
 <TabsList className="grid w-full grid-cols-3">
    <TabsTrigger value="required-fees">Required Fees</TabsTrigger>
    <TabsTrigger value="pets">Pets</TabsTrigger>
    <TabsTrigger value="parking">Parking</TabsTrigger>
 </TabsList>
 <TabsContent value="required-fees" className="w-1/3">
 <p className="font-semibold mt-5 mb-2">One time move in fees</p>
 <hr/>
 <div className="flex justify-between py-2 bg-slate-50">
    <span className="text-slate-700 font-medium">
        Application Fee
    </span>
    <span className="text-slate-700">
        ${property.applicationFee}
    </span>
 </div>
 <hr/>
 <div className="flex justify-between py-2 bg-slate-50">
    <span className="text-slate-700 font-medium">
        Security Deposit
    </span>
    <span className="text-slate-700">
        ${property.securityDeposit}
    </span>
 </div>
 <hr/>
 </TabsContent>
 <TabsContent value="pets" >
 <p className="font-semibold mt-5 mb-2"> Pets are {property.isPetsAllowed ? "allowed" : "not allowed"}</p>
 </TabsContent>
    
 <TabsContent value="parking" >
 <p className="font-semibold mt-5 mb-2"> Parking is {" "}
    {property.isParkingIncluded ? "included": "not included"}
 </p>
 </TabsContent>
    
</Tabs>

</div>
      
    </div>
  )
}

export default PropertyDetails


