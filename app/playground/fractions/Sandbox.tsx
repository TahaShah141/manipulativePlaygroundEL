import { useDroppable } from "@dnd-kit/core"
import { FractionBlock } from "./FractionBlock"
import { Fraction } from "@/lib/types"
import { FractionState, useAppDispatch } from "@/lib/redux/hooks"
import { Button } from "@/components/ui/button"
import { addRow } from "@/lib/redux/slices/FractionSlice"

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
    <div ref={dropRef} className={`${isOver ? 'bg-neutral-700' : 'bg-neutral-800'} min-h-12 p-2 rounded-sm flex-1 flex overflow-x-visible max-w-[calc(100vw-64px)]`}>
      {row.map((f, i) => <FractionBlock fraction={f} />)}
    </div>
  )
}

export const Sandbox: React.FC<SandboxProps> = ({}) => {

  const { rows } = FractionState()
  const dispatch = useAppDispatch()

  return (
    <div className="flex-1 h-full flex flex-col gap-2">
      {rows.map((row, i) => <DropRow key={i} index={i} row={row} />)}
      <Button onClick={() => dispatch(addRow())}>Add Row</Button>
    </div>
  )
}
