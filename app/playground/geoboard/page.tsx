"use client"

import { Geoboard } from "@/app/playground/geoboard/Geoboard"
import { useGeoboardDragAndDrop } from "@/lib/hooks/useGeoboardDragAndDrop";
import { DndContext, DragOverEvent, pointerWithin } from "@dnd-kit/core";
import { Tray } from "./Tray";
import { Pointer } from "./Pointer";
import { Button, buttonVariants } from "@/components/ui/button";
import { GeoboardState, useAppDispatch } from "@/lib/redux/hooks";
import { clearBoard, toggleFilled } from "@/lib/redux/slices/GeoboardSlice";
import { copyToClipboard, getPolygonArea, getPolygonPointsJSON } from "@/lib/utils";

export default function GeoboardPage() {

  // const { mouseX, mouseY } = useMouseCoords()
  const { polygons } = GeoboardState()
  const dispatch = useAppDispatch()
  const { sensors, handleDragEnd, handleDragOver, handleDragStart } = useGeoboardDragAndDrop()

  const area = polygons.length > 0 ? getPolygonArea(polygons[0]) : -1

  return (
    <DndContext onDragStart={handleDragStart} onDragOver={handleDragOver} onDragEnd={handleDragEnd} collisionDetection={pointerWithin} sensors={sensors}>
      <div className="flex flex-col gap-2 p-4 overflow-hidden h-screen w-screen bg-black items-center justify-center">
        {/* <Pointer /> */}
        <div className="flex w-full justify-center gap-2">
          <Geoboard />
          <Tray />
        </div>
        <div className="flex gap-2 items-center">
          <Button className="w-40" onClick={() => area >= 0 && copyToClipboard(getPolygonPointsJSON(polygons[0]))}>{`Area: ${area}`}</Button>
          <Button className="w-40" onClick={() => dispatch(toggleFilled())}>Fill</Button>
          <Button className="w-40" onClick={() => dispatch(clearBoard())}>Clear</Button>
        </div>
      </div>
    </DndContext>
  );
}
