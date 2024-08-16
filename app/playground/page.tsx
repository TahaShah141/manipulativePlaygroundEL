"use client"

import { Card } from "@/components/ui/card";
import {DndContext, DragEndEvent, pointerWithin, useDroppable} from '@dnd-kit/core';
import React, { useState } from "react";
import { BaseTenBlock } from "../components/custom/BaseTenBlock";

type DroppableProps = {
  items: number[]
}

const Droppable: React.FC<DroppableProps> = ({items}) => {

  const { isOver, setNodeRef: dropRef } = useDroppable({id: 'droppable'})

  return (
    <Card ref={dropRef} className={`p-2 flex-1 h-full flex flex-col justify-center items-center font-bold capitalize text-2xl ${isOver ? "bg-green-500" : "bg-neutral-300"}`}>
      <div className="flex flex-wrap gap-2 justify-center">
        {items.sort((a, b) => a - b).map((item) => <Card className={`size-20 flex justify-center items-center bg-black text-white`} >{item}</Card>)}
      </div>
    </Card>
  )
}

type DraggableProps = {
  index: number
  child: number
}

export default function Playground() {

  const [items, setItems] = useState<number[]>([])

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (!active.data.current || !over) return;

    const type = active.data.current.type

    setItems(i => [...i, type === "ONES" ? 1 : type === "TENS" ? 10 : 100])
  }
    
  return (
    <DndContext onDragEnd={handleDragEnd} collisionDetection={pointerWithin}>
      <div className="h-screen flex p-8 bg-black justify-center gap-8 items-center">

        <Card className="p-2 flex-1 h-full flex gap-2 items-center justify-center font-bold capitalize text-2xl">
          <div className="flex gap-2 items-end">
            <BaseTenBlock type="ONES" data={{type: "ONES"}} id={1} />
            <BaseTenBlock type="TENS" data={{type: "TENS"}} id={10} />
            <BaseTenBlock type="HUNDREDS" data={{type: "HUNDREDS"}} id={100} />
          </div>
        </Card>
        <Droppable items={items} />
      </div>
    </DndContext>
  );
}
