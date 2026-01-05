import { LogOut, LayoutDashboard, Wallet, NotebookText, ShoppingCart, CreditCard, Users, User,  HandHelping, Settings, Bell, Search } from "lucide-react"
import Image from "next/image"
import DelsBox from "./miniCompo/DelsBox";



const Shop = () => {

    const monthlyProfit = [
      { value: 0 },
      { value: 200 },
      { value: 400 },
      { value: 100 },
      {value: 200},
      { value: 100 },
      { value: 300 },
      { value: 200 },
    ];


  return (
   
    <>
         
          <div className="area2 p-3 grid  grid-cols-3 gap-6 items-center justify-center">
            <DelsBox data={monthlyProfit} stroke="green" icon={<Wallet />} label="Total Income" value="$129,555" />
            <DelsBox data={monthlyProfit} stroke="rgba(103, 232, 249, 0.9)" icon={<ShoppingCart />} label="Total Orders" value="1,245" />
            <DelsBox data={monthlyProfit} stroke="red" icon={<CreditCard />} label="Total Expenses" value="867" />
          </div>


          <div className="area-34-container w-full  h-full flex flex-col items-center justify-center gap-4 p-3">
            <div className="area3 bg-red-200 w-full h-full rounded-2xl shadow-2xl p-2 ">sales revenue graph display here </div>
            <div className="area4 bg-red-400 h-full w-full rounded-2xl shadow-2xl p-2">recent order display here</div>
          </div>
    </>

  )
}

export default Shop
