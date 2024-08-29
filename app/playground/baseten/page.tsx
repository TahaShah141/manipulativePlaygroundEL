"use client"

import { DndContext, pointerWithin } from '@dnd-kit/core';
import { useDragAndDrop } from '@/lib/hooks/useDragAndDrop';
import { BaseTenState } from '@/lib/redux/hooks';
import { AdvancedMath } from './AdvancedMath';
import { BasicMath } from './BasicMath';
import { Sandbox } from './Sandbox';
import { Supply } from './Supply';
import { Tray } from './Tray';
import { Trivia } from './Trivia';
import { Sidebar } from './Sidebar';

export default function Playground() {

  const { mode, operator } = BaseTenState()
  const { sensors, handleDragEnd } = useDragAndDrop()
    
  return (
    <DndContext onDragEnd={handleDragEnd} collisionDetection={pointerWithin} sensors={sensors}>
      <div className="min-h-screen flex items-start bg-black p-8 gap-4">
        <Sidebar />
        {mode === 'sandbox' && <Sandbox />}
        {mode === 'trivia' && <Trivia />}
        {mode === 'basic maths' && <BasicMath />}
        {mode === 'advanced maths' && <AdvancedMath />}
        {!(mode === 'advanced maths' && operator === '/') && <Tray />}
        {mode === 'advanced maths' && operator === '/' && <Supply />}
      </div>
    </DndContext>
  );
}
