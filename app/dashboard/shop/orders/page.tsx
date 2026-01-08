'use client'
import { useState, useEffect} from "react";
import axios from 'axios';
import toast, {Toaster }   from 'react-hot-toast';
import {  UsersRound,Pencil, Trash } from "lucide-react";

interface Props {
  
}

const addUser: React.FC<Props> = ({  }) => {

  const [order, setOrder] = useState<any>()

  useEffect(()=>{console.log("order now ", order)}, [order])

  useEffect(()=>{
    try {
      async function fetchOrder(){
        const res = await axios.get('/api/worker/order/fetch')
        console.log(res.data.data)
        setOrder(res.data.data);
      }
      fetchOrder();
    } catch (error: unknown) {
      if(error instanceof Error){
        toast.error(error.message)
      }
      toast.error('unable to fetch ')
    }
  }, [])

  return (
    <>
 <div className="user-container mt-4">
  <Toaster></Toaster>
    <div className="title-container text-xl flex gap-2 items-center 
      border border-white/10 
      bg-gradient-to-r from-black/60 to-black/30
      backdrop-blur-md
      rounded-xl px-4 py-3 mb-3
      text-white shadow-lg">
      <UsersRound />
      <h1>All Products</h1>
    </div>

      {/* products table  */}

        <div className="
      relative overflow-x-auto
      bg-black/40 backdrop-blur-lg
      border border-white/10
      rounded-2xl
      shadow-[0_0_40px_rgba(0,0,0,0.6)]
    ">
      <table className="w-full text-sm text-left text-gray-200">
        <thead className="
          text-sm text-gray-300
          bg-black/60 backdrop-blur
          border-b border-white/10
        ">
          <tr>
            <th className="px-6 py-3 font-medium">Name</th>
            <th className="px-6 py-3 font-medium">worker</th>
            <th className="px-6 py-3 font-medium">prices</th>
            <th className="px-6 py-3 font-medium">status</th>
            <th className="px-6 py-3 font-medium">Operations</th>
          </tr>
        </thead>

        <tbody>
          {order ? (
            order.map((value, index) => (
              <tr
                key={index}
                className="
                  bg-transparent
                  border-b border-white/5
                  hover:bg-white/5
                  transition-colors duration-150
                "
              >
                <th className="px-6 py-4 font-medium text-white whitespace-nowrap">
                  {value.product.name}
                </th>
                <td className="px-6 py-4">{value.worker.fullName}</td>
                <td className="px-6 py-4">CP: {value.product.cp}, SP: {value.product.sp} </td>
                  <td
                    className={`px-6 py-4 font-semibold ${
                      value.status === "success"
                        ? "text-blue-400"
                        : value.status === "dues"
                        ? "text-red-400"
                        : ""
                    }`}
                  >
                    {value.status}
                  </td>

                <td className="px-6 py-4 flex items-center gap-3 text-sm">
                  <Pencil className="text-blue-300 hover:text-blue-400 transition cursor-pointer" />
                  <Trash className="text-red-400 hover:text-red-500 transition cursor-pointer" />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="px-6 py-6 text-center text-gray-400">
                Loading...
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>


  </div>
    </>
  );
};

export default addUser;