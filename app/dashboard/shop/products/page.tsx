'use client'
import { UserRoundPlus, UsersRound, Trash, Pencil } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useUser } from "@/context/UserContext";

interface Product {
  _id?: string;
  name: string;
  cp: string;
  sp: string;
  mv: string;
  user: string;
  efficiency?: number; 
}

const Page = () => {
  const loggedUser = useUser();

  const [product, setProduct] = useState<Product>({
    name: "",
    cp: "",
    sp: "",
    mv: "",
    user: "",
  });

  const [products, setProducts] = useState<Product[]>([]);
  const [days, setDays] = useState<number>(30); 


    async function fetchProducts() {
      try {
        const res = await axios.get("/api/admin/product/fetch", {
          params: {
            centerName: loggedUser.shopName,
            days, // 🔥 send days
          },
        });
        setProducts(res.data.data);
      } catch {
        toast.error("Unable to fetch products");
      }
    }

  /* ---------------- Fetch Products ---------------- */
  useEffect(() => {
    if (!loggedUser?._id || !loggedUser?.shopName) return;

    setProduct(prev => ({ ...prev, user: loggedUser._id }));

    fetchProducts();
  }, [loggedUser, days]);

  /* ---------------- Add Product ---------------- */
  const addProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const res = await axios.post("/api/admin/product/add", product);
      toast.success(res.data.message);
      setProducts(prev => [...prev, product]);
      fetchProducts();
    } catch {
      toast.error("Unable to add product");
    }
  };

  const deleteProduct = async (deleteProductId: string) => {
    try {
     const res = await axios.delete('/api/admin/product/delete', {
      params: {
        productId:  deleteProductId
      }
     });
     console.log(res);
     toast.success(res.data.message);
     fetchProducts();
    } catch (error: unknown) {
      if(error instanceof Error){
        toast.error(error.message);
      }
      console.log(error);
    }
  }

  return (
    <div className="add-user-container mt-4 p-2">
      <Toaster />

      {/* ================= Add Product ================= */}
      <div className="title-container text-xl flex gap-2 items-center border border-white/10 bg-black/50 rounded-xl px-4 py-3 mb-3 text-white">
        <UserRoundPlus />
        <h1>Add New Product</h1>
      </div>

      <div className="border border-white/10 bg-black/40 rounded-2xl p-4">
        <form onSubmit={addProduct} className="flex flex-col gap-3 text-white">
          {[
            { name: "name", placeholder: "Name" },
            { name: "cp", placeholder: "Cost Price" },
            { name: "sp", placeholder: "Sell Price" },
            { name: "mv", placeholder: "Market Value" },
          ].map((field, i) => (
            <input
              key={i}
              placeholder={field.placeholder}
              value={(product as any)[field.name]}
              onChange={(e) =>
                setProduct(prev => ({ ...prev, [field.name]: e.target.value }))
              }
              className="bg-neutral-900 border border-white/10 px-4 py-3 rounded-xl"
            />
          ))}

          <button className="bg-blue-600 py-3 rounded-xl">
            Create Product
          </button>
        </form>
      </div>

      {/* ================= All Products ================= */}
      <div className="user-container mt-6">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2 text-white text-xl">
            <UsersRound />
            <h1>All Products</h1>
          </div>

          {/* 🔥 Efficiency Filter */}
          <select
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            className="bg-black border border-white/10 text-white px-3 py-2 rounded"
          >
            <option value={1}>Last 1 Day</option>
            <option value={7}>Last 7 Days</option>
            <option value={15}>Last 15 Days</option>
            <option value={30}>Last 30 Days</option>
          </select>
        </div>

        <div className="overflow-x-auto bg-black/40 border border-white/10 rounded-2xl">
          <table className="w-full text-sm text-left text-gray-200">
            <thead className="bg-black/60 border-b border-white/10">
              <tr>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">CP</th>
                <th className="px-6 py-3">SP</th>
                <th className="px-6 py-3">MV</th>
                <th className="px-6 py-3">Efficiency</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.length ? (
                products.map((p, i) => (
                  <tr key={i} className="border-b border-white/5 hover:bg-white/5">
                    <td className="px-6 py-4">{p.name}</td>
                    <td className="px-6 py-4">{p.cp}</td>
                    <td className="px-6 py-4">{p.sp}</td>
                    <td className="px-6 py-4">{p.mv}</td>
                    <td className="px-6 py-4 font-semibold text-blue-400">
                      {p.efficiency ?? 0}
                    </td>
                    <td className="px-6 py-4 flex gap-3">
                      <Pencil className="text-blue-400 cursor-pointer" />
                      <Trash className="text-red-400 cursor-pointer" onClick={()=> {deleteProduct(p._id || "")}}/>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-6 text-gray-400">
                    No products found
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

export default Page;
