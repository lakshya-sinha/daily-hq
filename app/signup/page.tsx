import Signup from "@/components/Signup/Signup"
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Daily HQ | Signup",
  description: "you can signup through this page",
};


const page = () => {
  return (
    <div>
     <Signup />
    </div>
  )
}

export default page