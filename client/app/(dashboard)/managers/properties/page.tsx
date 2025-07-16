"use client";

import Header from '@/components/Header';
import Loading from '@/components/Loading';
import { useGetAuthUserQuery, useGetManagerPropertiesQuery } from '@/state/api';
import React from 'react';
import Card from '@/components/search/Card';

const Properties = () => {
  const { data: authUser } = useGetAuthUserQuery();

 const { data: managerProperties,
    isLoading,
    error
 } = useGetManagerPropertiesQuery(authUser?.cognitoInfo?.userId || "",
 {skip : !authUser?.cognitoInfo?.userId}
 );

  if (isLoading) return <Loading />;
  if (error) return <div className="text-center text-red-500 mt-6">Error loading Manager Properties.</div>;

  return (
    <div className="px-6 md:px-10 py-10">
      <Header
        title="My Properties"
        subtitle="View and Manage your property Listings."
      />
      
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {managerProperties?.map((property) => (
          <Card
            key={property.id}
            property={property}
            isFavorite={false}
            onFavoriteToggle={() => {}}
            showFavoriteButton={false}
            propertyLink={`/managers/properties/${property.id}`}
          
          />
        ))}
      </div>

      {(!managerProperties || managerProperties?.length === 0) && (
        <p className=" text-gray-500 ">
          You don&apos;t manage any Properties.
        </p>
      )}
    </div>
  );
};

export default Properties;
