'use client';
import { redirect } from "next/navigation"
import { useEffect } from "react";
import axios from 'axios'
import Image from "next/image";

const Page = () => {

  useEffect( () => {
    let isOwner;
    async function getDels(){
      const response = await axios.get('/api/auth/me');
      const data = response.data.data;
      console.log(response.data.data)
      isOwner = data.isOwner;
        if(isOwner){
          redirect('/dashboard/shop')
        }else {
          redirect('/dashboard/worker')
        }
    }

    getDels();


  }, []);

  return (
    <main className=" gap-4 w-screen h-screen bg-black flex-col flex items-center justify-center text-4xl text-white text-center">
       <Image  src={'/images/landing/logo.png'} height={100} width={100} alt="" className="animate-pulse"/> 
      <div>Redirect -{'>'} <span className="text-blue-200">dashboard</span></div>
    </main>
  )
}

export default Page;