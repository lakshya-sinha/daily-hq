'use client'

import { UserRoundPlus } from "lucide-react"
import { useState, useEffect } from "react"
import axios from "axios"
import toast, { Toaster } from "react-hot-toast"
import { useUser } from "@/context/UserContext"

/* ================= Interfaces ================= */

interface Expense {
  name: string
  cost: string
  why: string
  worker: string
}

/* ================= Component ================= */

const Page = () => {

  const loggedUser = useUser()

  const [expense, setExpense] = useState<Expense>({
    name: "",
    cost: "",
    why: "",
    worker: "",
  })

  /* ================= Set Worker ================= */

  useEffect(() => {
    if (!loggedUser?._id) return
    setExpense(prev => ({
      ...prev,
      worker: loggedUser._id,
    }))
  }, [loggedUser])

  /* ================= Submit ================= */

  const addExpense = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const res = await axios.post("/api/worker/expense/add", expense)

      toast.dismissAll()
      toast.success(res.data.message)

      setExpense(prev => ({
        ...prev,
        name: "",
        cost: "",
        why: "",
      }))
    } catch (error) {
      toast.error("Unable to add expense")
    }
  }

  /* ================= UI ================= */

  return (
    <div className="add-user-container mt-4 p-2">

      <Toaster />

      {/* ================= Add Expense ================= */}
      <div
        className="title-container text-xl flex gap-2 items-center 
        border border-white/10 
        bg-gradient-to-r from-black/60 to-black/30
        backdrop-blur-md
        rounded-xl px-4 py-3 mb-3
        text-white shadow-lg"
      >
        <UserRoundPlus />
        <h1>Add New Expense</h1>
      </div>

      <div
        className="
        border border-white/10 
        bg-black/40 backdrop-blur-lg
        rounded-2xl p-4
        shadow-[0_0_40px_rgba(0,0,0,0.6)]
        "
      >
        <form onSubmit={addExpense} className="flex flex-col gap-4 text-white">

          {/* Expense Name */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-white/80">Expense Name</label>
            <input
              required
              type="text"
              value={expense.name}
              onChange={(e) =>
                setExpense(prev => ({ ...prev, name: e.target.value }))
              }
              placeholder="Electricity Bill"
              className="bg-black/60 border border-white/10 rounded-xl px-3 py-2"
            />
          </div>

          {/* Cost */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-white/80">Cost</label>
            <input
              required
              type="number"
              value={expense.cost}
              onChange={(e) =>
                setExpense(prev => ({ ...prev, cost: e.target.value }))
              }
              placeholder="2500"
              className="bg-black/60 border border-white/10 rounded-xl px-3 py-2"
            />
          </div>

          {/* Reason */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-white/80">Reason</label>
            <textarea
              required
              value={expense.why}
              onChange={(e) =>
                setExpense(prev => ({ ...prev, why: e.target.value }))
              }
              placeholder="Office electricity usage"
              rows={3}
              className="bg-black/60 border border-white/10 rounded-xl px-3 py-2 resize-none"
            />
          </div>

          {/* Submit */}
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
            Add Expense
          </button>

        </form>
      </div>
    </div>
  )
}

export default Page
