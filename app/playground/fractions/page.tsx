"use client"

import { useFractionsDragAndDrop } from '@/lib/hooks/useFractionsDragAndDrop';
import { DndContext, DragEndEvent, pointerWithin, useDroppable } from '@dnd-kit/core';
import { Tray } from './Tray';
import { useState } from 'react';
import { Sandbox } from './Sandbox';

export default function Fractions() {

  const { sensors, handleDragEnd } = useFractionsDragAndDrop()

  return (
    <DndContext onDragEnd={handleDragEnd} collisionDetection={pointerWithin} sensors={sensors}>
      <div className="min-h-screen flex items-start bg-black p-8 gap-4 overflow-hidden">
        <Tray />
        <Sandbox />        
      </div>
    </DndContext>
  );
}
