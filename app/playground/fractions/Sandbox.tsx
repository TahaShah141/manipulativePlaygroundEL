import { useDroppable } from "@dnd-kit/core"
import { FractionBlock, TestBlock } from "./FractionBlock"
import { Fraction } from "@/lib/types"
import { FractionState } from "@/lib/redux/hooks"
import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { FractionValue } from "./FractionValue"
import { rowSum } from "@/lib/utils"
import { CheckIcon, XIcon } from "lucide-react"
type SandboxProps = {
}

type DropRowProps = {
  index: number
  row: Fraction[]
  question: number
}

const DropRow: React.FC<DropRowProps> = ({index, row, question}) => {
  const { scale } = FractionState()
  const { isOver, setNodeRef: dropRef } = useDroppable({ 
    id: `row-${index}`, 
    data: {
      rowIndex: index
    } 
  })

  const sum = rowSum(row)

  return (
    <HoverCard>
      <HoverCardTrigger ref={dropRef} className={`${isOver ? 'bg-neutral-950' : 'bg-neutral-900'} relative min-h-12 flex overflow-x-visible`}>
        {question !== -1 &&
        <>
        <div className={`absolute -right-2 translate-x-full rounded-md top-1/2 -translate-y-1/2 flex justify-center items-center size-8 border-2 ${sum === question ? 'bg-green-500 border-green-400' : 'bg-red-500 border-red-600'}`}>
          {sum === question ? <CheckIcon /> : <XIcon />}
        </div>
        <HoverCard>
          <HoverCardTrigger className={`absolute left-0 top-0 bottom-0 flex justify-center items-center bg-neutral-800 border-r border-white text-white`} style={{width: `${question*(100/scale)}%`}}>
            {/* {(question*100).toFixed(5)} */}
          </HoverCardTrigger>
          <HoverCardContent side="top" className={`flex gap-2 justify-between w-fit text-sm p-1 bg-neutral-700 text-white`}>
            <FractionValue n={question} />
          </HoverCardContent>
        </HoverCard> 
        </>}
        {row.map((f, i) => <FractionBlock fraction={f} key={`key-${i}`} />)}
      </HoverCardTrigger>
      <HoverCardContent side="left" className={`flex gap-2 justify-between w-fit text-sm p-1 bg-neutral-800 text-white`}>
          <FractionValue n={sum} />
      </HoverCardContent>
    </HoverCard>
  )
}

export const Sandbox: React.FC<SandboxProps> = ({}) => {

  const { rows, questions, scale } = FractionState()
  const [gridLines, setGridLines] = useState(defaultGridLines)

  return (
    <div className="flex flex-col gap-2 border bg-stone-900" style={{flex: `${scale} 1 0%`}}>
      <div className="flex relative flex-col">
        {gridLines.map(g => 
          <React.Fragment key={g.value}>{g.value <= scale && <div className={`absolute top-0 bottom-0 w-0 ${g.displayed ? 'border-r border-neutral-500 border-dashed': "border-0"} z-20`} style={{left: `${g.value*(100/scale)}%`}}>
            <div className="relative">
              <Button onClick={() => setGridLines(gridLines.map(gl => ({...gl, displayed: gl.name === g.name ? !gl.displayed : gl.displayed})))} variant={'ghost'} className="absolute top-0 -translate-y-full -translate-x-1/2 text-[8px] size-5 p-1">{g.name}</Button>
            </div>
          </div>}</React.Fragment>
        )}
        {rows.map((row, i) => <DropRow key={`dropRow-${i}`} index={i} row={row} question={questions[i]} />)}
      </div>
    </div>
  )
}


type GridLine = {
  name: string
  value: number
  displayed: boolean
}

const defaultGridLines: GridLine[] = [
  {
    name: "1/10",
    value: 1/10,
    displayed: false
  },
  // {
  //   name: "1/8",
  //   value: 1/8,
  //   displayed: false
  // },
  {
    name: "1/5",
    value: 1/5,
    displayed: false
  },
  {
    name: "1/4",
    value: 1/4,
    displayed: false
  },
  {
    name: "1/3",
    value: 1/3,
    displayed: false
  },
  {
    name: "1/2",
    value: 1/2,
    displayed: false
  },
  {
    name: "3/4",
    value: 3/4,
    displayed: false
  },
  {
    name: "1",
    value: 1,
    displayed: true
  },
  {
    name: "1.5",
    value: 3/2,
    displayed: false
  },
  {
    name: "2",
    value: 2,
    displayed: false
  },
]