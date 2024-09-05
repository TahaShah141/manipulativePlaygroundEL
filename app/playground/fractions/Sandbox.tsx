import { useDroppable } from "@dnd-kit/core"
import { FractionBlock } from "./FractionBlock"
import { Fraction } from "@/lib/types"
import { FractionState } from "@/lib/redux/hooks"
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
    <div ref={dropRef} className={`${isOver ? 'bg-neutral-900' : ''} border h-12 flex overflow-x-visible`}>
      {row.map((f, i) => <FractionBlock fraction={f} />)}
    </div>
  )
}

export const Sandbox: React.FC<SandboxProps> = ({}) => {

  const { rows, scale } = FractionState()

  return (
    <div className="h-full flex flex-col gap-2 border border-white" style={{flex: `${scale} 1 0%`}}>
      <div className="flex flex-col">
        {rows.map((row, i) => <DropRow key={i} index={i} row={row} />)}
      </div>
    </div>
  )
}
