'use client';

import { UserRoundPlus } from "lucide-react";
import { useState, useEffect, FormEvent } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useUser } from "@/context/UserContext";
import Link from "next/link";

/* ================= Interfaces ================= */



interface FormData {
  _id: string;
  worker: string;

  name: string;
  gender: string;

  dob: string;
  dobInWords: string;

  placeOfBirth: string;

  fatherName: string;
  motherName: string;

  fatherAadhar: string;
  motherAadhar: string;

  childAddress: string;
  parentAddress: string;
}


function dateToWords(dateStr: string) {
  if (!dateStr) return "";

  const [yyyy, mm, dd] = dateStr.split("-").map(Number);

  const days = [
    "", "FIRST", "SECOND", "THIRD", "FOURTH", "FIFTH",
    "SIXTH", "SEVENTH", "EIGHTH", "NINTH", "TENTH",
    "ELEVENTH", "TWELFTH", "THIRTEENTH", "FOURTEENTH",
    "FIFTEENTH", "SIXTEENTH", "SEVENTEENTH", "EIGHTEENTH",
    "NINETEENTH", "TWENTIETH", "TWENTY-FIRST", "TWENTY-SECOND",
    "TWENTY-THIRD", "TWENTY-FOURTH", "TWENTY-FIFTH",
    "TWENTY-SIXTH", "TWENTY-SEVENTH", "TWENTY-EIGHTH",
    "TWENTY-NINTH", "THIRTIETH", "THIRTY-FIRST"
  ];

  const months = [
    "", "JANUARY", "FEBRUARY", "MARCH", "APRIL",
    "MAY", "JUNE", "JULY", "AUGUST",
    "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
  ];

  const yearToWords = (year: number) => {
    const ones = ["", "ONE", "TWO", "THREE", "FOUR", "FIVE", "SIX", "SEVEN", "EIGHT", "NINE"];
    const teens = ["TEN", "ELEVEN", "TWELVE", "THIRTEEN", "FOURTEEN", "FIFTEEN", "SIXTEEN", "SEVENTEEN", "EIGHTEEN", "NINETEEN"];
    const tens = ["", "", "TWENTY", "THIRTY", "FORTY", "FIFTY", "SIXTY", "SEVENTY", "EIGHTY", "NINETY"];

    let result = "";

    if (year >= 1000) {
      result += ones[Math.floor(year / 1000)] + " THOUSAND ";
      year %= 1000;
    }
    if (year >= 100) {
      result += ones[Math.floor(year / 100)] + " HUNDRED ";
      year %= 100;
    }
    if (year >= 10 && year < 20) {
      result += teens[year - 10];
    } else {
      result += tens[Math.floor(year / 10)];
      if (year % 10 !== 0) result += " " + ones[year % 10];
    }
    return result.trim();
  };

  return `${days[dd]}-${months[mm]}-${yearToWords(yyyy)}`;
}


/* ================= Component ================= */

export default function Page() {
  const loggedUser = useUser();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    _id: "",
    worker: "",
    name: "",
    gender: "",

    dob: "",
    dobInWords: "",

    placeOfBirth: "",

    fatherName: "",
    motherName: "",

    fatherAadhar: "",
    motherAadhar: "",

    childAddress: "",
    parentAddress: "",
  });

  const [fetchData, setFetchData] = useState<FormData[]>([]);

  useEffect(()=> {console.log(fetchData)}, [fetchData])

  /* ================= Set Worker ================= */

  useEffect(() => {
    if (!loggedUser?._id) return;

    setFormData(prev => ({
      ...prev,
      worker: loggedUser._id,
    }));
  }, [loggedUser?._id]);

  /* ================= Submit ================= */

  const saveBirth = async (e: FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    try {
      const res = await axios.post('/api/worker/birth/add', formData);  
      console.log(res);
      toast.success('data added');
    } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data?.message || "Request failed");
        } else {
          toast.error("Unable to add birth data");
        }
    }
  }

  /* ================= Fetch Order ================= */

  const fetchBirth = async() => {

    const params: any = {
        workerName: loggedUser.fullName,
        shopName: loggedUser.shopName,
    };

     if (!loggedUser?.shopName) return;
    try {
      const res = await axios.get('/api/worker/birth/fetch', {params})
      setFetchData(res.data.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Request failed");
      } else {
        toast.error("Unable to add birth data");
      }
    }
  }

  useEffect(()=>{
    fetchBirth();
  }, [loggedUser])
  

  /* ================= UI ================= */

  return (
    <div className="add-user-container mt-4 p-2">
      <Toaster />

      <div className="text-xl flex gap-2 items-center text-white mb-3 border-b">
        <UserRoundPlus />
        <h1>Add Birth </h1>
      </div>

      <form
        onSubmit={(e)=>{saveBirth(e)}}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white"
      >


        {/* Name */}
        <input
          placeholder="Child Name"
          value={formData.name}
          onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
          className="input border p-2"
        />

        {/* Gender */}
        <select
          value={formData.gender}
          onChange={e => setFormData(prev => ({ ...prev, gender: e.target.value }))}
          className="input border p-2 text-amber-600"
        >
          <option value="">Select Gender</option>
          <option value="male ">Male</option>
          <option value="female ">Female</option>
        </select>

        {/* DOB */}
        <input
            type="date"
            value={formData.dob}
            onChange={e => {
              const dob = e.target.value;
              setFormData(prev => ({
                ...prev,
                dob,
                dobInWords: dateToWords(dob),
              }));
            }}
            className="input border p-2"
        />

        {/* DOB in Words */}
        <input
          placeholder="DOB in Words"
          value={formData.dobInWords}
          className="input border p-2   cursor-not-allowed"
        />


        {/* Place of Birth */}
        <input
          placeholder="Place of Birth"
          value={formData.placeOfBirth}
          onChange={e => setFormData(prev => ({ ...prev, placeOfBirth: e.target.value }))}
          className="input border p-2"
        />

        {/* Father Name */}
        <input
          placeholder="Father Name"
          value={formData.fatherName}
          onChange={e => setFormData(prev => ({ ...prev, fatherName: e.target.value }))}
          className="input border p-2"
        />

        {/* Mother Name */}
        <input
          placeholder="Mother Name"
          value={formData.motherName}
          onChange={e => setFormData(prev => ({ ...prev, motherName: e.target.value }))}
          className="input border p-2"
        />

        {/* Father Aadhaar */}
        <input
          placeholder="Father Aadhaar"
          value={formData.fatherAadhar}
          onChange={e => setFormData(prev => ({ ...prev, fatherAadhar: e.target.value }))}
          className="input border p-2"
        />

        {/* Mother Aadhaar */}
        <input
          placeholder="Mother Aadhaar"
          value={formData.motherAadhar}
          onChange={e => setFormData(prev => ({ ...prev, motherAadhar: e.target.value }))}
          className="input border p-2"
        />

        {/* Child Address */}
        <textarea
          placeholder="Child Address"
          value={formData.childAddress}
          onChange={e => setFormData(prev => ({ ...prev, childAddress: e.target.value }))}
          className="input col-span-2 border p-2"
        />

        {/* Parent Address */}
        <textarea
          placeholder="Parent Address"
          value={formData.parentAddress}
          onChange={e => setFormData(prev => ({ ...prev, parentAddress: e.target.value }))}
          className="input col-span-2 border p-2"
        />

       

        <button
          type="submit"
          disabled={isSubmitting}
          className="col-span-2 bg-blue-600 py-3 rounded-xl "
          onClick={()=>{fetchBirth()}}  
        >
          {isSubmitting ? "Adding..." : "Add Birth"}
        </button>

      </form>

        {/* ================= Birth List ================= */}

        <div className="mt-10 mb-20">
          <h2 className="text-lg font-semibold text-white mb-3 border-b pb-1">
            Birth Records
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border border-white/20 text-sm text-white">
              <thead className="bg-white/10">
                <tr>
                  <th className="border px-3 py-2 text-left">Name</th>
                  <th className="border px-3 py-2 text-left">Gender</th>
                  <th className="border px-3 py-2 text-left">Father Name</th>
                  <th className="border px-3 py-2 text-left">DOB</th>
                  <th className="border px-3 py-2 text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {fetchData.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="border px-3 py-4 text-center text-white/60"
                    >
                      No records found
                    </td>
                  </tr>
                ) : (
                  fetchData.map((item) => (
                    <tr
                      key={item._id}
                      className="hover:bg-white/5 transition"
                    >
                      <td className="border px-3 py-2">{item.name}</td>
                      <td className="border px-3 py-2 capitalize">{item.gender}</td>
                      <td className="border px-3 py-2">{item.fatherName}</td>
                      <td className="border px-3 py-2">
                        {new Date(item.dob).toLocaleDateString()} 
                      </td>
                      <td className="border px-3 py-2 text-center space-x-2">
                        <button
                          className="px-3 py-1 bg-yellow-500 rounded text-black text-xs cursor-pointer"
                        >
                          Edit
                        </button>

                        <button
                          className="px-3 py-1 bg-green-600 rounded text-white text-xs cursor-pointer"
                          title={"print: " + item._id}
                        >
                          <Link href={"/print/birth/" + item._id} target="_blank">
                            Print
                          </Link>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>




    </div>
  );
}
