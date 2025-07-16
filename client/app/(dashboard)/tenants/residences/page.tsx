"use client";

import Header from '@/components/Header';
import Loading from '@/components/Loading';
import { useGetAuthUserQuery, useGetCurrentResidencesQuery, useGetTenantQuery } from '@/state/api';
import React from 'react';
import Card from '@/components/search/Card';

const Residences = () => {
  const { data: authUser } = useGetAuthUserQuery();

  const { data: tenant } = useGetTenantQuery(
    authUser?.cognitoInfo?.userId || "",
    {
      skip: !authUser?.cognitoInfo?.userId
    }
  );

  const {
    data: currentResidences,
    isLoading,
    error
  } = useGetCurrentResidencesQuery(
    authUser?.cognitoInfo?.userId || "",
    {
      skip:  !authUser?.cognitoInfo?.userId
    }
  );

  if (isLoading) return <Loading />;
  if (error) return <div className="text-center text-red-500 mt-6">Error loading Current  Residences.</div>;

  return (
    <div className="px-6 md:px-10 py-10">
      <Header
        title="Current Residences"
        subtitle="View and manage your current living spaces."
      />
      
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {currentResidences?.map((property) => (
          <Card
            key={property.id}
            property={property}
            isFavorite={tenant?.favorites.includes(property.id) || false}
            onFavoriteToggle={() => {}}
            showFavoriteButton={false}
            propertyLink={`/tenants/residences/${property.id}`}
          />
        ))}
      </div>

      {(!currentResidences || currentResidences?.length === 0) && (
        <p className=" text-gray-500 ">
          You don&lsquo;t have any Current Residences.
        </p>
      )}
    </div>
  );
};

export default Residences;
