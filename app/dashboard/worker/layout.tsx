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
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import axios from "axios"
import { UserContext } from "@/context/UserContext";

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
    <main className="bg-[url('/images/dashboard/background.png')] w-full h-screen text-white flex">
      
      {/* SIDEBAR */}
      <div className="sidebar w-[20%] p-2">
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

            {/* MAIN MENU */}
            <div>
              <h2 className="text-text-secondary mb-2">MAIN MENU</h2>

              <div className="flex flex-col gap-2">
                <Link
                  href="/dashboard/worker"
                  className={menuClass("/dashboard/worker")}
                >
                  <LayoutDashboard />
                  <span>Dashboard</span>
                </Link>

                <Link
                  href="/dashboard/worker/order"
                  className={menuClass("/dashboard/worker/order")}
                >
                  <Plus />
                  <span>Add Order</span>
                </Link>
              </div>
            </div>

            {/* ACCOUNT */}
            <div>
              <h2 className="text-text-secondary mb-2">ACCOUNT</h2>

              <div className="flex flex-col gap-2">
                <Link
                  href="/dashboard/worker/account"
                  className={menuClass("/dashboard/worker/account")}
                >
                  <User />
                  <span>My Account</span>
                </Link>

                <Link
                  href="/dashboard/worker/help"
                  className={menuClass("/dashboard/worker/help")}
                >
                  <HandHelping />
                  <span>Get Help</span>
                </Link>

                <Link
                  href="/dashboard/worker/settings"
                  className={menuClass("/dashboard/worker/settings")}
                >
                  <Settings />
                  <span>Settings</span>
                </Link>
              </div>
            </div>
            <hr />
            {/* LOGOUT */}
            <button
              onClick={LogOutUser}
              className="menu-box flex gap-2 p-2 text-red-400 hover:bg-red-500/10 rounded-lg w-full cursor-pointer"
            >
              <LogOut />
              <span>Log Out</span>
            </button>
          </div>

          {/* USER INFO */}
          <div className="flex items-center gap-3 p-2 bg-gray-800/40 rounded-xl">
            <Image src="/images/landing/logo.png" width={40} height={40} alt="User" />
            <div>
              <h1 className="text-sm">{user.fullName || "Worker"}</h1>
              <p className="text-text-secondary text-xs">{user.email}</p>
            </div>
          </div>

        </div>
      </div>

      {/* MAIN AREA */}
      <div className="main-area w-[80%] p-2">
        <div className="area-container bg-gray-950/90 rounded-2xl w-full h-full p-4">
          
          <div className="header border-b-gray-400 border-b p-2 w-full ">
            <div className="topbar-container flex justify-between ">
              <div className="first flex gap-2 items-center  border-gray-400 border rounded-sm p-2 h-12">
                <div className="search-icon p-2"><Search /></div> 
                <input type="text" placeholder="Search.. " className=" h-10"/>
              </div>
              <div className="second-wrapper flex  gap-4 items-center ">
                  <div className="second">
                    <Bell />
                  </div>
                  <div className="third flex items-center gap-2">
                    <div className="pfp">
                      <div className="w-10 h-10 bg-gray-400 rounded-full"></div>
                    </div>
                    <div className="">
                      <h1 className="text-lg ">{user.fullName}</h1>
                      <h2 className="text-text-secondary  ">{user.email}</h2>
                    </div>
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
