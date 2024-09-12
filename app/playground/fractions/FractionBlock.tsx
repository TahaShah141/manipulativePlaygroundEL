import { FractionState, useAppDispatch } from "@/lib/redux/hooks"
import { Fraction } from "@/lib/types"
import { useDraggable } from "@dnd-kit/core"
import { fractionColors } from "./Tray"
import { Button } from "@/components/ui/button"
import { XIcon } from "lucide-react"
import { deleteFraction } from "@/lib/redux/slices/FractionSlice"
import { useSortable } from "@dnd-kit/sortable"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"

type FractionBlockProps = {
  fraction: Fraction
}

export const TestBlock: React.FC<FractionBlockProps> = ({fraction}) => {

  const { scale, labels } = FractionState()
  const { id, type, disabled, source } = fraction
  const dispatch = useAppDispatch()
  const { attributes, listeners, setNodeRef: dragRef, transform, transition, isDragging } = useSortable({
    disabled,
    id, 
    data: {
      type,
      source
    }
  })

  const style = {
    width: `${100/(type * (source !== 'tray' ? scale : 1))}%`,
    transform: `translate3d(${transform?.x ?? 0}px, ${transform?.y ?? 0}px, 0px)`,
    transition,
  };


  return (
    <div ref={dragRef} {...attributes} {...listeners} style={style} className={`relative group text-black flex-shrink-0 flex justify-center items-center border-black border ${fractionColors[(type-1)%4]} h-12 text-sm font-mono`}>
      {source !== 'tray' && <Button onClick={() => dispatch(deleteFraction({fraction}))} className="group-hover:flex hidden absolute top-0 right-0 size-5 p-1 rounded-sm hover:bg-black/15 hover:text-destructive" size="icon" variant={'ghost'}><XIcon /></Button>}
      <p>{labels && (type === 1 ? "1" : `1/${type}`)}</p>
    </div>
  ) 
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
    width: `${100/(type * (source !== 'tray' ? scale : 1))}%`,
    transform: `translate3d(${transform?.x ?? 0}px, ${transform?.y ?? 0}px, 0px)`
  }

  const decimal = (1/type).toFixed(5)

  return (
    <HoverCard>
      <div ref={dragRef} {...attributes} {...listeners} style={style} className={`relative group text-black flex-shrink-0 flex justify-center items-center border-black border ${fractionColors[(type-1)%4]} h-12 text-sm font-mono`}>
        {source !== 'tray' && <Button onClick={() => dispatch(deleteFraction({fraction}))} className="group-hover:flex hidden absolute top-0 right-0 size-5 p-1 rounded-sm hover:bg-black/15 hover:text-destructive" size="icon" variant={'ghost'}><XIcon /></Button>}
        <HoverCardTrigger>{labels && (type === 1 ? "1" : `1/${type}`)}</HoverCardTrigger>
      </div>
      <HoverCardContent side="top" className={`flex gap-2 justify-between w-fit text-sm p-1 ${fractionColors[(type-1)%4]} text-black`}>
        <p>{+decimal}</p>
        <p>or</p>
        <p>{`${+(+((decimal))*100).toFixed(5)}%`}</p>
      </HoverCardContent>
    </HoverCard>
  )
}
