"use client"

import { useFractionsDragAndDrop } from '@/lib/hooks/useFractionsDragAndDrop';
import { DndContext, pointerWithin } from '@dnd-kit/core';
import { Tray } from './Tray';
import { Sandbox } from './Sandbox';
import { FractionState, useAppDispatch } from '@/lib/redux/hooks';
import { Sidebar } from './Sidebar';

export default function Fractions() {

  const { sensors, handleDragEnd } = useFractionsDragAndDrop()
  const dispatch = useAppDispatch()
  const { labels, scale, fullTray } = FractionState()

  return (
    <DndContext onDragEnd={handleDragEnd} collisionDetection={pointerWithin} sensors={sensors}>
      <div className="min-h-screen flex items-center bg-black p-16 gap-4 overflow-hidden">
        <div className='flex w-full gap-4'>
          <Sidebar />
          <div className="flex items-start gap-4 flex-1">
            <Tray />
            <Sandbox />        
          </div>
        </div>
      </div>
    </DndContext>
  );
}
