'use client'

import {
  LogOut,
  LayoutDashboard,
  User,
  HandHelping,
  Settings,
  Plus,
  Search,
  Bell,
  CreditCard,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import axios from "axios"
import { UserContext } from "@/context/UserContext"

interface UserType {
  _id: string
  fullName: string
  mobileNo: string
  email: string
  address: string
  shopName: string
  shopAddress: string
  isOwner: boolean
}

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserType>({
    _id: "",
    fullName: "",
    mobileNo: "",
    email: "",
    address: "",
    shopName: "",
    shopAddress: "",
    isOwner: true,
  })

  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const router = useRouter()
  const pathname = usePathname()

  const isActive = (path: string) =>
    pathname === path || pathname.startsWith(path + "/")

  const menuClass = (path: string) =>
    `menu-box flex gap-2 items-center p-2 rounded-lg transition cursor-pointer
     ${
       isActive(path)
         ? "border border-blue-400 bg-blue-500/10 text-blue-300"
         : "text-gray-300 hover:bg-gray-800/50"
     }`

  const LogOutUser = async () => {
    try {
      await axios.get("/api/auth/logout")
      toast.success("Logout successful")
      router.push("/login")
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    async function getUserData() {
      const res = await axios.get("/api/auth/me")
      setUser(res.data.data)
    }
    getUserData()
  }, [])

  return (
    <main className="bg-[url('/images/dashboard/background.png')] w-full h-screen text-white flex relative overflow-hidden">

      {/* OVERLAY */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`
          fixed lg:static top-0 left-0 z-50
          w-[75%] sm:w-[60%] lg:w-[20%]
          h-full p-2
          bg-black/80 lg:bg-transparent
          transition-transform duration-300
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        <div className="sidebar-container p-4 h-full flex flex-col justify-between gap-3 bg-gray-950/25 rounded-2xl">

          {/* LOGO */}
          <div className="border border-gray-700 bg-gray-800/50 rounded-2xl p-2">
            <div className="flex items-center gap-3">
              <Image src="/images/landing/logo.png" width={40} height={40} alt="Logo" />
              <div>
                <h1 className="text-xl">Daily HQ</h1>
                <p className="text-text-secondary text-sm">Worker Dashboard</p>
              </div>
            </div>
          </div>

          {/* MENU */}
          <div className="flex-1 flex flex-col gap-6 mt-4">
            <div>
              <h2 className="text-text-secondary mb-2">MAIN MENU</h2>
              <div className="flex flex-col gap-2">
                <Link href="/dashboard/worker" className={menuClass("/dashboard/worker")}>
                  <LayoutDashboard /> Dashboard
                </Link>
                <Link href="/dashboard/worker/order" className={menuClass("/dashboard/worker/order")}>
                  <Plus /> Add Order
                </Link>
                <Link href="/dashboard/worker/expense" className={menuClass("/dashboard/worker/expense")}>
                  <CreditCard /> Add Expense
                </Link>
              </div>
            </div>

            <div>
              <h2 className="text-text-secondary mb-2">ACCOUNT</h2>
              <div className="flex flex-col gap-2">
                <Link href="/dashboard/worker/account" className={menuClass("/dashboard/worker/account")}>
                  <User /> My Account
                </Link>
                <Link href="/dashboard/worker/help" className={menuClass("/dashboard/worker/help")}>
                  <HandHelping /> Get Help
                </Link>
                <Link href="/dashboard/worker/settings" className={menuClass("/dashboard/worker/settings")}>
                  <Settings /> Settings
                </Link>
              </div>
            </div>

            <hr />

            <button
              onClick={LogOutUser}
              className="flex gap-2 p-2 text-red-400 hover:bg-red-500/10 rounded-lg"
            >
              <LogOut /> Log Out
            </button>
          </div>

          {/* USER INFO */}
          <div className="flex items-center gap-3 p-2 bg-gray-800/40 rounded-xl">
            <div className="w-10 h-10 bg-gray-400 rounded-full" />
            <div>
              <h1 className="text-sm">{user.fullName || "Worker"}</h1>
              <p className="text-text-secondary text-xs">{user.email}</p>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN AREA */}
      <div className="w-full lg:w-[80%] p-2">
        <div className="bg-gray-950/90 rounded-2xl w-full h-full p-4">

          {/* HEADER */}
          <div className="border-b border-gray-400 p-2">
            <div className="flex flex-col lg:flex-row gap-3 justify-between">

              <div className="flex gap-2 items-center w-full lg:w-auto">
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="lg:hidden p-2 border border-gray-400 rounded-sm"
                >
                  ☰
                </button>

                <div className="flex items-center gap-2 border border-gray-400 rounded-sm p-2 w-full">
                  <Search />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="bg-transparent outline-none w-full"
                  />
                </div>
              </div>

              <div className="flex gap-4 items-center justify-end">
                <Bell />
                <div>
                  <h1 className="text-lg">{user.fullName}</h1>
                  <p className="text-text-secondary text-sm hidden sm:block">
                    {user.email}
                  </p>
                </div>
              </div>

            </div>
          </div>

          <UserContext.Provider value={user}>
            {children}
          </UserContext.Provider>

        </div>
      </div>
    </main>
  )
}

export default DashboardLayout
