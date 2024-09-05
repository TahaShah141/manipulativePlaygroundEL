import { useDroppable } from "@dnd-kit/core"
import { FractionBlock } from "./FractionBlock"
import { Fraction } from "@/lib/types"
import { FractionState } from "@/lib/redux/hooks"
import { useState } from "react"
import { Button } from "@/components/ui/button"
type SandboxProps = {
}

type DropRowProps = {
  index: number
  row: Fraction[]
}

const DropRow: React.FC<DropRowProps> = ({index, row}) => {
  const { isOver, setNodeRef: dropRef } = useDroppable({ 
    id: `row-${index}`, 
    data: {
      rowIndex: index
    } 
  })

  return (
    <div ref={dropRef} className={`${isOver ? 'bg-neutral-900' : ''} min-h-12 flex overflow-x-visible`}>
      {row.map((f, i) => <FractionBlock fraction={f} />)}
    </div>
  )
}

type gridLine = {
  name: string
  value: number
  displayed: boolean
}

const defaultGridLines = [
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

export const Sandbox: React.FC<SandboxProps> = ({}) => {

  const { rows, scale } = FractionState()
  const [gridLines, setGridLines] = useState(defaultGridLines)

  return (
    <div className="h-full flex flex-col gap-2 border bg-stone-900" style={{flex: `${scale} 1 0%`}}>
      <div className="flex relative flex-col">
        {gridLines.map(g => 
          <>{g.value <= scale && <div className={`absolute top-0 bottom-0 w-0 ${g.displayed ? 'border-r border-neutral-500 border-dashed': "border-0"} z-20`} style={{left: `${g.value*(100/scale)}%`}}>
            <div className="relative">
              <Button onClick={() => setGridLines(gridLines.map(gl => ({...gl, displayed: gl.name === g.name ? !gl.displayed : gl.displayed})))} variant={'ghost'} className="absolute top-0 -translate-y-full -translate-x-1/2 text-[8px] size-5 p-1">{g.name}</Button>
            </div>
          </div>}</>
        )}
        {rows.map((row, i) => <DropRow key={i} index={i} row={row} />)}
      </div>
    </div>
  )
}
