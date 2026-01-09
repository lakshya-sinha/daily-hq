'use client'
import { useUser } from "@/context/UserContext";

const Worker = () => {
  const loggedUser = useUser();

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
    <main className="flex items-center justify-center flex-col w-full h-full gap-5 mt-10 text-center">
          <h1 className="text-8xl">👋</h1>
          <h1 className="text-4xl font-bold shadow-2xl">Hello, <span className="text-blue-500 bg-black px-2">{loggedUser.fullName}</span></h1>
          <h2 className="text-2xl text-amber-400 shadow-xl bg-black p-2 font-bold" >{loggedUser.shopName}</h2>
    </main>

  )
}

export default Worker