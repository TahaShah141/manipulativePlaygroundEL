import { FractionState, useAppDispatch } from "@/lib/redux/hooks"
import { Fraction } from "@/lib/types"
import { useDraggable } from "@dnd-kit/core"
import { Button } from "@/components/ui/button"
import { XIcon } from "lucide-react"
import { deleteFraction } from "@/lib/redux/slices/FractionSlice"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { FractionValue } from "./FractionValue"

export const fractionColors = [
  'bg-red-500',
  'bg-blue-400', 
  'bg-green-500',
  'bg-yellow-400',
]

export const baseColor = 'bg-neutral-200'

type FractionBlockProps = {
  fraction: Fraction
}

export const FractionBlock: React.FC<FractionBlockProps> = ({fraction}) => {

  const { scale, labels, colors } = FractionState()
  const { id, type, disabled, source } = fraction
  const dispatch = useAppDispatch()
  const { attributes, listeners, setNodeRef: dragRef, transform } = useDraggable({
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

  return (
    <HoverCard>
      <div ref={dragRef} {...attributes} {...listeners} style={style} className={`relative group text-black flex-shrink-0 flex justify-center items-center border-black border ${colors ? fractionColors[(type-1)%4] : baseColor} h-12 text-sm font-mono`}>
        {source !== 'tray' && <Button onClick={() => dispatch(deleteFraction({fraction}))} className="group-hover:flex hidden absolute top-0 right-0 size-5 p-1 rounded-sm hover:bg-black/15 hover:text-destructive" size="icon" variant={'ghost'}><XIcon /></Button>}
        <HoverCardTrigger>{labels && (type === 1 ? "1" : `1/${type}`)}</HoverCardTrigger>
      </div>
      <HoverCardContent side="top" className={`flex gap-2 justify-between w-fit text-sm p-1 ${colors ? fractionColors[(type-1)%4] : baseColor} text-black`}>
        <FractionValue n={(1/type)} />
      </HoverCardContent>
    </HoverCard>
  )
}
