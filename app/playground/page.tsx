"use client"

import {DndContext, DragEndEvent, PointerSensor, pointerWithin, useDroppable, useSensor, useSensors} from '@dnd-kit/core';
import React, { useEffect, useState } from "react";
import { groupOnes } from '@/lib/utils';
import { Blocks } from '@/lib/types';
import { Sandbox } from './Sandbox';
import { Tray } from './Tray';
import { Sidebar } from './Sidebar';
import { selectMainState } from '@/lib/redux/store';
import { MainState, useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { testSlice } from '@/lib/redux/slices/mainSlice';

export default function Playground() {

  const { selected } = MainState()
  const dispatch = useAppDispatch()

  const [blocks, setBlocks] = useState<number[]>([])
  const [displayBlocks, setDisplayBlocks] = useState<Blocks>([])

  const [sorting, setSorting] = useState(true)
  const [grouping, setGrouping] = useState(true)
  const [hiding, setHiding] = useState(false)

  const [open, setOpen] = useState(true)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      }
    })
  )

  useEffect(() => {
    grouping ? 
    setDisplayBlocks(groupOnes(sorting ? [...blocks].sort() : blocks, 10)) :
    setDisplayBlocks(sorting ? [...blocks].sort() : blocks)
  }, [blocks, sorting, grouping])

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (!active.data.current || !over || active.id.toString().includes("BLOCK")) return;

    const type = active.data.current.type

    setBlocks(i => [...i, type === "ONES" ? 1 : type === "TENS" ? 10 : 100])
    dispatch(testSlice("Hello World"))
  }

  const deleteBlock = (num: number) => {
    let index = blocks.findIndex(b => b === num)
    setBlocks(blocks.filter((b, i) => i !== index))
  }
    
  return (
    <DndContext onDragEnd={handleDragEnd} collisionDetection={pointerWithin} sensors={sensors}>
      <div className="min-h-screen flex items-start bg-black p-8 gap-4">
        <Sidebar blocks={blocks} setBlocks={setBlocks} hiding={hiding} setHiding={setHiding} sorting={sorting} setSorting={setSorting} grouping={grouping} setGrouping={setGrouping}/>
        <Sandbox deleteBlock={deleteBlock} blocks={displayBlocks} />
        <Tray open={open} setOpen={setOpen} />
      </div>
    </DndContext>
  );
}
