'use client'
import { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Pencil, Trash } from "lucide-react";
import { useUser } from "@/context/UserContext";
import ExportExcelButton from "@/components/Dashboard/ExportOrderData";


const Order = () => {
  const loggedUser = useUser();

  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  /* ================= Filters ================= */
  const [filterType, setFilterType] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [workerName, setWorkerName] = useState("");
  const [status, setStatus] = useState("");

  /* ================= Pagination ================= */
  const [page, setPage] = useState(1);
  const limit = 5;

  /* ================= Date Formatter ================= */
  function getDate(iso: string) {
    const date = new Date(iso);
    return (
      String(date.getMonth() + 1).padStart(2, "0") + "/" +
      String(date.getDate()).padStart(2, "0") + "/" +
      date.getFullYear() + " " +
      String(date.getHours()).padStart(2, "0") + ":" +
      String(date.getMinutes()).padStart(2, "0")
    );
  }

  /* ================= Fetch Orders ================= */
  async function fetchOrders() {
    try {
      if (!loggedUser?.shopName) return;

      setLoading(true);

      const params: any = {
        page,
        limit,
        shopName: loggedUser.shopName,
      };

      /* Date Filters */
      if (filterType === "today") {
        params.type = "date";
        params.date = new Date().toISOString().split("T")[0];
      }

      if (filterType === "week") {
        params.type = "days";
        params.days = 7;
      }

      if (filterType === "month") {
        params.type = "days";
        params.days = 30;
      }

      if (filterType === "date" && selectedDate) {
        params.type = "date";
        params.date = selectedDate;
      }

      /* Worker Filter */
      if (workerName) {
        params.workerName = workerName;
      }

      /* Status Filter */
      if (status) {
        params.status = status;
      }

      const res = await axios.get("/api/admin/order/fetch", { params });
      setOrders(res.data.data);

      console.log(res.data.data);

    } catch (error) {
      toast.error("Unable to fetch orders");
    } finally {
      setLoading(false);
    }
  }

  /* ================= Delete Orders ================= */
  const deleteOrder = async (deleteOrderId: string)=>{
    try {
      const res = await axios.delete('/api/admin/order/delete', {
        params: {
          OrderId: deleteOrderId
        }
      }) 
      console.log(res);
      toast.success(res.data.message);
      fetchOrders();
    } catch (error: unknown) {
     if(error instanceof Error){
        toast.error(error.message);
     } 
        toast.error('unable delete order');
    }
  }



  useEffect(() => {
    fetchOrders();
  }, [filterType, selectedDate, page, loggedUser, workerName, status]);

  return (
    <>
      <Toaster />

      <div className="user-container mt-4">

        {/* ================= Filters ================= */}
        <div className="flex gap-3 mb-4 flex-wrap justify-between">

        <div className="first-row flex gap-2">
          {/* Date Range */}
          <select
            className="bg-black border border-white/10 text-white px-3 py-2 rounded"
            value={filterType}
            onChange={(e) => {
              setFilterType(e.target.value);
              setPage(1);
            }}
          >
            <option value="">All</option>
            <option value="today">Today</option>
            <option value="week">Last 7 Days</option>
            <option value="month">Last 30 Days</option>
            <option value="date">Pick Date</option>
          </select>

          {filterType === "date" && (
            <input
              type="date"
              className="bg-black border border-white/10 text-white px-3 py-2 rounded"
              value={selectedDate}
              onChange={(e) => {
                setSelectedDate(e.target.value);
                setPage(1);
              }}
            />
          )}

          {/* Worker Search */}
          <input
            type="text"
            placeholder="Search worker"
            value={workerName}
            onChange={(e) => {
              setWorkerName(e.target.value);
              setPage(1);
            }}
            className="bg-black border border-white/10 text-white px-3 py-2 rounded"
          />

          {/* Status */}
          <select
            className="bg-black border border-white/10 text-white px-3 py-2 rounded"
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(1);
            }}
          >
            <option value="">All Status</option>
            <option value="success">Success</option>
            <option value="pending">Pending</option>
          </select>
        </div>
          <div className="second-row">
            <ExportExcelButton data={orders} />
          </div>

        </div>

        {/* ================= Table ================= */}
        <div className="relative overflow-x-auto bg-black/40 backdrop-blur-lg border border-white/10 rounded-2xl">
          <table className="w-full text-xs text-left text-gray-200">
            <thead className="bg-black/60 border-b border-white/10">
              <tr>
                <th className="px-6 py-3">Product</th>
                <th className="px-6 py-3">Worker</th>
                <th className="px-6 py-3">Prices</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-6 text-center text-gray-400">
                    Loading...
                  </td>
                </tr>
              ) : orders.length ? (
                orders.map((o, i) => (
                  <tr
                    key={i}
                    className="border-b border-white/5 hover:bg-white/5"
                  >
                    <td className="px-6 py-4">{o.product?.name}</td>
                    <td className="px-6 py-4">{o.worker?.fullName}</td>
                    <td className="px-6 py-4">
                      CP: {o.product?.cp}, SP: {o.product?.sp}
                    </td>
                    <td
                      className={`px-6 py-4 font-semibold ${
                        o.status === "success"
                          ? "text-blue-400"
                          : "text-red-400"
                      }`}
                    >
                      {o.status}
                    </td>
                    <td className="px-6 py-4">
                      {getDate(o.createdAt)}
                    </td>
                    <td className="px-6 py-4 flex gap-3">
                      <Pencil className="text-blue-300 cursor-pointer" />
                      <Trash className="text-red-400 cursor-pointer" onClick={()=>{deleteOrder(o._id)}}/>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-6 text-center text-gray-400">
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ================= Pagination ================= */}
        <div className="flex justify-end gap-3 mt-4">
          <button
            disabled={page === 1}
            onClick={() => setPage(p => p - 1)}
            className="px-4 py-2 bg-black border border-white/10 text-white rounded disabled:opacity-40"
          >
            Prev
          </button>

          <span className="text-white px-3 py-2">
            Page {page}
          </span>

          <button
            onClick={() => setPage(p => p + 1)}
            className="px-4 py-2 bg-black border border-white/10 text-white rounded"
          >
            Next
          </button>
        </div>

      </div>
    </>
  );
};

export default Order;
