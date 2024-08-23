"use client"

import { DndContext, pointerWithin } from '@dnd-kit/core';
import { Sandbox } from './Sandbox';
import { Tray } from './Tray';
import { Sidebar } from './Sidebar';
import { useDragAndDrop } from '@/lib/hooks/useDragAndDrop';
import { MainState } from '@/lib/redux/hooks';
import { Trivia } from './Trivia';

export default function Playground() {

  const { mode } = MainState()
  const { sensors, handleDragEnd } = useDragAndDrop()
    
  return (
    <DndContext onDragEnd={handleDragEnd} collisionDetection={pointerWithin} sensors={sensors}>
      <div className="min-h-screen flex items-start bg-black p-8 gap-4">
        <Sidebar/>
        {mode === 'sandbox' && <Sandbox />}
        {mode === 'trivia' && <Trivia />}
        <Tray />
      </div>
    </DndContext>
  );
}
