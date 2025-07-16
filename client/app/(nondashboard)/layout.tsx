"use client"
import { NAVBAR_HEIGHT } from '@/lib/constants'
import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import Navbar from '@/components/Navbar'
import { useGetAuthUserQuery } from '@/state/api'

const layout = ({children} : {children: React.ReactNode}) => {
 const { data: authUser, isLoading: authLoading } = useGetAuthUserQuery();
 const router = useRouter();
  const pathname = usePathname();
  const [ isLoading , setIsLoading ] = useState(true);

  useEffect(() => {
    if(authUser){
        const userRole = authUser.userRole?.toLowerCase();
        if(
            (userRole === "manager" && pathname.startsWith("/search")) ||
            (userRole === "manager" && pathname === "/"
          )
    
      ) 
    {
        router.push(
          "/managers/properties",
          {scroll: false}
        );
    }
    else{
        setIsLoading(false);
    }
}
  },[authUser, router , pathname]);
  if(authLoading || isLoading) return <>
  Loading.........
  </>

 
  return (
    <div className="w-full h-full">
      <Navbar />
      <main className={`h-full flex w-full flex-col`}
      style={{ paddingTop:`[${NAVBAR_HEIGHT}px]`}}>
    {children}
    </main>
    </div>
  )
}

export default layout
