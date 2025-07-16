"use client";

import Header from '@/components/Header';
import Loading from '@/components/Loading';
import { useGetAuthUserQuery, useGetPropertiesQuery, useGetTenantQuery } from '@/state/api';
import React from 'react';
import Card from '@/components/search/Card';

const favorites = () => {
  const { data: authUser } = useGetAuthUserQuery();

  const { data: tenant } = useGetTenantQuery(
    authUser?.cognitoInfo?.userId || "",
    {
      skip: !authUser?.cognitoInfo?.userId
    }
  );

  const {
    data: favoriteProperties,
    isLoading,
    error
  } = useGetPropertiesQuery(
    {
      favoriteIds: tenant?.favorites?.map((fav: { id: number }) => fav.id)
    },
    {
      skip: !tenant?.favorites || tenant?.favorites.length === 0
    }
  );

  if (isLoading) return <Loading />;
  if (error) return <div className="text-center text-red-500 mt-6">Error loading favorites.</div>;

  return (
    <div className="px-6 md:px-10 py-10">
      <Header
        title="Favorite Properties"
        subtitle="Browse and manage your saved property listings."
      />
      
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {favoriteProperties?.map((property) => (
          <Card
            key={property.id}
            property={property}
            isFavorite={true}
            onFavoriteToggle={() => {}}
            showFavoriteButton={false}
            propertyLink={`/tenants/residences/${property.id}`}
          
          />
        ))}
      </div>

      {(!favoriteProperties || favoriteProperties?.length === 0) && (
        <p className=" text-gray-500 ">
          You don&apos;t have any favorited properties
        </p>
      )}
    </div>
  );
};

export default favorites;
