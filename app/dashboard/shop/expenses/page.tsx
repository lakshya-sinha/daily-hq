'use client'

import { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { UsersRound, Pencil, Trash } from "lucide-react";
import { useUser } from "@/context/UserContext";

const Expense = () => {
  const loggedUser = useUser();

  const [expenses, setExpenses] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // filters
  const [filterType, setFilterType] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  // pagination
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

  /* ================= Fetch Expenses ================= */
  async function fetchExpenses() {
    try {
      if (!loggedUser?.shopName) return;

      setLoading(true);

      const params: any = {
        page,
        limit,
        shopName: loggedUser.shopName,
      };

      if (filterType === "today") {
        params.date = new Date().toISOString().split("T")[0];
      }

      if (filterType === "week") {
        params.days = 7;
      }

      if (filterType === "month") {
        params.days = 30;
      }

      if (filterType === "date" && selectedDate) {
        params.date = selectedDate;
      }

      const res = await axios.get("/api/admin/expense/fetch", { params });
      setExpenses(res.data.data);

    } catch (error) {
      toast.error("Unable to fetch expenses");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchExpenses();
  }, [filterType, selectedDate, page, loggedUser]);

  return (
    <>
      <Toaster />

      <div className="user-container mt-4">

        {/* Filters */}
        <div className="flex gap-4 mb-4 items-center">
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
        </div>

        {/* Table */}
        <div
          className="
            relative overflow-x-auto
            bg-black/40 backdrop-blur-lg
            border border-white/10
            rounded-2xl
            shadow-[0_0_40px_rgba(0,0,0,0.6)]
          "
        >
          <table className="w-full text-sm text-left text-gray-200">
            <thead
              className="
                text-sm text-gray-300
                bg-black/60 backdrop-blur
                border-b border-white/10
              "
            >
              <tr>
                <th className="px-6 py-3">Expense</th>
                <th className="px-6 py-3">Cost</th>
                <th className="px-6 py-3">Reason</th>
                <th className="px-6 py-3">Worker</th>
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
              ) : expenses.length > 0 ? (
                expenses.map((e, index) => (
                  <tr
                    key={index}
                    className="border-b border-white/5 hover:bg-white/5"
                  >
                    <td className="px-6 py-4 text-white">{e.name}</td>
                    <td className="px-6 py-4 text-red-400">₹{e.cost}</td>
                    <td className="px-6 py-4">{e.why}</td>
                    <td className="px-6 py-4">{e.worker?.fullName}</td>
                    <td className="px-6 py-4">{getDate(e.createdAt)}</td>
                    <td className="px-6 py-4 flex gap-3">
                      <Pencil className="text-blue-300 cursor-pointer" />
                      <Trash className="text-red-400 cursor-pointer" />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-6 text-center text-gray-400">
                    No expenses found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
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

export default Expense;
