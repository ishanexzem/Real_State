"use client"
import Navbar from "@/components/Navbar";
import { NAVBAR_HEIGHT } from "@/lib/constants";
import Landing from "./(nondashboard)/landing/page"
export default function Home() {
  return (
    <>
    <div className="w-full h-full">
          <Navbar />
          <main className={`h-full flex w-full flex-col`}
          style={{ paddingTop:`[${NAVBAR_HEIGHT}px]`}}>
        <Landing />
        </main>
        </div>
    </>
  );
}
