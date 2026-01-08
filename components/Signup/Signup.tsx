'use client';
import Link from "next/link"
import Image from "next/image"
import { useState} from "react";
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from "next/navigation";


interface User {
  fullName: string;
  mobileNo: string;
  email: string;
  address: string;
  shopName: string;
  shopAddress: string;
  password: string;
  isOwner: boolean;
  petName?: string;
}


const Signup = () => {

  const router = useRouter();

  const [user, setUser] = useState<User>({
    fullName: "",
    mobileNo: "",
    email: "",
    address: "",
    shopName: "",
    shopAddress: "",
    password: "",
    isOwner: true,
  });

  const regUser = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log("form submitting....")
      try{
        toast.loading('registering...')

        const response = await axios.post('/api/auth/signup', user);
        console.log('signup success', response.data);
        router.push('/login');

      } catch(error){

           if (axios.isAxiosError(error)) {
              toast.dismissAll()
              const actualError = error.response?.data?.error || "Unknown error";
              toast.error(actualError);
          } else {
              toast.error("Something went wrong");
          } 
      }
  }


  return (
    <div className="signup-container w-screen min-h-screen lg:h-screen bg-[url('/images/landing/fancy.png')] bg-cover text-white flex flex-col lg:flex-row justify-between gap-2 lg:p-20 p-2">

      <Toaster/>

      <div className="first  flex gap-1 lg:gap-8 flex-col justify-center pl-3 lg:w-[50%]">
        <div className="first-line">
          <Link href={'/'}>
           <h1 className="text-3xl lg:text-8xl font-bold "><span className="text-primary-blue">Daily</span> HQ</h1>
          </Link>
        </div>
        <div className="second-line">
          <h2 className="text-2xl lg:text-5xl font-bold">Start Growing Your <br /> Shop&apos;s Profit Today</h2>
        </div>
        <div className="third-line">
          <p className="text-sm text-text-secondary ">Join thousands of shop owners who manage their finance smartly. Create your free account.</p>
        </div>
      </div>

      <div className="second  p-2 lg:p-5 lg:w-[40%] flex justify-center items-center lg:gap-4 gap-2">
        <div className="signup-box border-2 border-background-border w-full rounded-xl lg:p-7 p-5 flex flex-col justify-between bg-gray-950/80 shadow-lg shadow-black">
          <div className="firstl">
            <h1 className="font-bold text-2xl mb-2">Sign Up</h1>
          </div>
          <div className="secondl">
            <form  onSubmit={(e) => regUser(e)} className="flex flex-col gap-2 lg:gap-3 text-white">
              <input type="text" className="bg-[#1c1b1b]  shadow-inner px-3 py-2.5 rounded-xl "  name="fullName" placeholder="Name"
                value={user.fullName}
                onChange={(e)=>{
                  setUser(prev => ({...prev, fullName: e.target.value}))
                }}
              />
              <input type="text" className="bg-[#1c1b1b]  shadow-inner px-3 py-2.5 rounded-xl "  name="mobileNo" placeholder="Mobile No"
                value={user.mobileNo}
                onChange={(e)=>{
                  setUser(prev => ({...prev, mobileNo: e.target.value}))
                }}
              />
              <input type="text" className="bg-[#1c1b1b]  shadow-inner px-3 py-2.5 rounded-xl "  name="email" placeholder="Email Address"
                value={user.email} 
                onChange={(e)=>{
                  setUser(prev => ({...prev, email: e.target.value}))
                }}
              />
              <input type="text" className="bg-[#1c1b1b]  shadow-inner px-3 py-2.5 rounded-xl "  name="address" placeholder="Address"
                value={user.address} 
                onChange={(e)=>{
                  setUser(prev => ({...prev, address: e.target.value}))
                }}
              />
              <input type="text" className="bg-[#1c1b1b]  shadow-inner px-3 py-2.5 rounded-xl "  name="shopName" placeholder="Shop Name"
                value={user.shopName} 
                onChange={(e)=>{
                  setUser(prev => ({...prev, shopName: e.target.value}))
                }}
              />
              <input type="text" className="bg-[#1c1b1b]  shadow-inner px-3 py-2.5 rounded-xl "  name="shopAddress" placeholder="Shop Address"
                value={user.shopAddress} 
                onChange={(e)=>{
                  setUser(prev => ({...prev, shopAddress: e.target.value}))
                }}
              />
              <input type="text" className="bg-[#1c1b1b]  shadow-inner px-3 py-2.5 rounded-xl "  name="password" placeholder="Password"
                value={user.password}
                onChange={(e)=>{
                  setUser(prev => ({...prev, password: e.target.value}))
                }}  
              />
              <input type="text" className="bg-[#1c1b1b]  shadow-inner px-3 py-2.5 rounded-xl "  name="petName" placeholder="Pet Name?"
                value={user.petName}
                onChange={(e)=>{
                  setUser(prev => ({...prev, petName: e.target.value}))
                }}  
              />
              <button className="px-4 py-2 bg-primary-blue text-white text-center  w-full rounded-2xl shadow-inner" type="submit">Create Account</button>
            </form>
          </div>
        <div className="thirdl mt-5 flex flex-col gap-2 ">
            <Link href="/login" className="px-4 py-2  text-white text-center  w-full rounded-2xl shadow-inner border-background-border border flex gap-2 justify-center"><Image src={'https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg'} width={25} height={25} alt=""/>Sign Up with Google</Link>
          </div>
          <div className="fourthl text-center mt-4 text-lg">
            <p>Already have an account? <Link href="/login" ><span className="text-red-400 underline">Login</span></Link></p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Signup