'use client'

import {
  LogOut,
  LayoutDashboard,
  Wallet,
  NotebookText,
  ShoppingCart,
  CreditCard,
  Users,
  User,
  HandHelping,
  Settings,
  UserPlus,
  Search,
  Bell
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast';
import axios from 'axios';
import { UserContext } from "@/context/UserContext";
import ScrollFix from "@/components/Dashboard/utils/ScrollFix";


interface User {
  _id: string;
  fullName: string;
  mobileNo: string;
  email: string;
  address: string;
  shopName: string;
  shopAddress: string;
  isOwner: boolean;
}


const DashboardLayout = ({ children }: { children: React.ReactNode }) => {

 const [user, setUser ] = useState<User>({
    _id: "",
    fullName: "",
    mobileNo: "",
    email: "",
    address: "",
    shopName: "",
    shopAddress: "",
    isOwner: true,
  });

 
  const router = useRouter();
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
            const logoutData = await axios.get('/api/auth/logout'); 
            toast.success('logout successfull');
            router.push('/login');
        } catch (error) {
            console.log(error);        
        }
    }

    useEffect(() => {
      async function getUserData(){
        const userData = await axios.get('/api/auth/me');
        const realData = userData.data.data;
        setUser(realData);
      }
      getUserData();
    }, [])

  return (
    <main className="bg-[url('/images/dashboard/background.png')] w-full h-screen bg-cover text-white  flex">
      {/* SIDEBAR */}
      <div className="sidebar w-[40%] lg:w-[20%]  lg:p-2 h-screen">
        <div className="sidebar-container p-4 h-full flex flex-col justify-between bg-gray-950/25 rounded-2xl ">

          {/* LOGO */}
          <div className="border border-gray-700 bg-gray-800/50 rounded-2xl p-2">
            <div className="flex flex-col lg:flex-row items-center gap-3">
              <Image src="/images/landing/logo.png" width={40} height={40} alt="Logo" loading="eager"   className="w-10 h-10"/>
              <div>
              <h1 className="text-xs lg:text-xl">Daily HQ</h1>
                <p className="text-text-secondary text-xs">Analytics Dashboard</p>
              </div>
            </div>
          </div>

          {/* MENU */}
          <div className="flex-1 flex flex-col gap-1 mt-4">

            {/* MAIN MENU */}
            <div>
              <h2 className="text-text-secondary mb-2 text-sm lg:text-sm">MAIN MENU</h2>

              <div className="flex flex-col gap-1">
                <Link href="/dashboard/shop" className={menuClass("/dashboard/shop")}>
                  <LayoutDashboard />
                  <span className="hidden lg:block">Dashboard</span>
                </Link>

                <Link href="/dashboard/shop/orders" className={menuClass("/dashboard/shop/orders")}>
                  <NotebookText />
                  <span className="hidden lg:block">Orders</span>
                </Link>

                <Link href="/dashboard/shop/products" className={menuClass("/dashboard/shop/products")}>
                  <ShoppingCart />
                  <span className="hidden lg:block">Products</span>
                </Link>

                <Link href="/dashboard/shop/users" className={menuClass("/dashboard/shop/users")}>
                  <UserPlus />
                  <span className="hidden lg:block"> User</span>
                </Link>

                <Link href="/dashboard/shop/expenses" className={menuClass("/dashboard/shop/expenses")}>
                  <CreditCard />
                  <span className="hidden lg:block">Expenses</span>
                </Link>

                <Link href="/dashboard/shop/analytics" className={menuClass("/dashboard/shop/analytics")}>
                  <Users />
                  <span className="hidden lg:block">Analytics</span>
                </Link>
              </div>
            </div>

            {/* ACCOUNT */}
            <div>
              <h2 className="text-text-secondary mb-2 text-sm lg:text-sm">ACCOUNT</h2>

              <div className="flex flex-col gap-1">
                <Link href="/dashboard/shop/account" className={menuClass("/dashboard/shop/account")}>
                  <User />
                  <span className="hidden lg:block">My Account</span>
                </Link>

                <Link href="/dashboard/shop/help" className={menuClass("/dashboard/shop/help")}>
                  <HandHelping />
                  <span className="hidden lg:block">Get Help</span>
                </Link>

                <Link href="/dashboard/shop/settings" className={menuClass("/dashboard/shop/settings")}>
                  <Settings />
                  <span className="hidden lg:block">Settings</span>
                </Link>
              </div>
            </div>

            {/* LOGOUT */}
            <div className="border-t border-gray-700 pt-3">
              <button className="menu-box flex gap-1 items-center p-2 text-red-400 hover:bg-red-500/10 rounded-lg w-full cursor-pointer" onClick={() => {LogOutUser()}}>  
                <LogOut />
                <span className="hidden lg:block">Log Out</span>
              </button>
            </div>
          </div>

          {/* USER INFO */}
          <div className="flex items-center gap-2 p-2 bg-gray-800/40 rounded-xl hidden lg:flex">
            <Image src="/images/landing/logo.png" width={40} height={40} alt="User" />
            <div className="hidden lg:block">
              <h1 className="text-sm">{user.fullName}</h1>
              <p className="text-text-secondary   lg:text-xs">{user.email}</p>
            </div>
          </div>

        </div>
      </div>

      {/* MAIN AREA */}
      <div className="main-area w-[70%] lg:w-[80%] h-screen ">
        <div className="area-container bg-gray-950/90 rounded-2xl w-full h-full flex flex-col p-2">
         <div className="header border-b-gray-400 border-b p-2 w-full ">
            <div className="topbar-container flex justify-between ">
              <div className="first flex gap-2 items-center  border-gray-400 border rounded-sm p-2 h-12 hidden lg:flex">
                <div className="search-icon p-2"><Search /></div> 
                <input type="text" placeholder="Search.. " className=" h-10"/>
              </div>
              <div className="second-wrapper flex  gap-4 items-center ">
                  <div className="second hidden lg:block">
                    <Bell />
                  </div>
                  <div className="third flex items-center gap-2">
                    <div className="pfp">
                      <div className="w-10 h-10 bg-gray-400 rounded-full"></div>
                    </div>
                    <div className="">
                      <h1 className="text-lg text-xs lg:text-sm">{user.fullName}</h1>
                      <h2 className="text-text-secondary  text-xs lg:text-sm">{user.email}</h2>
                    </div>
                  </div>
              </div>
             
            </div>
          </div>

              <UserContext.Provider value={user}> 
                  <div className="flex-1 overflow-scroll lg:overflow-auto">
                    <ScrollFix>
                      {children}
                    </ScrollFix>
                  </div>
              </UserContext.Provider>

        </div>
      </div>
    </main>
  )
}

export default DashboardLayout
