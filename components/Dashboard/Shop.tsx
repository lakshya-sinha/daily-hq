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
    <main className="bg-[url('/images/dashboard/background.png')] w-full h-screen bg-screen text-white flex gap">
      <div className="sidebar  w-[20%]   ">
      <div className="sidebar-container  p-4 h-full flex flex-col justify-between gap-3 bg-gray-950/25 rounded-2xl">
        <div className="first-row border-gray-700 border bg-gray-800/50 backdrop-blur-2xl rounded-2xl">
          <div className="dels-container flex items-center gap-3 p-2 ">
            <div className="first">
              <Image src="/images/landing/logo.png" width={40} height={40} alt="Logo"/>
            </div>
            <div className="second">
              <div className="row1">
                <h1 className="text-xl">Daily HQ</h1>
              </div>
              <div className="row2">
                <p className="text-text-secondary text-sm ">Analytics Dashboard</p>
              </div>
            </div>
          </div>
        </div>
        <div className="second-most-wraper flex-1  flex flex-col gap-2 p-2">
          <div className="second-row">
            <h2 className="text-text-secondary mb-2">MAIN MENU</h2>
            <div className="menu-container flex  flex-col  gap-2">
              <div className="menu-box cursor-pointer flex gap-2  border-gray-700 border p-2 rounded-lg ">

                <div className="icon text-blue-200"><LayoutDashboard /></div>
                <div className="label">Dashboard</div>
              </div>
              <div className="menu-box cursor-pointer flex gap-2 p-2">
                <div className="icon"><NotebookText /></div>
                <div className="label">Orders</div>
              </div>
              <div className="menu-box cursor-pointer flex gap-2 p-2">
                <div className="icon"><ShoppingCart /></div>
                <div className="label">Products</div>
              </div>
              <div className="menu-box cursor-pointer flex gap-2 p-2">
                <div className="icon"><CreditCard /></div>
                <div className="label">Billing</div>
              </div>
              <div className="menu-box cursor-pointer flex gap-2 p-2">
                <div className="icon"><Users /></div>
                <div className="label">Customers</div>
              </div>
            </div>
          </div>
          <div className="third-row">
            <h2 className="mb-2  text-text-secondary">ACCOUNT</h2>
            <div className="menu-container flex flex-col gap-2 ">
              <div className="menu-box cursor-pointer flex gap-2 p-2">
                <div className="icon"><User  /></div>
                <div className="label">My Account</div>
              </div>
              <div className="menu-box cursor-pointer flex gap-2 p-2">
                <div className="icon"><HandHelping /></div>
                <div className="label">Get Help </div>
              </div>
              <div className="menu-box cursor-pointer flex gap-2 p-2">
                <div className="icon"><Settings /></div>
                <div className="label">Settings</div>
              </div>
            </div>
          </div>
          <div className="fourth-row broder-t-gray-600">
            <div className="menu-box cursor-pointer flex gap-2 p-2 mt-2 border-t-gray-400  border-t-1 pt-2">
              <div className="icon"><LogOut /></div>
              <div className="label">Log Out</div>
            </div>
          </div>
        </div>
        <div className="bottom-row  flex items-center gap-2 justify-between p-2">
          <div className="first">
            <Image src="/images/landing/logo.png" width={40} height={40} alt="User"/>
          </div>
          <div className="second text-center">
            <h1 className="text-lg">James Darvin</h1>
            <h2 className="text-text-secondary text-sm">demo@gmail.com</h2>
          </div>
          <div className="third">:</div>
        </div>
      </div>
      </div>
      <div className="main-area  w-[80%] p-1">
        <div className="area-container bg-gray-950/90 rounded-2xl  w-full h-full flex flex-col ">

          <div className="area1 border-b-gray-400 border-b p-2">
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
                      <h1 className="text-lg ">James Darvin</h1>
                      <h2 className="text-text-secondary  ">hello@gmail.com</h2>
                    </div>
                  </div>
              </div>
             
            </div>
          </div>

          <div className="area2 p-3 grid  grid-cols-3 gap-6 items-center justify-center">
            <DelsBox data={monthlyProfit} stroke="green" icon={<Wallet />} label="Total Income" value="$129,555" />
            <DelsBox data={monthlyProfit} stroke="rgba(103, 232, 249, 0.9)" icon={<ShoppingCart />} label="Total Orders" value="1,245" />
            <DelsBox data={monthlyProfit} stroke="red" icon={<CreditCard />} label="Total Expenses" value="867" />
          </div>


          <div className="area-34-container w-full  h-full flex flex-col items-center justify-center gap-4 p-3">
            <div className="area3 bg-red-200 w-full h-full rounded-2xl shadow-2xl p-2 ">sales revenue graph display here </div>
            <div className="area4 bg-red-400 h-full w-full rounded-2xl shadow-2xl p-2">recent order display here</div>
          </div>

        </div>
      </div>
    </main>
  )
}

export default Shop
