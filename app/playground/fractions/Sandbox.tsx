import { useDroppable } from "@dnd-kit/core"
import { FractionBlock } from "./FractionBlock"

type SandboxProps = {
  blocks: number[]
}

export const Sandbox: React.FC<SandboxProps> = ({blocks}) => {

  const { isOver, setNodeRef: dropRef } = useDroppable({ id: 'row' })

  return (
    <div ref={dropRef} className={`${isOver ? 'bg-neutral-700' : 'bg-neutral-800'} min-h-12 p-2 rounded-sm flex-1 flex overflow-x-visible max-w-[calc(100vw-64px)]`}>
      {blocks.map((b, i) => <FractionBlock key={i} fraction={{
        id: i,
        type: b,
        selected: false,
        disabled: false,
        source: 'row'
      }} />)}
    </div>
  )
}
