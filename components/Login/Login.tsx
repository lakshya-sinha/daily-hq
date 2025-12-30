import Link from "next/link"
import Image from "next/image"
import { ArrowRightToLine } from "lucide-react"

const Login = () => {
  return (
      <div className="signup-container w-screen h-screen bg-[url('/images/landing/fancy.png')] bg-cover text-white flex justify-between gap-2 p-20 ">

      <div className="first  flex gap-8 flex-col justify-center pl-3 w-[50%]">
        <div className="first-line">
          <h1 className="text-8xl font-bold "><span className="text-primary-blue">Daily</span> HQ</h1>
        </div>
        <div className="second-line">
          <h2 className="text-5xl font-bold">Start Growing Your <br /> Shop&apos;s Profit Today</h2>
        </div>
        <div className="third-line">
          <p className="text-lg text-text-secondary ">Join thousands of shop owners who manage their finance smartly. Create your free account.</p>
        </div>
      </div>

      <div className="second  p-5 w-[40%] flex justify-center items-center gap-4 ">
        <div className="signup-box border-2 border-background-border h-[350px] w-full rounded-xl p-7 flex flex-col justify-between bg-gray-950/80 shadow-lg shadow-black">
          <div className="firstl">
            <h1 className="font-bold text-2xl mb-2">Log In</h1>
          </div>
          <div className="secondl">
            <form action="" className="flex flex-col gap-3 text-white">
              <input type="text" className="bg-[#1c1b1b]  shadow-inner px-3 py-2.5 rounded-xl "  placeholder="Email/Mobile "/>
              <input type="text" className="bg-[#1c1b1b]  shadow-inner px-3 py-2.5 rounded-xl "  placeholder="Password"/>
            </form>
          </div>
        <div className="thirdl mt-5 flex flex-col gap-2 ">
            <Link href="/login" className="px-4 py-2 bg-primary-blue text-white text-center  w-full rounded-2xl shadow-inner "> Login </Link>
            <Link href="/login" className="px-4 py-2  text-white text-center  w-full rounded-2xl shadow-inner border-background-border border flex gap-2 justify-center"><Image src={'https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg'} width={25} height={25} alt=""/>LogIn  with Google</Link>
          </div>
          <div className="fourthl text-center mt-4 text-lg">
            <p>Not having account? <Link href="/signup" ><span className="text-red-400 underline">Signup</span></Link></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login