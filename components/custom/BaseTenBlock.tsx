import { useAppDispatch } from "@/lib/redux/hooks"
import { selectBlock } from "@/lib/redux/slices/BaseTenSlice"
import { Block } from "@/lib/types"
import { DraggableAttributes, useDraggable } from "@dnd-kit/core"
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities"
import React, { CSSProperties, forwardRef } from "react"

type BaseTenBlockProps = {
  block: Block
}

type BlockProps = {
  attributes: DraggableAttributes
  listeners: SyntheticListenerMap | undefined
  style: CSSProperties
  isDragging: boolean
  isSmall?: boolean
}

const OnesBlock = forwardRef<HTMLDivElement, BlockProps>(({attributes, listeners, style, isDragging, isSmall=false}, ref) => {
  return (
    <div ref={ref} {...attributes} {...listeners} style={style} className={`flex justify-center items-center ${isSmall ? "size-5" : "size-7"} transition-colors duration-300 border-2 border-black rounded-md ${isDragging ? "bg-neutral-200" : "bg-brown"}`} />
  )
})

const TensBlock = forwardRef<HTMLDivElement, BlockProps>(({attributes, listeners, style, isDragging, isSmall=false}, ref) => {
  return (
    <div ref={ref} {...attributes} {...listeners} style={style} className={`flex flex-col transition-colors duration-300 rounded-md border border-black overflow-hidden ${isDragging ? "bg-blue-200" : "bg-blue-500"}`}>
      {Array.from({length: 10}, (_, i) => (
        <div key={i} className={`${isSmall ? "size-5" : "size-7"} border-black border`} />
      ))}
    </div>
  )
})

const HundredsBlock = forwardRef<HTMLDivElement, BlockProps>(({attributes, listeners, style, isDragging, isSmall=false}, ref) => {
  return (
    <div ref={ref} {...attributes} {...listeners} style={style} className={`grid grid-cols-10 grid-rows-10 transition-colors duration-300 rounded-md border-black border-2 overflow-hidden ${isDragging ? "bg-yellow-100" : "bg-yellow-300"}`}>
      {Array.from({length: 100}, (_, i) => (
        <div key={i} className={`${isSmall ? "size-5" : "size-7"} border-black border`} />
      ))}
    </div>
  )
})

export const BaseTenBlock: React.FC<BaseTenBlockProps> = ({ block }) => {

  const { id, selected, source, type, disabled } = block
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
    transform: `translate3d(${transform?.x ?? 0}px, ${transform?.y ?? 0}px, 0)`
  }

  const blockProps = {
    ref: dragRef,
    attributes,
    listeners,
    style,
    isDragging,
    isSmall: source === 'window' || source === 'supply'
  }

  return (
    <div onClick={() => dispatch(selectBlock({id}))} className={`h-fit ${selected ? "ring-2 ring-red-500" : ""}`}>
      {type === "ONES" && <OnesBlock {...blockProps} />}
      {type === "TENS" && <TensBlock {...blockProps} />}
      {type === "HUNDREDS" && <HundredsBlock {...blockProps} />}
    </div>
  )
}