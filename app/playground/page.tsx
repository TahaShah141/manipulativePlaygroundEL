"use client"

import {DndContext, DragEndEvent, DragStartEvent, PointerSensor, pointerWithin, useDroppable, useSensor, useSensors} from '@dnd-kit/core';
import React, { useEffect, useState } from "react";
import { BaseTenBlock } from "../components/custom/BaseTenBlock";
import { ChevronLeft } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { shuffleArray } from '@/lib/utils';

type Blocks = (number | number[])[]

type WorkPlaceProps = {
  blocks: Blocks
  deleteBlock: (num: number) => void
}

const groupOnes = (blocks: number[], bound: number): Blocks => {

  let result: Blocks = []
  let count = 0

  for (let num of blocks) {
    if (num === 1) {
      count++
    }
    if (count === bound) {
      result.push(Array(bound).fill(1))
      count = 0
    } 
  }
  if (count !== 0) result.push(Array(count).fill(1))
  
  return result.concat(blocks.filter(n => n !== 1))
}

const WorkPlace: React.FC<WorkPlaceProps> = ({ blocks, deleteBlock }) => {
  
  const { isOver, setNodeRef: dropRef } = useDroppable({ id: 'droppable' })

  return (

    <ScrollArea ref={dropRef} className={`h-[calc(100vh-64px)] rounded-lg p-4 flex-1 ${isOver ? "bg-neutral-700" : "bg-neutral-800"}`}>
      <div className={`rounded-lg flex flex-col`}>
        <div className='gap-2 flex flex-wrap'>
          {blocks.map((block, i) => {
            if (block instanceof Array) {
              return (
                <div className="flex flex-col">
                  {block.map((_, j) => <BaseTenBlock onDelete={deleteBlock} type='ONES' id={`BLOCK-${i}-${j}`} />)}
                </div>
              )
            } else {
              return <BaseTenBlock onDelete={deleteBlock} type={block === 1 ? "ONES" : block === 10 ? "TENS" : "HUNDREDS"} id={`BLOCK-${i}`} />
            }
          })}
        </div>
      </div>
    </ScrollArea>
  )
} 

export default function Playground() {

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
  }

  const randomizeBoard = () => {
    const newBlocks = []
    const ones = Math.floor(Math.random() * 40) + 1
    const tens = Math.floor(Math.random() * 15) + 1
    const hundreds = Math.floor(Math.random() * 7) + 1
    newBlocks.push(Array(ones).fill(1))
    newBlocks.push(Array(tens).fill(10))
    newBlocks.push(Array(hundreds).fill(100))
    setBlocks(shuffleArray(newBlocks.flat()))
  }

  const deleteBlock = (num: number) => {
    let index = blocks.findIndex(b => b === num)
    setBlocks(blocks.filter((b, i) => i !== index))
  }
    
  return (
    <DndContext onDragEnd={handleDragEnd} collisionDetection={pointerWithin} sensors={sensors}>
      <div className="min-h-screen flex items-start bg-black p-8 gap-4">
        <div className="flex flex-col gap-4">
          <div className="bg-neutral-800 rounded-lg flex flex-col gap-4 p-4 w-96">
            <h1 className='text-3xl font-bold font-mono text-white text-center'>Base-10 Blocks</h1>
            <h4 className={`text-center text-7xl font-mono ${hiding && "text-neutral-700"}`}>{hiding ? "???" : (function(arr) {return arr.reduce((sum: number, item: number) => sum + item, 0).toString().padStart(3, '0')})(blocks)}</h4>
            <Button onClick={() => setBlocks([])}>Clear Board</Button>
            <Button onClick={randomizeBoard}>Randomize</Button>
          </div>

          <div className="bg-neutral-900 rounded-lg flex flex-col gap-4 p-4 w-96">
            <Button variant={"secondary"} onClick={() => setHiding(!hiding)}>{`${hiding ? "Show" : "Hide"} Sum`}</Button>
            <Button variant={"secondary"} onClick={() => setSorting(!sorting)}>{`${sorting ? "Disable" : "Enable"} Sorting`}</Button>
            <Button variant={"secondary"} onClick={() => setGrouping(!grouping)}>{`${grouping ? "Disable" : "Enable"} Grouping`}</Button>
          </div>
        </div>
        <WorkPlace deleteBlock={deleteBlock} blocks={displayBlocks} />
        <div className={`fixed bottom-4 left-4 transition-transform duration-500 ${!open && "-translate-x-full"}`}>
          <div className='relative flex gap-4 p-4 bg-neutral-100 rounded-lg'>
            <div onClick={() => setOpen(!open)} className="absolute text-black top-1/2 right-0 translate-x-1/2 flex justify-center items-center -translate-y-1/2 h-full bg-white rounded-lg">
              <ChevronLeft className={`size-7 transition-transform duration-300 delay-200 ${!open && "rotate-180"}`} />
            </div>
            <div className="flex flex-col">
              {Array.from({length: 10}, (_, i) => <BaseTenBlock type="ONES" id={`ONES-${i}`} />)}
            </div>
            <BaseTenBlock type="TENS" id={"TENS"} />
            <BaseTenBlock type="HUNDREDS" id={"HUNDREDS"} />
          </div>
        </div>
      </div>
    </DndContext>
  );
}
