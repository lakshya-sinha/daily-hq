'use client'
import { UserRoundPlus } from "lucide-react";
import { useState, useEffect} from "react";
import axios from 'axios';
import toast, {Toaster }   from 'react-hot-toast';
import { useUser } from '@/context/UserContext'



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

interface Props {
  
}

const addUser: React.FC<Props> = ({  }) => {

    const loggedUser = useUser()

  

  const [user, setUser] = useState<User>({
    fullName: "",
    mobileNo: "",
    email: "",
    address: "",
    shopName: "", 
    shopAddress: "",
    password: "",
    isOwner: false,
  });

 useEffect(() => {
    if (!loggedUser.shopName) return

    setUser(prev => ({
      ...prev,
      shopName: loggedUser.shopName,
      shopAddress: loggedUser.shopAddress,
    }))

  }, [loggedUser])

  const addUser = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const res = await axios.post('/api/signup', user);
      console.log(res);
      toast.dismissAll();
      toast.success(res.data.message);
    } catch (error: unknown) {
      if(error instanceof Error){
        toast.error(error.message); 
      }
      toast.error("unable to add user ");
    }
  }

  return (
      <div className="add-user-container w-full mt-2  w-full p-2">
        <Toaster/> 
        <div className="title-container text-2xl flex gap-2 items-center border p-2 mb-2">
          <UserRoundPlus />
          <h1>Add New Worker</h1>
        </div>
        <div className="new-user-container border p-2">
           <form onSubmit={(e) => {addUser(e)}}  className="flex flex-col gap-2 lg:gap-3 text-white">
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
      </div>
  );
};

export default addUser;