"use client"

import { useFractionsDragAndDrop } from '@/lib/hooks/useFractionsDragAndDrop';
import { DndContext, DragEndEvent, pointerWithin, useDroppable } from '@dnd-kit/core';
import { Tray } from './Tray';
import { useState } from 'react';
import { Sandbox } from './Sandbox';
import { Button } from '@/components/ui/button';
import { FractionState, useAppDispatch } from '@/lib/redux/hooks';
import { clearRows, toggleLabels } from '@/lib/redux/slices/FractionSlice';

export default function Fractions() {

  const { sensors, handleDragEnd } = useFractionsDragAndDrop()
  const dispatch = useAppDispatch()
  const { labels } = FractionState()

  return (
    <DndContext onDragEnd={handleDragEnd} collisionDetection={pointerWithin} sensors={sensors}>
      <div className="min-h-screen flex bg-black p-8 gap-4 overflow-hidden">
        <div className='flex w-full flex-col gap-4 justify-center items-center'>
          <div className="flex gap-4 w-full">
            <Tray />
            <Sandbox />        
          </div>
          <div className='flex gap-2'>
            <Button className='w-72' onClick={() => dispatch(clearRows())}>Clear All</Button>
            <Button className='w-72' onClick={() => dispatch(toggleLabels())}>{`${labels ? "Hide" : "Show"} Labels`}</Button>
          </div>
        </div>
      </div>
    </DndContext>
  );
}
