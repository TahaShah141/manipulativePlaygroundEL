"use client"

import { DndContext, pointerWithin } from '@dnd-kit/core';
import { Sandbox } from './Sandbox';
import { Tray } from './Tray';
import { Sidebar } from './Sidebar';
import { useDragAndDrop } from '@/lib/hooks/useDragAndDrop';
import { MainState } from '@/lib/redux/hooks';
import { Trivia } from './Trivia';
import { BasicMath } from './BasicMath';
import { AdvancedMath } from './AdvancedMath';
import { Supply } from './Supply';

export default function Playground() {

  const { mode, operator } = MainState()
  const { sensors, handleDragEnd } = useDragAndDrop()
    
  return (
    <DndContext onDragEnd={handleDragEnd} collisionDetection={pointerWithin} sensors={sensors}>
      <div className="min-h-screen flex items-start bg-black p-8 gap-4">
        <Sidebar/>
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
