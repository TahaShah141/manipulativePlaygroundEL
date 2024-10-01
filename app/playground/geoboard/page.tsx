"use client"

import { Geoboard } from "@/app/playground/geoboard/Geoboard"
import { useGeoboardDragAndDrop } from "@/lib/hooks/useGeoboardDragAndDrop";
import { DndContext, pointerWithin } from "@dnd-kit/core";
import { Tray } from "./Tray";
import { Pointer } from "./Pointer";

export default function GeoboardPage() {

  // const { mouseX, mouseY } = useMouseCoords()
  const { sensors, handleDragEnd } = useGeoboardDragAndDrop()

  return (
    <DndContext onDragEnd={handleDragEnd} collisionDetection={pointerWithin} sensors={sensors}>
      <div className="flex gap-2 p-4 overflow-hidden h-screen w-screen bg-black items-center justify-center">
        {/* <Pointer /> */}
        <Geoboard />
        <Tray />
      </div>
    </DndContext>
  );
}
