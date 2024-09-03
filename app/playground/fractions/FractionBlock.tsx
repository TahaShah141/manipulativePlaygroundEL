import { FractionState, useAppDispatch } from "@/lib/redux/hooks"
import { Fraction } from "@/lib/types"
import { useDraggable } from "@dnd-kit/core"
import { fractionColors } from "./Tray"

type FractionBlockProps = {
  fraction: Fraction
}

export const FractionBlock: React.FC<FractionBlockProps> = ({fraction}) => {

  const { scale, labels } = FractionState()
  const { id, type, selected, disabled, source } = fraction
  const dispatch = useAppDispatch()
  const { attributes, listeners, setNodeRef: dragRef, transform, isDragging } = useDraggable({
    disabled,
    id, 
    data: {
      type,
      source
    }
  })

  const style = {
    width: `${100/(type * scale)}%`,
    transform: `translate3d(${transform?.x ?? 0}px, ${transform?.y ?? 0}px, 0px)`
  }

  return (
    <div ref={dragRef} {...attributes} {...listeners} style={style} className={`text-black flex-shrink-0 flex justify-center items-center border-black border ${fractionColors[(type-2)%4]} h-12 text-sm font-mono`}>
      {labels && `1/${type}`}
    </div>
  )
}
