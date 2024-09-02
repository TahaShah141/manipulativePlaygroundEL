import Link from "next/link";

export default function Home() {
    
  return (
    <div className="flex h-screen justify-center items-center gap-2">
      <Link className="p-3 rounded-sm text-xl bg-red-500 text-white" href="/playground/baseten">Base 10 Blocks</Link>
      <Link className="p-3 rounded-sm text-xl bg-red-500 text-white" href="/playground/fractions">Fraction Board</Link>
    </div>
  );
}
