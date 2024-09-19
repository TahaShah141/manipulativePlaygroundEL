"use client"; 

import Link from 'next/link';

export default function Home() {
  const handleDelete = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('myData'); 
      console.log('Data has been deleted!'); 
    }
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center gap-4">
      <div className="flex gap-2">
        <Link className="p-3 rounded-sm text-xl bg-red-500 text-white" href="/playground/baseten">Base 10 Blocks</Link>
        <Link className="p-3 rounded-sm text-xl bg-red-500 text-white" href="/playground/fractions">Fraction Board</Link>
      </div>
      <button
        className="p-3 rounded-sm text-xl bg-red-500 text-white"
        onClick={handleDelete}
      >
        Delete Data
      </button>
    </div>
  );
}
