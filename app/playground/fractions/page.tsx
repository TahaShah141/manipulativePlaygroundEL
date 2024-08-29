"use client"

import { useFractionsDragAndDrop } from '@/lib/hooks/useFractionsDragAndDrop';
import { DndContext, DragEndEvent, pointerWithin, useDroppable } from '@dnd-kit/core';
import { FractionBlock } from './FractionBlock';
import { Tray } from './Tray';
import { useState } from 'react';
import { Sandbox } from './Sandbox';

export default function Fractions() {

  const { sensors } = useFractionsDragAndDrop()
  const [blocks, setBlocks] = useState<number[]>([])

  const handleDragEnd = (event: DragEndEvent) => {
    const {active, over} = event

    console.log({active})
    console.log({over})

    if (!active || !over || !active.data?.current || active.data.current.source === 'row') return;

    setBlocks(prev => [...prev, active.data.current!.type as number])
  }


  return (
    <DndContext onDragEnd={handleDragEnd} collisionDetection={pointerWithin} sensors={sensors}>
      <div className="min-h-screen flex items-start bg-black p-8 gap-4 overflow-hidden">
        <Tray />
        <Sandbox blocks={blocks}/>        
      </div>
    </DndContext>
  );
}
