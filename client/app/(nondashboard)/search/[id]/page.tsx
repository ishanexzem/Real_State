"use client"
import React, { useState } from 'react'
import { useParams } from 'next/navigation';
import { useGetAuthUserQuery } from '@/state/api';
import IMG1 from "@/public/singlelisting-2.jpg"
import IMG2 from "@/public/singlelisting-3.jpg"
import ImagePreview from './ImagePreview';
import PropertyOverview from "./PropertyOverview"
import PropertyDetails from "./PropertyDetails"
import PropertyLocation from "./PropertyLocation"
import ContactWidget from './ContactWidget';
import ApplicationModal from './ApplicationModal';


const SingleListing = () => {
    const {id} = useParams();
    const propertyId = Number(id);
    if (!id || isNaN(propertyId)) {
  return <div>Invalid Property ID</div>; 
}
    const { data: authUser} = useGetAuthUserQuery();
    const [isModalOpen,setIsModalOpen] = useState(false);
  return (
    <div>
      <ImagePreview
      images={[IMG1,IMG2]}
      />
      <div className="flex flex-col md:flex-row justify-center gap-10 mx-10 md:w-2/3 md:mx-auto mt-16 mb-8 ">
      <div className="order-2 md:order-1">
        <PropertyOverview propertyId= {propertyId}/>
        <PropertyDetails propertyId={propertyId}/>
        <PropertyLocation propertyId={propertyId}/>
      </div>

      <div className="order-1 md:order-2 ">
        <ContactWidget onOpenModal={() => setIsModalOpen(true)}/>
              </div>
      </div>
     
      {authUser && (
        <ApplicationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          propertyId={propertyId}
        />
      )}
    </div>
  )
}

export default SingleListing
