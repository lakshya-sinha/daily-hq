
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import toast from 'react-hot-toast';

export default function LogoutContainer({open, onClose}: any) {
  const router = useRouter();

    const [isOpen, SetIsOpen ] = useState(open);

    useEffect(()=> {
      console.log("isopen: ", isOpen);
    }, [isOpen])

    const LogOutUser = async () => {
        try {
            const logoutData = await axios.get('/api/auth/logout'); 
            toast.success('logout successfull');
            router.push('/login');
        } catch (error) {
            console.log(error);        
        }
    }


  return (

    <>
        <div className="logout-container fixed top-10 left-1/2 bg-gray-900 w-100 h-50 -translate-x-1/2 text-center p-2 rounded-2xl border border-gray-600 shadow-2xl flex flex-col items-center justify-center "     style={{
        transform: open ? "scale(1)" : "scale(0)",
        transition: "transform 0.3s ease",
        pointerEvents: open ? "auto" : "none"
      }}>
            <h1 className="text-xl">Are you sure you wan't to Logout ? </h1>
            <div className="logout-button-container flex gap-2 items-center justify-center mt-2 p-4">
              <button onClick={() => {LogOutUser()}} className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5 rounded-lg transition-all cursor-pointer border border-gray-400">Yes</button>
              <button className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-green-800 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5 rounded-lg transition-all cursor-pointer border border-gray-400" onClick={()=> {onClose(false)}}>No</button>
            </div>
            </div>        
    </>
  );
}