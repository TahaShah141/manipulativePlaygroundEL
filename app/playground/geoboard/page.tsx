"use client"

import { Geoboard } from "@/app/playground/geoboard/Geoboard"
import { useGeoboardDragAndDrop } from "@/lib/hooks/useGeoboardDragAndDrop";
import { DndContext, pointerWithin } from "@dnd-kit/core";
import { Tray } from "./Tray";
import { Pointer } from "./Pointer";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/lib/redux/hooks";
import { toggleFilled } from "@/lib/redux/slices/GeoboardSlice";

export default function GeoboardPage() {

  // const { mouseX, mouseY } = useMouseCoords()
  const dispatch = useAppDispatch()
  const { sensors, handleDragEnd } = useGeoboardDragAndDrop()

  return (
    <DndContext onDragEnd={handleDragEnd} collisionDetection={pointerWithin} sensors={sensors}>
      <div className="flex flex-col gap-2 p-4 overflow-hidden h-screen w-screen bg-black items-center justify-center">
        {/* <Pointer /> */}
        <div className="flex w-full justify-center gap-2">
          <Geoboard />
          <Tray />
        </div>
        <Button onClick={() => dispatch(toggleFilled())}>Fill</Button>
      </div>
    </DndContext>
  );
}
