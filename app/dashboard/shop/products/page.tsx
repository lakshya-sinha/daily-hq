'use client'
import { UserRoundPlus, UsersRound, Trash, Pencil } from "lucide-react";
import { useState, useEffect} from "react";
import axios from 'axios';
import toast, {Toaster }   from 'react-hot-toast';
import { useUser } from '@/context/UserContext'



interface Product {
  name: string;
  cp: string;
  sp: string;
  mv: string;
}

interface Props {
  
} 

const page: React.FC<Props> = ({  }) => {


  

  const [product, setProduct] = useState<Product>({
    name: "",
    cp: "",
    sp: "",
    mv: "", 
  });

  const [products, setProducts]  = useState<Product[]>([])




  useEffect(()=>{
    async function fetchProducts(){
      const res = await axios.get('/api/admin/product/fetch');
      setProducts(res.data.data);
    }
    fetchProducts();
  }, [product.mv])

  useEffect(()=> { console.log(products)}, [products])

  const addProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault(); 
      const res = await axios.post('/api/admin/product/add', product);
      setProducts(prev => ([...prev, product]));
      toast.dismissAll();
      toast.success(res.data.message);
    } catch (error: unknown) {
      if(error instanceof Error){
        toast.error(error.message); 
      }
      toast.error("unable to add product ");
    }
  }

  return (


      <div className="add-user-container mt-4 p-2">

  <Toaster /> 

  {/* ================= Add New Worker ================= */}
  <div className="title-container text-xl flex gap-2 items-center 
    border border-white/10 
    bg-gradient-to-r from-black/60 to-black/30
    backdrop-blur-md
    rounded-xl px-4 py-3 mb-3
    text-white shadow-lg">
    <UserRoundPlus />
    <h1>Add New Product</h1>
  </div>

  <div className="
    new-user-container
    border border-white/10 
    bg-black/40 backdrop-blur-lg
    rounded-2xl p-4
    shadow-[0_0_40px_rgba(0,0,0,0.6)]
  ">
    <form
      onSubmit={(e) => { addProduct(e) }}
      className="flex flex-col gap-3 text-white"
    >

      {/* Inputs */}
      {[
        { name: "name", placeholder: "Name", value: product.name },
        { name: "cp", placeholder: "Cost Price", value: product.cp},
        { name: "sp", placeholder: "Sell Price", value: product.sp},
        { name: "mv", placeholder: "Market Value", value: product.mv},
      ].map((field, i) => (
        <input
          key={i}
          type="text"
          name={field.name}
          placeholder={field.placeholder}
          value={field.value}
          onChange={(e) =>
            setProduct((prev) => ({ ...prev, [field.name]: e.target.value }))
          }
          className="
            bg-neutral-900/80
            border border-white/10
            focus:border-primary-blue
            focus:ring-2 focus:ring-primary-blue/40
            px-4 py-3 rounded-xl
            placeholder:text-gray-400
            text-white
            transition-all duration-200
            shadow-inner outline-none
          "
        />
      ))}

      {/* Button */}
      <button
        type="submit"
        className="
          px-4 py-3 w-full rounded-2xl
          bg-gradient-to-r from-primary-blue to-blue-500
          hover:brightness-110 active:scale-[0.98]
          transition-all duration-200
          text-white font-medium
        "
      >
        Create Account
      </button>
    </form>
  </div>

  {/* ================= All Workers ================= */}
  <div className="user-container mt-4">
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
            <th className="px-6 py-3 font-medium">Product name</th>
            <th className="px-6 py-3 font-medium">Cost Price</th>
            <th className="px-6 py-3 font-medium">Sell Price</th>
            <th className="px-6 py-3 font-medium">Market Value</th>
            <th className="px-6 py-3 font-medium">Operations</th>
          </tr>
        </thead>

        <tbody>
          {products ? (
            products.map((value, index) => (
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
                  {value.name}
                </th>
                <td className="px-6 py-4">{value.cp}</td>
                <td className="px-6 py-4">{value.sp}</td>
                <td className="px-6 py-4">{value.mv}</td>
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

</div>

  );
};

export default page;