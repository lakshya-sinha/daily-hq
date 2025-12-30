'use client';
import { redirect } from "next/navigation"
import { useEffect } from "react";

const Page = () => {
  useEffect(() => {
    redirect('/dashboard/worker');
  }, []);

  return (
    <div>..dashboard</div>
  )
}

export default Page;