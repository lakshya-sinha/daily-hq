'use client';
import { redirect } from "next/navigation"
import { useEffect } from "react";
import axios from 'axios'

const Page = () => {

  useEffect( () => {
    let isOwner;
    async function getDels(){
      const response = await axios.get('/api/me');
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
    <main className="w-screen h-screen bg-black flex-col flex items-center justify-center text-4xl text-white text-center">
       <div>redirecting.....</div>
       <br />
       <div>To <span className="text-blue-200">Dashboard</span></div>
    </main>
  )
}

export default Page;