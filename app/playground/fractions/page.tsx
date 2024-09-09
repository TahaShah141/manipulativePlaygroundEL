"use client"

import { useFractionsDragAndDrop } from '@/lib/hooks/useFractionsDragAndDrop';
import { DndContext, DragEndEvent, pointerWithin, useDroppable } from '@dnd-kit/core';
import { Tray } from './Tray';
import { useState } from 'react';
import { Sandbox } from './Sandbox';
import { Button } from '@/components/ui/button';
import { FractionState, useAppDispatch } from '@/lib/redux/hooks';
import { clearRows, toggleFullTray, toggleLabels, toggleScale } from '@/lib/redux/slices/FractionSlice';

export default function Fractions() {

  const { sensors, handleDragEnd } = useFractionsDragAndDrop()
  const dispatch = useAppDispatch()
  const { labels, scale, fullTray } = FractionState()

  return (
    <DndContext onDragEnd={handleDragEnd} collisionDetection={pointerWithin} sensors={sensors}>
      <div className="min-h-screen flex bg-black p-16 gap-4 overflow-hidden">
        <div className='flex w-full flex-col gap-4 justify-center items-center'>
          <h1 className="text-5xl font-mono">Fraction Board</h1>
          <div className="flex gap-4 w-full">
            <Tray />
            <Sandbox />        
          </div>
          <div className='flex gap-2'>
            <Button className='w-72' onClick={() => dispatch(clearRows())}>Clear All</Button>
            <Button className='w-72' onClick={() => dispatch(toggleLabels())}>{`${labels ? "Hide" : "Show"} Labels`}</Button>
            <Button className='w-72' onClick={() => dispatch(toggleScale())}>{scale === 1 ? "Set Large" : "Set Small"}</Button>
            <Button className='w-72' onClick={() => dispatch(toggleFullTray())}>{fullTray ? "Show Less" : "Show Full"}</Button>
          </div>
        </div>
      </div>
    </DndContext>
  );
}
