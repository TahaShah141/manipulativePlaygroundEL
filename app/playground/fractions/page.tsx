"use client"

import { useFractionsDragAndDrop } from '@/lib/hooks/useFractionsDragAndDrop';
import { DndContext, pointerWithin } from '@dnd-kit/core';
import { Tray } from './Tray';
import { WorkPlace } from './WorkPlace';
import { Sidebar } from './Sidebar';

export default function Fractions() {

  const { sensors, handleDragEnd } = useFractionsDragAndDrop()

  return (
    <DndContext onDragEnd={handleDragEnd} collisionDetection={pointerWithin} sensors={sensors}>
      <div className="h-screen flex items-center bg-black p-16 gap-4 overflow-hidden">
        <div className='flex w-full gap-4'>
          <Sidebar />
          <div className="flex items-start gap-4 flex-1">
            <Tray />
            <WorkPlace />        
          </div>
        </div>
      </div>
    </DndContext>
  );
}
