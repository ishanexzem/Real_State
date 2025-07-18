"use client"
import Navbar from '@/components/Navbar'
import React, { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { NAVBAR_HEIGHT } from '@/lib/constants'
import {SidebarProvider } from '@/components/ui/sidebar'
import  Sidebar  from "@/components/AppSidebar"
import { useGetAuthUserQuery } from '@/state/api'


const layout = ({children} : { children : React.ReactNode}) => {
  const { data: authUser, isLoading: authLoading} = useGetAuthUserQuery();
  const router = useRouter();
  const pathname = usePathname();
  const [ isLoading , setIsLoading ] = useState(true);

  useEffect(() => {
    if(authUser){
        const userRole = authUser.userRole?.toLowerCase();
        if(
            (userRole === "manager" && pathname.startsWith("/tenants")) ||
            (userRole === "tenant" && pathname.startsWith("/managers"))
    
      ) 
    {
        router.push(
            userRole === "manager" 
            ? "/manager/properties" 
            : 
            "/tenants/favorites", {
                scroll:false
            }
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


  if(!authUser?.userRole) return null;
  
    return (
    <SidebarProvider>
    <div className="min-h-screen w-full bg-slate-100">
        <Navbar/>
        <div style={{ paddingTop : `${ NAVBAR_HEIGHT}px`}}>
         <main className="flex ">
            <Sidebar userType={authUser.userRole.toLowerCase()}/>
              <div className="flex-grow transition-all duration-300">
             { children }
              </div>

         </main>
        </div>
    </div>
    </SidebarProvider>
  )
}

export default layout
