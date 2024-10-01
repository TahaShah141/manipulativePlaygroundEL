import { useDroppable } from "@dnd-kit/core"

type AnchorProps = {
  x: number
  y: number
}

export const Anchor: React.FC<AnchorProps> = ({x, y}) => {

  const { isOver, setNodeRef: dropRef } = useDroppable({ 
    id: `anchor-${x}-${y}`,
    data: {
      x, 
      y,
    }
  })

  return (
    <div ref={dropRef} className={`size-full flex justify-center items-center`}>
      <div className={`rounded-full border xs:border-2 border-white ${isOver ? 'bg-neutral-600' : 'bg-neutral-400'} size-2 xs:size-3 md:size-4`}>

      </div>
    </div>
  )
}
