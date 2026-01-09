'use client';

import { UserRoundPlus } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useUser } from "@/context/UserContext";

/* ================= Interfaces ================= */

interface Order {
  product: string;
  worker: string;
  status: string;
  name: string;
}

interface Product {
  _id: string;
  name: string;
  cp: string;
  sp: string;
  mv: string;
}

/* ================= Component ================= */

export default function Page() {
  const loggedUser = useUser();

  const [products, setProducts] = useState<Product[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [order, setOrder] = useState<Order>({
    product: "",
    worker: "",
    status: "",
    name: "",
  });

  /* ================= Fetch Products ================= */

  useEffect(() => {
    if (!loggedUser?.shopName) return;

    async function fetchProducts() {
      try {
        const res = await axios.get("/api/admin/product/fetch", {
          params: { centerName: loggedUser.shopName },
        });
        setProducts(res.data.data);
      } catch {
        toast.error("Failed to fetch products");
      }
    }

    fetchProducts();
  }, [loggedUser?.shopName]);

  /* ================= Set Worker ================= */

  useEffect(() => {
    if (!loggedUser?._id) return;

    setOrder(prev => ({
      ...prev,
      worker: loggedUser._id,
    }));
  }, [loggedUser?._id]);

  /* ================= Submit ================= */

  const addOrder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);

      const res = await axios.post("/api/worker/order/add", order);

      toast.dismissAll();
      toast.success(res.data.message);

      setOrder(prev => ({
        ...prev,
        product: "",
        status: "",
        name: "",
      }));
    } catch {
      toast.error("Unable to add order");
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ================= UI ================= */

  return (
    <div className="add-user-container mt-4 p-2">
      <Toaster />

      {/* ================= Title ================= */}
      <div
        className="
          text-xl flex gap-2 items-center
          border border-white/10 
          bg-gradient-to-r from-black/60 to-black/30
          backdrop-blur-md
          rounded-xl px-4 py-3 mb-3
          text-white shadow-lg
        "
      >
        <UserRoundPlus />
        <h1>Add New Order</h1>
      </div>

      {/* ================= Form ================= */}
      <div
        className="
          border border-white/10 
          bg-black/40 backdrop-blur-lg
          rounded-2xl p-4
          shadow-[0_0_40px_rgba(0,0,0,0.6)]
        "
      >
        <form
          onSubmit={addOrder}
          className="flex flex-col gap-4 text-white"
        >
          {/* Product */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-white/80">Select Product</label>
            <select
              required
              disabled={isSubmitting}
              value={order.product}
              onChange={(e) =>
                setOrder(prev => ({
                  ...prev,
                  product: e.target.value,
                  status: prev.status || "success",
                }))
              }
              className="bg-black/60 border border-white/10 rounded-xl px-3 py-2 disabled:opacity-60"
            >
              <option value="">-- Select Product --</option>
              {products.map(p => (
                <option key={p._id} value={p._id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          {/* Order Name */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-white/80">Order Name</label>
            <input
              disabled={isSubmitting}
              value={order.name}
              placeholder="name"
              onChange={(e) =>
                setOrder(prev => ({
                  ...prev,
                  name: e.target.value,
                  status: prev.status || "success",
                }))
              }
              className="bg-black/60 border border-white/10 rounded-xl px-3 py-2 disabled:opacity-60"
            />
          </div>

          {/* Status */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-white/80">Order Status</label>
            <select
              required
              disabled={isSubmitting}
              value={order.status}
              onChange={(e) =>
                setOrder(prev => ({
                  ...prev,
                  status: e.target.value,
                }))
              }
              className="bg-black/60 border border-white/10 rounded-xl px-3 py-2 disabled:opacity-60"
            >
              <option value="">-- Select Status --</option>
              <option value="success">Success</option>
              <option value="pending">Pending</option>
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`
              px-4 py-3 w-full rounded-2xl
              bg-gradient-to-r from-primary-blue to-blue-500
              text-white font-medium
              transition-all duration-200
              ${
                isSubmitting
                  ? "opacity-60 cursor-not-allowed"
                  : "hover:brightness-110 active:scale-[0.98]"
              }
            `}
          >
            {isSubmitting ? "Adding Order..." : "Add Order"}
          </button>
        </form>
      </div>
    </div>
  );
}
