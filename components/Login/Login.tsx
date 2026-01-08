'use client';
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react";
import axios from 'axios';
import toast, { Toaster } from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import {Eye, EyeOff} from 'lucide-react';

interface User {
  email: string,
  password: string
}

const Login = () => {

  const searchParams = useSearchParams()
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const error = searchParams.get('error')
    if (error === 'unauthorized') {
      toast.error('Unauthorized access')
    }
  }, [searchParams])

  const [user, setUser] = useState<User>({
    email: "",
    password: ""
  })

  const LoginUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/login', user);
      toast.success(response.data.message);
      router.push('/dashboard')
    } catch (error: unknown) {
      toast.dismissAll();
      if (error instanceof Error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Cannot login, unknown error")
      }
    }
  }

  return (
    <div className="signup-container w-screen h-screen bg-[url('/images/landing/fancy.png')] bg-cover text-white flex flex-col lg:flex-row lg:justify-between justify-center gap-2 lg:p-20 p-2">
      <Toaster />

      <div className="first flex gap-2 lg:gap-8 flex-col justify-center pl-3 lg:w-[50%]">
        <Link href="/">
          <h1 className="text-3xl lg:text-8xl font-bold">
            <span className="text-primary-blue">Daily</span> HQ
          </h1>
        </Link>

        <h2 className="text-2xl lg:text-5xl font-bold">
          Start Growing Your <br /> Shop&apos;s Profit Today
        </h2>

        <p className="text-sm text-text-secondary">
          Join thousands of shop owners who manage their finance smartly.
        </p>
      </div>

      <div className="second p-2 lg:p-5 lg:w-[40%] flex justify-center items-center">
        <div className="signup-box border-2 border-background-border h-[350px] w-full rounded-xl p-7 flex flex-col justify-between bg-gray-950/80 shadow-lg shadow-black">

          <h1 className="font-bold text-2xl mb-2">Log In</h1>

          <form className="flex flex-col gap-3" onSubmit={LoginUser}>

            <input
              type="text"
              className="bg-[#1c1b1b] shadow-inner px-3 py-2.5 rounded-xl"
              placeholder="Email / Mobile"
              value={user.email}
              onChange={(e) =>
                setUser(prev => ({ ...prev, email: e.target.value }))
              }
            />

            {/* 🔐 Password Field with Show/Hide */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="bg-[#1c1b1b] shadow-inner px-3 py-2.5 rounded-xl w-full pr-12"
                placeholder="Password"
                value={user.password}
                onChange={(e) =>
                  setUser(prev => ({ ...prev, password: e.target.value }))
                }
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-400"
              >
                {showPassword ? <Eye /> : <EyeOff />}
              </button>
            </div>

            <button
              type="submit"
              className="px-4 py-2 bg-primary-blue text-white rounded-2xl shadow-inner"
            >
              Login
            </button>
          </form>

          <Link
            href="/login"
            className="px-4 py-2 border border-background-border rounded-2xl flex gap-2 justify-center"
          >
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
              width={25}
              height={25}
              alt=""
            />
            Login with Google
          </Link>

          <p className="text-center mt-2">
            Not having account?
            <Link href="/signup">
              <span className="text-red-400 underline ml-1">Signup</span>
            </Link>
          </p>

        </div>
      </div>
    </div>
  )
}

export default Login;
