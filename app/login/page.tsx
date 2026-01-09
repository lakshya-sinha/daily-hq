import Login from "@/components/Login/Login"
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Daily HQ | Login",
  description: "you can login through this page",
};


const page = () => {
  return (
    <Suspense fallback={null}>
      <Login />
    </Suspense>
  )
}

export default page