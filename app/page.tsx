"use client"
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
    
  return (
    <div className="flex flex-col h-screen justify-center items-center gap-2">
      <Link className="p-3 rounded-sm text-xl bg-red-500 text-white" href="/playground/baseten">Base 10 Blocks</Link>
      <Link className="p-3 rounded-sm text-xl bg-red-500 text-white" href="/playground/fractions">Fraction Board</Link>
      <Button variant={"secondary"} onClick={() => localStorage.clear()}>Clear Persist</Button>
    </div>
  );
}
