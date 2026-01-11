'use client'
import { UserRoundPlus, UsersRound, Trash, Pencil } from "lucide-react";
import { useState, useEffect} from "react";
import axios from 'axios';
import toast, {Toaster }   from 'react-hot-toast';
import { useUser } from '@/context/UserContext'



interface User {
  _id?: string;
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

   const [worker, setWorker] = useState<User[]>([])


 useEffect(() => {
    if (!loggedUser.shopName) return

    setUser(prev => ({
      ...prev,
      shopName: loggedUser.shopName,
      shopAddress: loggedUser.shopAddress,
    }))

   
  }, [loggedUser])

  async function fetchUser(){
      const shopName = {shopName: user.shopName}
      const data = await axios.post('/api/admin/worker/fetch', shopName);
      const workerData = data.data.data;
      setWorker(workerData);
  }

  useEffect(()=>{
    if (!user.shopName) return;
    fetchUser();
  }, [user.shopName])

  const addUser = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault(); 
      const res = await axios.post('/api/auth/signup', user);
      setWorker(prev => ([...prev, user]))
      toast.dismissAll();
      toast.success(res.data.message);
      fetchUser();
    } catch (error: unknown) {
      if(error instanceof Error){
        toast.error(error.message); 
      }
      toast.error("unable to add user ");
    }
  }

  const deleteUser = async (deleteUserId: string)=>{
    try {
      const res = await axios.delete('/api/admin/worker/delete', {
        params: {
          UserId: deleteUserId
        }
      })
      toast.success(res.data.message);
      console.log(res);
      fetchUser();
    } catch (error: unknown) {
     if(error instanceof Error){
      toast.error(error.message);
     }
     toast.error("unable to delete user")
    }
  }

  return (

      <div className="add-user-container mt-4 p-2">

  <Toaster /> 

  {/* ================= Add New Worker ================= */}
  <div className="title-container text-xl flex gap-2 items-center 
    border border-white/10 
    bg-gradient-to-r from-black/60 to-black/30
    backdrop-blur-md
    rounded-xl px-4 py-3 mb-3
    text-white shadow-lg">
    <UserRoundPlus />
    <h1>Add New Worker</h1>
  </div>

  <div className="
    new-user-container
    border border-white/10 
    bg-black/40 backdrop-blur-lg
    rounded-2xl p-4
    shadow-[0_0_40px_rgba(0,0,0,0.6)]
  ">
    <form
      onSubmit={(e) => { addUser(e) }}
      className="flex flex-col gap-3 text-white"
    >

      {/* Inputs */}
      {[
        { name: "fullName", placeholder: "Name", value: user.fullName },
        { name: "mobileNo", placeholder: "Mobile No", value: user.mobileNo },
        { name: "email", placeholder: "Email Address", value: user.email },
        { name: "address", placeholder: "Address", value: user.address },
        { name: "password", placeholder: "Password", value: user.password },
        { name: "petName", placeholder: "Pet Name?", value: user.petName },
      ].map((field, i) => (
        <input
          key={i}
          type="text"
          name={field.name}
          placeholder={field.placeholder}
          value={field.value}
          onChange={(e) =>
            setUser((prev) => ({ ...prev, [field.name]: e.target.value }))
          }
          className="
            bg-neutral-900/80
            border border-white/10
            focus:border-primary-blue
            focus:ring-2 focus:ring-primary-blue/40
            px-4 py-3 rounded-xl
            placeholder:text-gray-400
            text-white
            transition-all duration-200
            shadow-inner outline-none
          "
        />
      ))}

      {/* Button */}
      <button
        type="submit"
        className="
          px-4 py-3 w-full rounded-2xl
          bg-gradient-to-r from-primary-blue to-blue-500
          hover:brightness-110 active:scale-[0.98]
          transition-all duration-200
          text-white font-medium
        "
      >
        Create Account
      </button>
    </form>
  </div>

  {/* ================= All Workers ================= */}
  <div className="user-container mt-4">
    <div className="title-container text-xl flex gap-2 items-center 
      border border-white/10 
      bg-gradient-to-r from-black/60 to-black/30
      backdrop-blur-md
      rounded-xl px-4 py-3 mb-3
      text-white shadow-lg">
      <UsersRound />
      <h1>All Company Workers</h1>
    </div>

    <div className="
      relative overflow-x-auto
      bg-black/40 backdrop-blur-lg
      border border-white/10
      rounded-2xl
      shadow-[0_0_40px_rgba(0,0,0,0.6)]
    ">
      <table className="w-full text-sm text-left text-gray-200">
        <thead className="
          text-sm text-gray-300
          bg-black/60 backdrop-blur
          border-b border-white/10
        ">
          <tr>
            <th className="px-6 py-3 font-medium">Name</th>
            <th className="px-6 py-3 font-medium">Email</th>
            <th className="px-6 py-3 font-medium">Mobile No</th>
            <th className="px-6 py-3 font-medium">Address</th>
            <th className="px-6 py-3 font-medium">Operations</th>
          </tr>
        </thead>

        <tbody>
          {worker ? (
            worker.map((value, index) => (
              <tr
                key={index}
                className="
                  bg-transparent
                  border-b border-white/5
                  hover:bg-white/5
                  transition-colors duration-150
                "
              >
                <th className="px-6 py-4 font-medium text-white whitespace-nowrap">
                  {value.fullName}
                </th>
                <td className="px-6 py-4">{value.email}</td>
                <td className="px-6 py-4">{value.mobileNo}</td>
                <td className="px-6 py-4">{value.address}</td>
                <td className="px-6 py-4 flex items-center gap-3 text-sm">
                  <Pencil className="text-blue-300 hover:text-blue-400 transition cursor-pointer" />
                  <Trash className="text-red-400 hover:text-red-500 transition cursor-pointer" onClick={()=>{deleteUser(value._id || "")}}/>
                  <p>{value._id}</p>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="px-6 py-6 text-center text-gray-400">
                Loading...
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>

</div>

  );
};

export default addUser;