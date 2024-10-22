import { useDroppable } from "@dnd-kit/core"
import { FractionBlock } from "./FractionBlock"
import { Fraction, NumberFraction } from "@/lib/types"
import { FractionState, useAppDispatch } from "@/lib/redux/hooks"
import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { FractionValue } from "./FractionValue"
import { isSameNumber, rowSum } from "@/lib/utils"
import { ArrowBigDown, ArrowBigUp, CheckIcon, Equal, XIcon } from "lucide-react"
import { composeFraction, getFractionArraySum, getFractionString, toFractionArray } from "@/lib/fractions"
import { ChosenChoices, setChosenOperator } from "@/lib/redux/slices/FractionSlice"

type WorkPlaceProps = {
}

type DropRowProps = {
  index: number
  row: Fraction[]
  question: NumberFraction[]
}

const DropRow: React.FC<DropRowProps> = ({index, row, question}) => {
  const { scale, mode, isDifficult } = FractionState()
  const { isOver, setNodeRef: dropRef } = useDroppable({ 
    id: `row-${index}`, 
    data: {
      rowIndex: index
    } 
  })

  const sum = rowSum(row)
  const rowFractionArray = toFractionArray(row)
  const questionSum = getFractionArraySum(question)

  const questionFraction = composeFraction(question)

  const isCorrect = isSameNumber(sum, questionSum)

  return (
    <HoverCard>
      <HoverCardTrigger ref={dropRef} className={`${isOver ? 'bg-neutral-950' : 'bg-neutral-900'} relative min-h-11 flex overflow-x-visible`}>
        {mode !== 'sandbox' && (isDifficult || mode === 'comparisons') &&
        <>
        <div className={`absolute -right-2 translate-x-full rounded-md top-1/2 -translate-y-1/2 flex justify-center items-center size-8 border-2 ${isCorrect ? 'bg-green-500 border-green-400' : 'bg-red-500 border-red-600'}`}>
          {isCorrect ? <CheckIcon /> : <XIcon />}
        </div>
        <HoverCard>
          {mode !== 'comparisons' && 
          <HoverCardTrigger className={`absolute left-0 top-0 bottom-0 flex justify-center items-center bg-neutral-800 border-r border-white text-white`} style={{width: `${questionSum*(100/scale)}%`}}>
            {getFractionString(questionFraction)}
          </HoverCardTrigger>}
          <HoverCardContent side="top" className={`flex gap-2 justify-between w-fit text-sm p-1 bg-neutral-700 text-white`}>
            <FractionValue showFraction={true} fractionArray={question} />
          </HoverCardContent>
          <HoverCardContent side="right" className={`flex gap-2 justify-between w-fit text-sm p-1 bg-neutral-700 text-white`}>
            {`${question.length} Block${question.length !== 1 ? 's' : ''}`}
          </HoverCardContent>
        </HoverCard> 
        </>}
        {row.map((f, i) => <FractionBlock fraction={f} key={`key-${i}`} />)}
      </HoverCardTrigger>
      <HoverCardContent side="left" className={`flex gap-2 justify-between w-fit text-sm p-1 text-white ${mode === 'sandbox' ? "bg-neutral-800" : isCorrect ? "bg-green-500" : "bg-red-500"}`}>
          <FractionValue showFraction={true} fractionArray={rowFractionArray} />
      </HoverCardContent>
    </HoverCard>
  )
}

type ComparisonQuestionCardProps = {
  index: number
  question: NumberFraction[]
}

export const ComparisonQuestionCard: React.FC<ComparisonQuestionCardProps> = ({index, question}) => {

  const display = getFractionString(composeFraction(question))
  return (
    <HoverCard>
      <div className="relative flex-1 flex justify-center items-center bg-neutral-900 rounded-2xl text-white text-4xl">
        <HoverCardTrigger>
          {display}  
        </HoverCardTrigger>
        <div className={`absolute size-16 bg-neutral-900 rounded-md flex justify-center items-center left-1/2 -translate-x-1/2 ${index === 0 ? "-top-4 -translate-y-full" : "-bottom-4 translate-y-full"}`}>
          {index === 0 ? <ArrowBigUp /> : <ArrowBigDown />}
        </div>
      </div>
      <HoverCardContent side="top" className={`flex gap-2 justify-between w-fit text-sm p-1 bg-neutral-900 border-0 text-white`}>
        <FractionValue fractionArray={question} />
      </HoverCardContent>
      <HoverCardContent side="bottom" className={`flex gap-2 justify-between w-fit text-sm p-1 bg-neutral-900 border-0 text-white`}>
        {`Using ${question.length} Block${question.length !== 1 ? 's' : ''}`}
      </HoverCardContent>
    </HoverCard>
  )
}

type MainQuestionProps = {
  question: NumberFraction[]
}

const MainQuestion: React.FC<MainQuestionProps> = ({question}) => {

  const questionSum = getFractionArraySum(question)
  const questionFraction = composeFraction(question)
  const { scale, rows } = FractionState()

  const isCorrect = rows.some(r => isSameNumber(rowSum(r), questionSum))
  
  return (
    <div className={`bg-neutral-900 relative min-h-11 flex overflow-x-visible`}>
      <HoverCard>
        <HoverCardTrigger className={`absolute left-0 top-0 bottom-0 flex justify-center items-center border-r border-white text-white ${isCorrect ? "bg-green-500" : "bg-red-500"}`} style={{width: `${questionSum*(100/scale)}%`}}>
          {getFractionString(questionFraction)}
        </HoverCardTrigger>
        <HoverCardContent side="top" className={`flex gap-2 justify-between w-fit text-sm p-1 bg-neutral-700 text-white`}>
          <FractionValue showFraction={true} fractionArray={question} />
        </HoverCardContent>
        <HoverCardContent side="right" className={`flex gap-2 justify-between w-fit text-sm p-1 bg-neutral-700 text-white`}>
          {`${question.length} Block${question.length !== 1 ? 's' : ''}`}
        </HoverCardContent>
      </HoverCard> 
    </div>
  )
}

export const WorkPlace: React.FC<WorkPlaceProps> = ({}) => {

  const { rows, questions, scale, mode, chosen, isDifficult } = FractionState()
  const dispatch = useAppDispatch()
  const [gridLines, setGridLines] = useState(defaultGridLines)

  const mainQuestion = questions[0]

  useEffect(() => {
    const questionFraction = composeFraction(mainQuestion)
    if (mode === 'fill the gaps' && !isDifficult) {
      if (!defaultGridLines.find(g => isSameNumber(g.value, getFractionArraySum(mainQuestion)))) {
        setGridLines([...defaultGridLines, {
          displayed: true,
          value: questionFraction.numerator/questionFraction.denominator,
          name: getFractionString(questionFraction),
        }])
      } else {
        setGridLines(defaultGridLines.map(l => 
          isSameNumber(l.value, getFractionArraySum(mainQuestion)) ? {...l, displayed: true} : l
        ))
      }
    } else {
      setGridLines(defaultGridLines)
    }
  }, [mainQuestion, mode, isDifficult])

  const allCorrect = questions.every((q, i) => isSameNumber(rowSum(rows[i]), getFractionArraySum(q)))

  return (
    <div className={`flex flex-col gap-2 h-full ${mode === 'fill the gaps' && !isDifficult ? "justify-between" : ""}`} style={{flex: `${scale} 1 0%`}}>
      {mode === "fill the gaps" && !isDifficult && <MainQuestion question={mainQuestion} />}
      <div className={`flex relative flex-col ${mode === 'comparisons' ? "h-full justify-between" : ""}`}>
        {gridLines.map(g => 
          <React.Fragment key={g.value}>{g.value <= scale && <div className={`absolute top-0 bottom-0 w-0 ${g.displayed ? 'border-r border-neutral-500 border-dashed': "border-0"} z-20`} style={{left: `${g.value*(100/scale)}%`}}>
            <div className="relative">
              <Button onClick={() => setGridLines(gridLines.map(gl => ({...gl, displayed: gl.name === g.name ? !gl.displayed : gl.displayed})))} variant={'ghost'} className="absolute top-0 -translate-y-full -translate-x-1/2 text-[8px] h-5 p-1">{g.name}</Button>
            </div>
          </div>}</React.Fragment>
        )}
        {mode === 'comparisons' && 
        <>
        <DropRow key={`dropRow-${0}`} index={0} row={rows[0]} question={questions[0]} />
        <div className="w-full flex gap-8 p-4">
          <ComparisonQuestionCard question={questions[0]} index={0} />
          <div className="flex flex-col gap-4 text-2xl font-bold font-mono">
            {['>', '=', '<'].map(c => 
              <Button key={c} disabled={!allCorrect} onClick={() => dispatch(setChosenOperator({chosen: c as ChosenChoices}))} className="size-16 text-2xl font-bold font-mono" variant={c === chosen ? "default" : "outline"} size='icon'>
                {c}
              </Button>
            )}
          </div>
          <ComparisonQuestionCard question={questions[1]} index={1} />
        </div>
        <DropRow key={`dropRow-${1}`} index={1} row={rows[1]} question={questions[1]} />
        </>}
        {mode !== 'comparisons' && rows.map((row, i) => <DropRow key={`dropRow-${i}`} index={i} row={row} question={isDifficult || mode === 'comparisons'  ? questions[i] : mainQuestion} />)}
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
    displayed: false
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