import { useDroppable } from "@dnd-kit/core"
import { FractionBlock } from "./FractionBlock"
import { Fraction, NumberFraction } from "@/lib/types"
import { FractionState, useAppDispatch } from "@/lib/redux/hooks"
import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { FractionValue } from "./FractionValue"
import { rowSum } from "@/lib/utils"
import { ArrowBigDown, ArrowBigUp, CheckIcon, Equal, XIcon } from "lucide-react"
import { composeFraction, getFractionArraySum, getFractionString } from "@/lib/fractions"
import { ChosenChoices, setChosenOperator } from "@/lib/redux/slices/FractionSlice"

type WorkPlaceProps = {
}

type DropRowProps = {
  index: number
  row: Fraction[]
  question: NumberFraction[]
}

const DropRow: React.FC<DropRowProps> = ({index, row, question}) => {
  const { scale, mode } = FractionState()
  const { isOver, setNodeRef: dropRef } = useDroppable({ 
    id: `row-${index}`, 
    data: {
      rowIndex: index
    } 
  })

  const sum = rowSum(row)
  const questionSum = getFractionArraySum(question)

  const questionFraction = composeFraction(question)

  return (
    <HoverCard>
      <HoverCardTrigger ref={dropRef} className={`${isOver ? 'bg-neutral-950' : 'bg-neutral-900'} relative min-h-12 flex overflow-x-visible`}>
        {mode !== 'sandbox' &&
        <>
        <div className={`absolute -right-2 translate-x-full rounded-md top-1/2 -translate-y-1/2 flex justify-center items-center size-8 border-2 ${sum === questionSum ? 'bg-green-500 border-green-400' : 'bg-red-500 border-red-600'}`}>
          {sum === questionSum ? <CheckIcon /> : <XIcon />}
        </div>
        <HoverCard>
          {mode !== 'comparisons' && 
          <HoverCardTrigger className={`absolute left-0 top-0 bottom-0 flex justify-center items-center bg-neutral-800 border-r border-white text-white`} style={{width: `${questionSum*(100/scale)}%`}}>
            {getFractionString(questionFraction)}
          </HoverCardTrigger>}
          <HoverCardContent side="top" className={`flex gap-2 justify-between w-fit text-sm p-1 bg-neutral-700 text-white`}>
            <FractionValue n={questionSum} />
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

export const WorkPlace: React.FC<WorkPlaceProps> = ({}) => {

  const { rows, questions, scale, mode, chosen } = FractionState()
  const dispatch = useAppDispatch()
  const [gridLines, setGridLines] = useState(defaultGridLines)

  const questionValues = questions.map(q => getFractionString(composeFraction(q)))
  const allCorrect = questions.every((q, i) => rowSum(rows[i]) === getFractionArraySum(q))

  return (
    <div className="flex flex-col gap-2 h-full" style={{flex: `${scale} 1 0%`}}>
      <div className={`flex relative flex-col ${mode === 'comparisons' ? "h-full justify-between" : ""}`}>
        {gridLines.map(g => 
          <React.Fragment key={g.value}>{g.value <= scale && <div className={`absolute top-0 bottom-0 w-0 ${g.displayed ? 'border-r border-neutral-500 border-dashed': "border-0"} z-20`} style={{left: `${g.value*(100/scale)}%`}}>
            <div className="relative">
              <Button onClick={() => setGridLines(gridLines.map(gl => ({...gl, displayed: gl.name === g.name ? !gl.displayed : gl.displayed})))} variant={'ghost'} className="absolute top-0 -translate-y-full -translate-x-1/2 text-[8px] size-5 p-1">{g.name}</Button>
            </div>
          </div>}</React.Fragment>
        )}
        {mode === 'comparisons' && 
        <>
        <DropRow key={`dropRow-${0}`} index={0} row={rows[0]} question={questions[0]} />
        <div className="w-full flex gap-8 p-4">
          <div className="relative flex-1 flex justify-center items-center bg-neutral-900 rounded-2xl text-white text-4xl">
            {questionValues[0]}
            <div className="absolute size-16 bg-neutral-900 rounded-md flex justify-center items-center -top-4 -translate-y-full left-1/2 -translate-x-1/2">
              <ArrowBigUp />
            </div>
          </div>
          <div className="flex flex-col gap-4 text-2xl font-bold font-mono">
            {['>', '=', '<'].map(c => 
              <Button key={c} disabled={!allCorrect} onClick={() => dispatch(setChosenOperator({chosen: c as ChosenChoices}))} className="size-16 text-2xl font-bold font-mono" variant={c === chosen ? "default" : "outline"} size='icon'>
                {c}
              </Button>
            )}
          </div>
          <div className="relative flex-1 flex justify-center items-center bg-neutral-900 rounded-2xl text-white text-4xl">
            {questionValues[1]}
            <div className="absolute size-16 bg-neutral-900 rounded-md flex justify-center items-center -bottom-4 translate-y-full left-1/2 -translate-x-1/2">
              <ArrowBigDown />
            </div>
          </div>
        </div>
        <DropRow key={`dropRow-${1}`} index={1} row={rows[1]} question={questions[1]} />
        </>}
        {mode !== 'comparisons' && rows.map((row, i) => <DropRow key={`dropRow-${i}`} index={i} row={row} question={questions[i]} />)}
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