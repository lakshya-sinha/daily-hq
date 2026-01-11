'use client'

import { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Pencil, Trash, Wallet, ShoppingCart, CreditCard } from "lucide-react";
import { useUser } from "@/context/UserContext";
import DelsBox from "@/components/Dashboard/miniCompo/DelsBox";

interface Analytics{
  netIncome: number,
  netProfit: number,
  totalIncome: number,
  totalOrders: number,
  totalExpense: number,
  success: boolean,
}

const Analytics = () => {
  const loggedUser = useUser();

  const [ana, setAna] = useState<Analytics>({
    totalIncome: 0,
    netIncome: 0,
    netProfit: 0,
    totalOrders: 0,
    totalExpense: 0,
    success: true,
  });

  const [loading, setLoading] = useState(false);

  /* ================= Filters ================= */
  const [filterType, setFilterType] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [workerName, setWorkerName] = useState("");
  const [status, setStatus] = useState("");

  useEffect(()=>{console.log("ana", ana)}, [ana])

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


      const res = await axios.get("/api/admin/analytics/fetch", { params });

      setAna(res.data);

      console.log(res.data);

    } catch (error) {
      toast.error("Unable to fetch orders");
      console.log(error)
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchOrders();
  }, [filterType, selectedDate, loggedUser, workerName, status]);

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
              }}
            />
          )}


        </div>
          {/* <div className="second-row">
            <ExportExcelButton data={orders} />
          </div> */}
          <div className="area2 p-3 grid  grid-cols-1 lg:grid-cols-4 gap-6 items-center justify-center">
            <DelsBox stroke="green" icon={<Wallet />} label="Total Income" value={ana.totalIncome} />
            <DelsBox stroke="green" icon={<Wallet />} label="Profit" value={ana.netIncome} />
            <DelsBox stroke="green" icon={<Wallet />} label="Net Profit" value={ana.netProfit} />
            <DelsBox stroke="rgba(103, 232, 249, 0.9)" icon={<ShoppingCart />} label="Total Orders" value={ana.totalOrders} />
            <DelsBox stroke="red" icon={<CreditCard />} label="Total Expenses" value={ana.totalExpense} />
            
          </div>

        </div>


      </div>
    </>
  );
};

export default Analytics;
