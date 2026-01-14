'use client';

import { ReceiptIndianRupee, BanknoteArrowDown, Coins } from "lucide-react";
import { useUser } from "@/context/UserContext";
import {useMemo, useState } from 'react'
import numberToWords from 'number-to-words';
import { ToWords } from 'to-words';

/* ================= Interfaces ================= */

/* ================= Component ================= */

export default function Page() {
      const loggedUser = useUser();

      const defaultValueNote = {
        500: {
            notes: 0,
            total: 0,
        }, 
        200: {
            notes: 0,
            total: 0
        }, 
        100: {
            notes: 0,
            total: 0
        }, 
        50: {
            notes: 0,
            total: 0
        }, 
        20: {
            notes: 0,
            total: 0
        },
        10: {
            notes: 0,
            total: 0
        },
    }

    const [note, setNote]  = useState(defaultValueNote)

    const updateNotes = (denomination: string | number, count: string | number) => {
    setNote(prev => {
        const value = Number(denomination);
        const notes = Number(count) || 0;

        return {
        ...prev,
        [denomination]: {
            notes,
            total: notes * value
        }
        };
    });
    };

    const totalAmount = useMemo(() => {
    return Object.values(note)
        .reduce((sum, item) => sum + item.total, 0);
    }, [note]);

    const clearNotes = ()=> {
        setNote(defaultValueNote)
    }

    const totalAmountInWord = useMemo(()=>{
        const toWords = new ToWords();
        return toWords.convert(totalAmount);
    }, [totalAmount])

 
  /* ================= UI ================= */

  return (
    <div className="add-user-container mt-4 ">

      {/* ================= Title ================= */}
      <div
        className="
          text-xl flex gap-2 items-center
          border border-white/10 
          bg-gradient-to-r from-black/60 to-black/30
          backdrop-blur-md
          rounded-xl px-4 py-3 mb-3
          text-white shadow-lg
        "
      >
        <div className="title-container flex items-center flex-col w-full">
            <div className="first-row-container flex pb-2 items-center justify-center text-sm lg:text-lg">
                    <ReceiptIndianRupee />
                    <h1> Currency Denomination Counter</h1>
            </div>
        <p className=" p-2 border-t text-xs lg:text-sm text-blue-400 text-center">Enter the quantity of each denomination to calculate total amount</p>
        </div>
      </div>

      {/* ================= Form ================= */}
      <div
        className="
          border border-white/10 
          bg-black/40 backdrop-blur-lg
          rounded-2xl p-1
          shadow-[0_0_40px_rgba(0,0,0,0.6)]
        "
      >
        <div className="main-grid grid lg:grid-cols-2 h-full w-full">
            <div className="first-grid ">

                <div className="title-container border-b flex items-center gap-2 justify-center p-4 text-lg">
                    <BanknoteArrowDown />
                    <h2>Currency Notes</h2>
                </div>
                
                {/* Notes Container  */}
                <div className="notes-container p-2  flex flex-col items-center gap-2">

                    {/* for 500 */}

                    <div className="nsipC grid grid-cols-2 lg:grid-cols-3 items-center gap-2  overflow-hidden p-2">
                        <div className="nsip1">
                        <h2 className="text-sm lg:text-lg"> ₹ 500 Note </h2>
                        </div>
                        <div className="nsip2 flex items-center gap-2">
                            <div className="nsip2h">
                                <input type="text" className="border lg:p-2 p-2 w-20 lg:w-auto" value={note[500].notes}
                                    onChange={(e) => updateNotes(500, e.target.value)}
                                />
                            </div>
                            <div className="nsip2s flex gap-2   ">
                                <h2>₹</h2> <input disabled value={note[500].total} type="number" />
                            </div>
                        </div>
                    </div>
                    
                    {/* for 200 */}

                    <div className="nsipC grid grid-cols-2 lg:grid-cols-3 items-center gap-2  overflow-hidden p-2">
                        <div className="nsip1">
                        <h2 className="text-sm lg:text-lg"> ₹ 200 Note </h2>
                        </div>
                        <div className="nsip2 flex items-center gap-2">
                            <div className="nsip2h">
                                <input type="text" className="border lg:p-2 p-2 w-20 lg:w-auto" value={note[200].notes}
                                    onChange={(e) => updateNotes(200, e.target.value)}
                                />
                            </div>
                            <div className="nsip2s flex gap-2   ">
                                <h2>₹</h2> <input disabled value={note[200].total} type="number" />
                            </div>
                        </div>
                    </div>

                    {/* for 100  */}

                    <div className="nsipC grid grid-cols-2 lg:grid-cols-3 items-center gap-2  overflow-hidden p-2">
                        <div className="nsip1">
                        <h2 className="text-sm lg:text-lg"> ₹ 100 Note </h2>
                        </div>
                        <div className="nsip2 flex items-center gap-2">
                            <div className="nsip2h">
                                <input type="text" className="border lg:p-2 p-2 w-20 lg:w-auto" value={note[100].notes}
                                    onChange={(e) => updateNotes(100, e.target.value)}
                                />
                            </div>
                            <div className="nsip2s flex gap-2   ">
                                <h2>₹</h2> <input disabled value={note[100].total} type="number" />
                            </div>
                        </div>
                    </div>

                    {/* for 50  */}

                    <div className="nsipC grid grid-cols-2 lg:grid-cols-3 items-center gap-2  overflow-hidden p-2">
                        <div className="nsip1">
                        <h2 className="text-sm lg:text-lg"> ₹ 50 Note </h2>
                        </div>
                        <div className="nsip2 flex items-center gap-2">
                            <div className="nsip2h">
                                <input type="text" className="border lg:p-2 p-2 w-20 lg:w-auto" value={note[50].notes}
                                    onChange={(e) => updateNotes(50, e.target.value)}
                                />
                            </div>
                            <div className="nsip2s flex gap-2   ">
                                <h2>₹</h2> <input disabled value={note[50].total} type="number" />
                            </div>
                        </div>
                    </div>

                    {/* for 20 */}

                    <div className="nsipC grid grid-cols-2 lg:grid-cols-3 items-center gap-2  overflow-hidden p-2">
                        <div className="nsip1">
                        <h2 className="text-sm lg:text-lg"> ₹ 20 Note </h2>
                        </div>
                        <div className="nsip2 flex items-center gap-2">
                            <div className="nsip2h">
                                <input type="text" className="border lg:p-2 p-2 w-20 lg:w-auto" value={note[20].notes}
                                    onChange={(e) => updateNotes(20, e.target.value)}
                                />
                            </div>
                            <div className="nsip2s flex gap-2   ">
                                <h2>₹</h2> <input disabled value={note[20].total} type="number" />
                            </div>
                        </div>
                    </div>

                    {/* for 10  */}

                    <div className="nsipC grid grid-cols-2 lg:grid-cols-3 items-center gap-2  overflow-hidden p-2">
                        <div className="nsip1">
                        <h2 className="text-sm lg:text-lg"> ₹ 10 Note </h2>
                        </div>
                        <div className="nsip2 flex items-center gap-2">
                            <div className="nsip2h">
                                <input type="text" className="border lg:p-2 p-2 w-20 lg:w-auto" value={note[10].notes}
                                    onChange={(e) => updateNotes(10, e.target.value)}
                                />
                            </div>
                            <div className="nsip2s flex gap-2   ">
                                <h2>₹</h2> <input disabled value={note[10].total} type="number" />
                            </div>
                        </div>
                    </div>

                </div>                


            </div>
            <div className="second-grid ">

                <div className="title-container border-b flex items-center gap-2 justify-center p-4 text-lg">
                    <Coins />
                    <h2>Calculations</h2>
                </div>

                  {/* Notes Container  */}
                <div className="notes-container p-4 flex  gap-2 ">
                    <h2>Total : </h2>
                    <h1>{totalAmount}</h1>
                </div>


                <div className="notes-container p-4 flex  gap-2 ">
                    <h2>Total In Words: </h2>
                    <h1>{totalAmountInWord}</h1>
                </div>

                <div className="button-container w-full mt-4 flex  justify-between pl-4 pr-4">
                    <button className="border px-6 py-2">Save</button>
                    <button className="border px-6 py-2" onClick={()=> {clearNotes()}}>Clear</button>
                    <button className="border px-6 py-2">More</button>
                </div>

                <div className="blank-space p-4"></div>

           </div>
        </div>


     </div>
        <div className="p-10"></div>

    </div>
  );
}
