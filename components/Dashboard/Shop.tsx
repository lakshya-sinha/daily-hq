'use client'
import { LogOut, LayoutDashboard, Wallet, NotebookText, ShoppingCart, CreditCard, Users, User,  HandHelping, Settings, Bell, Search } from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"; 
import DelsBox from "./miniCompo/DelsBox";
import { useUser } from "@/context/UserContext";
import ProductEfficiencyBox from "@/components/Dashboard/utils/ProductEfficiencyBox";
import axios from 'axios';
import Order from "@/app/dashboard/shop/orders/page";



interface Analytics {
  success: boolean,
  totalOrders: number,
  netIncome: number,
  totalIncome: number,
  netProfit: number,
  totalExpense: number
}

const Shop = () => {
   const loggedUser = useUser();

   const [productStats, setProductStats] = useState([]);
   const [analytics, setAnalytics] = useState<Analytics>({
    success: true,
    totalOrders: 0,
    netIncome: 0,
    totalIncome: 0,
    netProfit: 0,
    totalExpense: 0
   })

   async function fetchStats() {
      const res = await axios.get("/api/admin/product/fetch", {
        params: {
          centerName: loggedUser.shopName,
          days: 30,
        },
      });

      setProductStats(
        res.data.data.map((p: any) => ({
          name: p.name,
          efficiency: p.efficiency,
        }))
      );

      const res2 = await axios.get('/api/admin/analytics/fetch', {
        params: {
          shopName: loggedUser.shopName,
          days: 30
        }
      })

      setAnalytics(res2.data);

    }

    useEffect(() => {
      if (!loggedUser?.shopName) return;
      fetchStats();
    }, [loggedUser]);


  return (
   
    <>
         
          <div className="area2 p-3 grid  grid-cols-1 lg:grid-cols-4 gap-6 items-center justify-center">
            <DelsBox  stroke="green" icon={<Wallet />} label="Total Income" value={"₹ " + analytics.totalIncome } />
            <DelsBox  stroke="green" icon={<Wallet />} label="Net Income" value={"₹ " + analytics.netIncome } />
            <DelsBox  stroke="green" icon={<Wallet />} label="Net Profit" value={"₹ " + analytics.netProfit } />
            <DelsBox  stroke="rgba(103, 232, 249, 0.9)" icon={<ShoppingCart />} label="Total Orders" value={analytics.totalOrders} />
            <DelsBox  stroke="red" icon={<CreditCard />} label="Total Expenses" value={"₹ " + analytics.totalExpense} />
          </div>


          <div className="area-34-container w-full  h-full flex flex-col items-center justify-center gap">
            <div className="area3 w-full h-full rounded-2xl shadow-2xl p-2 ">
              <ProductEfficiencyBox
                      title="Product Performance (Last 30 Days)"
                      data={productStats}
                    />
            </div>
            <div className="area4 h-full w-full rounded-2xl shadow-2xl p-2">
                <Order/>
            </div>

          </div>

    </>

  )
}

export default Shop
