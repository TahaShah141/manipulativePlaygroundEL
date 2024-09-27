"use client"

import { useMouseCoords } from "@/lib/hooks/useMouseCoords";
import { Board } from "./Board";

export default function Geoboard() {

  // const { mouseX, mouseY } = useMouseCoords()

  return (
    <div className="flex p-4 overflow-hidden h-screen w-screen bg-black items-center justify-center">
      <Board />
    </div>
  );
}
