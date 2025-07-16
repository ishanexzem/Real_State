import { Button } from '@/components/ui/button';
import { useGetAuthUserQuery } from '@/state/api'
import { Phone } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react'

const ContactWidget = ({onOpenModal}: ContactWidgetProps ) => {
    const { data: authUser} = useGetAuthUserQuery();
    const router = useRouter();

    const handleButtonClick = () =>{
        if(authUser){
            onOpenModal();
        }
        else{
            router.push('/signin')
        }
    }

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-7 h-fit min-w-[300px]">
        <div className="flex items-center gap-5 mb-4 border border-slate-200 rounded-xl">
            <div className="flex items-center p-4 bg-slate-900 rounded-full">
                <Phone className="text-slate-50" size={15}/>

            </div>
            <div>
            <p>Contact This Property</p>
            <div className="text-lg font-bold text-slate-800">
                {424 } 340-5574
            </div>

            </div>
            </div> 
        <Button className="w-full bg-slate-700 text-white hover:bg-slate-600"
        onClick={handleButtonClick}>
            {authUser ? "Submit Application": " Sign In to Apply"}
        </Button>
        <hr className="my-4"/>
        <div className="text-sm">
            <div className="text-slate-600 mb-1">
                Language: English, Bahasa.
            </div>
            <div className="text-slate-600">
                Open by appointment on Monday - Sunday
            </div>

        </div>

      
    </div>
  );
}

export default ContactWidget
