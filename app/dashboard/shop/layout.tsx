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
import { UserContext } from "@/context/UserContext"



interface User {
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
            const logoutData = await axios.get('/api/logout'); 
            toast.success('logout successfull');
            router.push('/login');
        } catch (error) {
            console.log(error);        
        }
    }

    useEffect(() => {
      async function getUserData(){
        const userData = await axios.get('/api/me');
        const realData = userData.data.data;
        console.log(userData.data.data);
        setUser(realData);
      }
      getUserData();
    }, [])

  return (
    <main className="bg-[url('/images/dashboard/background.png')] w-full h-screen bg-cover text-white flex">
      
      {/* SIDEBAR */}
      <div className="sidebar w-[20%] p-2">
        <div className="sidebar-container p-4 h-full flex flex-col justify-between bg-gray-950/25 rounded-2xl ">

          {/* LOGO */}
          <div className="border border-gray-700 bg-gray-800/50 rounded-2xl p-2">
            <div className="flex items-center gap-3">
              <Image src="/images/landing/logo.png" width={40} height={40} alt="Logo" />
              <div>
                <h1 className="text-xl">Daily HQ</h1>
                <p className="text-text-secondary text-sm">Analytics Dashboard</p>
              </div>
            </div>
          </div>

          {/* MENU */}
          <div className="flex-1 flex flex-col gap-1 mt-4">

            {/* MAIN MENU */}
            <div>
              <h2 className="text-text-secondary mb-2">MAIN MENU</h2>

              <div className="flex flex-col gap-1">
                <Link href="/dashboard/shop" className={menuClass("/dashboard/shop")}>
                  <LayoutDashboard />
                  <span>Dashboard</span>
                </Link>

                <Link href="/dashboard/shop/orders" className={menuClass("/dashboard/shop/orders")}>
                  <NotebookText />
                  <span>Orders</span>
                </Link>

                <Link href="/dashboard/shop/products" className={menuClass("/dashboard/shop/products")}>
                  <ShoppingCart />
                  <span>Products</span>
                </Link>

                <Link href="/dashboard/shop/add-user" className={menuClass("/dashboard/shop/add-user")}>
                  <UserPlus />
                  <span>Add User</span>
                </Link>

                <Link href="/dashboard/shop/billing" className={menuClass("/dashboard/shop/billing")}>
                  <CreditCard />
                  <span>Billing</span>
                </Link>

                <Link href="/dashboard/shop/customers" className={menuClass("/dashboard/shop/customers")}>
                  <Users />
                  <span>Customers</span>
                </Link>
              </div>
            </div>

            {/* ACCOUNT */}
            <div>
              <h2 className="text-text-secondary mb-2">ACCOUNT</h2>

              <div className="flex flex-col gap-1">
                <Link href="/dashboard/shop/account" className={menuClass("/dashboard/shop/account")}>
                  <User />
                  <span>My Account</span>
                </Link>

                <Link href="/dashboard/shop/help" className={menuClass("/dashboard/shop/help")}>
                  <HandHelping />
                  <span>Get Help</span>
                </Link>

                <Link href="/dashboard/shop/settings" className={menuClass("/dashboard/shop/settings")}>
                  <Settings />
                  <span>Settings</span>
                </Link>
              </div>
            </div>

            {/* LOGOUT */}
            <div className="border-t border-gray-700 pt-3">
              <button className="menu-box flex gap-1 p-2 text-red-400 hover:bg-red-500/10 rounded-lg w-full cursor-pointer" onClick={() => {LogOutUser()}}>  
                <LogOut />
                <span>Log Out</span>
              </button>
            </div>
          </div>

          {/* USER INFO */}
          <div className="flex items-center gap-2 p-2 bg-gray-800/40 rounded-xl">
            <Image src="/images/landing/logo.png" width={40} height={40} alt="User" />
            <div>
              <h1 className="text-sm">{user.fullName}</h1>
              <p className="text-text-secondary text-xs">{user.email}</p>
            </div>
          </div>

        </div>
      </div>

      {/* MAIN AREA */}
      <div className="main-area w-[80%] ">
        <div className="area-container bg-gray-950/90 rounded-2xl w-full h-full p-4">
         <div className="area1 border-b-gray-400 border-b p-2 w-full ">
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
