"use client"

import { useBaseTenDragAndDrop } from '@/lib/hooks/useBaseTenDragAndDrop';
import { BaseTenState } from '@/lib/redux/hooks';
import { DndContext, pointerWithin } from '@dnd-kit/core';
import { AdvancedMath } from './AdvancedMath';
import { BasicMath } from './BasicMath';
import { Sandbox } from './Sandbox';
import { Sidebar } from './Sidebar';
import { Supply } from './Supply';
import { Tray } from './Tray';
import { Trivia } from './Trivia';

export default function BaseTen() {

  const { mode, operator } = BaseTenState()
  const { sensors, handleDragEnd } = useBaseTenDragAndDrop()
    
  return (
    <DndContext onDragEnd={handleDragEnd} collisionDetection={pointerWithin} sensors={sensors}>
      <div className="min-h-screen flex items-start bg-black p-2 lg:p-4 xl:p-8 gap-4">
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
