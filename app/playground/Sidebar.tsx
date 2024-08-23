import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MainState, useAppDispatch } from "@/lib/redux/hooks"
import { clearBoard, clearSelected, deleteSelected, groupSelected, nextQuestion, randomizeBoard, setMode, splitSelected, switchRole, toggleDisplay, toggleGrouping, toggleSorting } from "@/lib/redux/slices/mainSlice"
import { Block } from "@/lib/types"
import { getNum, getType, getWholeSum } from "@/lib/utils"
import { useState } from "react"

type SidebarProps = {
}

const modes = [
  "sandbox",
  "trivia",
  "basic maths",
  "advanced maths",
]

export const Sidebar: React.FC<SidebarProps> = () => {

  const { display, blocks, sorting, grouping, mode, role, question, operator } = MainState()
  const dispatch = useAppDispatch()

  const [triviaAnswer, setTriviaAnswer] = useState(0)

  const selectedBlocks = blocks.filter(b => b.selected)
  const sumOne = getWholeSum(blocks.filter(b => b.source === 'operandOne'))
  const sumTwo = getWholeSum(blocks.filter(b => b.source === 'operandTwo'))

  const correctAnswer = (
    mode === 'trivia' ? (
      role === 'board' ? 
      getWholeSum(blocks) === question as number :
      triviaAnswer === getWholeSum(question as Block[])
    ) :
    mode === 'basic maths' ? (
      operator === '+' ? 
      sumOne + sumTwo === (question as [number, number])[0] + (question as [number, number])[1] : 
      sumOne - sumTwo === (question as [number, number])[0] - (question as [number, number])[1]
    ) : false
  )

  return (
    <div className="flex flex-col gap-4 justify-between h-full">
      <div className="bg-neutral-800 rounded-lg flex flex-col gap-4 p-4 w-96">
        <h1 className='text-3xl font-bold font-mono text-white text-center'>Base-10 Blocks</h1>

        {(mode === 'sandbox') && <h4 className={`text-center text-7xl font-mono ${!display && "text-neutral-700"}`}>{!display ? "???" : getWholeSum(blocks)}</h4>}
        {(mode !== 'sandbox' && role === 'board') && 
        <>
        {question instanceof Array && mode === 'basic maths' && role === 'board' && typeof question[0] === 'number' && typeof question[1] === 'number' ? 
        <div className="flex gap-1 items-center justify-center text-5xl font-mono">
          <p className={`${sumOne === question[0] ? "text-green-500" : "text-red-500"}`}>{question[0]}</p>
          <p className={`${correctAnswer ? "text-green-500" : "text-red-500"}`}>{operator}</p>
          <p className={`${sumTwo === question[1] ? "text-green-500" : "text-red-500"}`}>{question[1]}</p>
        </div> :
        <h4 className={`text-center text-5xl font-mono ${correctAnswer ? "text-green-500" : "text-red-500"}`}>{ question as number}</h4>}
        </>}
        {(mode !== 'sandbox' && role === 'text') && <Input autoFocus type="number" value={triviaAnswer} onChange={e => setTriviaAnswer(parseInt(e.target.value))} className={`text-center h-fit p-1 text-5xl font-mono ${correctAnswer ? "text-green-500" : "text-red-500"}`} />}
        <Button onClick={() => {dispatch(clearBoard()); setTriviaAnswer(0)}}>Clear</Button>
        {mode === 'sandbox' ? <Button onClick={() => dispatch(randomizeBoard())}>Randomize</Button>:
        <>
          <Button className="flex-1" onClick={() => dispatch(switchRole())}>Switch</Button>
          <Button className="flex-1" onClick={() => dispatch(nextQuestion())}>Next Question</Button>
        </>}
      </div>

      <div className="bg-neutral-900 rounded-lg grid grid-cols-2 gap-4 p-4 w-96">
        <Button disabled={selectedBlocks.length === 0 || selectedBlocks.every(b => b.type === "ONES")} onClick={() => dispatch(splitSelected())}>{`Split Selected`}</Button>
        <Button disabled={selectedBlocks.length !== 10 || selectedBlocks.some(b => b.type !== selectedBlocks[0].type || b.source !== selectedBlocks[0].source)} 
        onClick={() => dispatch((groupSelected({source: selectedBlocks[0].source, type: getType(getNum(selectedBlocks[0].type)*10)})))}>{`Group Selected`}</Button>
        <Button disabled={selectedBlocks.length === 0} onClick={() => dispatch(clearSelected())}>{`Unselect All`}</Button>
        <Button disabled={selectedBlocks.length === 0} onClick={() => dispatch(deleteSelected())}>{`Delete Selected`}</Button>
      </div>

      <div className="bg-neutral-900 rounded-lg flex flex-col gap-4 p-4 w-96">
        {mode === 'sandbox' && <Button variant={"secondary"} onClick={() => dispatch(toggleDisplay())}>{`${!display ? "Show" : "Hide"} Sum`}</Button>}
        <Button variant={"secondary"} onClick={() => dispatch(toggleSorting())}>{`${sorting ? "Disable" : "Enable"} Sorting`}</Button>
        <Button variant={"secondary"} onClick={() => dispatch(toggleGrouping())}>{`${grouping ? "Disable" : "Enable"} Grouping`}</Button>
      </div>

      <div className="grid grid-cols-2 gap-4 w-96">
        {modes.map(m => 
          <Button className="capitalize" key={m} variant={m === mode ? "default" : "outline"} onClick={() => dispatch(setMode({mode: m}))}>{m}</Button>
        )}
      </div>

    </div>
  )
}
