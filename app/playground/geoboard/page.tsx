"use client"

import { Geoboard } from "@/app/playground/geoboard/Geoboard"
import { useGeoboardDragAndDrop } from "@/lib/hooks/useGeoboardDragAndDrop";
import { DndContext, DragOverEvent, pointerWithin } from "@dnd-kit/core";
import { Tray } from "./Tray";
import { Pointer } from "./Pointer";
import { Button, buttonVariants } from "@/components/ui/button";
import { GeoboardState, useAppDispatch } from "@/lib/redux/hooks";
import { addRandomShape, clearBoard, toggleFilled } from "@/lib/redux/slices/GeoboardSlice";
import { copyToClipboard, getPolygonArea, getPolygonPointsJSON } from "@/lib/utils";
import { Sidebar } from "./Sidebar";

export default function GeoboardPage() {

  // const { mouseX, mouseY } = useMouseCoords()
  const { polygons } = GeoboardState()
  const dispatch = useAppDispatch()
  const { sensors, handleDragEnd, handleDragOver, handleDragStart } = useGeoboardDragAndDrop()

  const area = polygons.length > 0 ? getPolygonArea(polygons[0]) : -1

  return (
    <DndContext onDragStart={handleDragStart} onDragOver={handleDragOver} onDragEnd={handleDragEnd} collisionDetection={pointerWithin} sensors={sensors}>
      <div className="flex gap-2 p-4 overflow-hidden h-screen w-screen bg-black items-center justify-center">
        {/* <Pointer /> */}
        <Sidebar />
        <div className="flex items-center gap-2">
          <Geoboard />
          <Tray />
        </div>
      </div>
    </DndContext>
  );
}
