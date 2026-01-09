'use client';

import { useUser } from "@/context/UserContext";
import { Mail, Phone, MapPin, Store } from "lucide-react";

export default function Worker() {
  const loggedUser = useUser();

  return (
    <main className="flex flex-col items-center w-full h-full  mt-10 gap-8 text-center text-white ">

      {/* 👋 Welcome */}
      <div className="flex flex-col gap-3">
        <h1 className="text-8xl">👋</h1>

        <h1 className="text-4xl font-bold">
          Hello,&nbsp;
          <span className="text-blue-500 bg-black px-3 py-1 rounded-lg shadow-lg">
            {loggedUser.fullName}
          </span>
        </h1>

        <h2 className="text-xl text-amber-400 bg-black px-4 py-2 rounded-xl font-semibold shadow-md">
          {loggedUser.shopName}
        </h2>
      </div>

      {/* 📊 Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 w-full max-w-3xl px-4">

        {/* Email */}
        <div className="flex items-center gap-4 p-4 rounded-2xl
          bg-black/40 backdrop-blur-lg
          border border-white/10 shadow-lg">
          <Mail className="text-blue-400" />
          <div className="text-left">
            <p className="text-sm text-white/60">Email</p>
            <p className="font-medium">{loggedUser.email}</p>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-center gap-4 p-4 rounded-2xl
          bg-black/40 backdrop-blur-lg
          border border-white/10 shadow-lg">
          <Phone className="text-green-400" />
          <div className="text-left">
            <p className="text-sm text-white/60">Mobile</p>
            <p className="font-medium">{loggedUser.mobileNo}</p>
          </div>
        </div>

        {/* Address */}
        <div className="flex items-center gap-4 p-4 rounded-2xl
          bg-black/40 backdrop-blur-lg
          border border-white/10 shadow-lg">
          <MapPin className="text-red-400" />
          <div className="text-left">
            <p className="text-sm text-white/60">Address</p>
            <p className="font-medium">{loggedUser.address}</p>
          </div>
        </div>

        {/* Shop Address */}
        <div className="flex items-center gap-4 p-4 rounded-2xl
          bg-black/40 backdrop-blur-lg
          border border-white/10 shadow-lg">
          <Store className="text-purple-400" />
          <div className="text-left">
            <p className="text-sm text-white/60">Shop Location</p>
            <p className="font-medium">{loggedUser.shopAddress}</p>
          </div>
        </div>

      </div>

      {/* Footer hint */}
      <p className="text-white/40 text-sm mt-6">
        Welcome back! You can manage your orders and expenses from the sidebar.
      </p>

    </main>
  );
}
