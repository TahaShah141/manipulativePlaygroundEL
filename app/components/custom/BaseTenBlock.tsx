import { Block } from "@/lib/types"
import { DraggableAttributes, UniqueIdentifier, useDraggable } from "@dnd-kit/core"
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
}

const OnesBlock = forwardRef<HTMLDivElement, BlockProps>(({attributes, listeners, style, isDragging}, ref) => {
  return (
    <div ref={ref} {...attributes} {...listeners} style={style} className={`flex justify-center items-center size-7 transition-colors duration-300 border-2 border-black rounded-sm ${isDragging ? "bg-neutral-200" : "bg-brown"}`}></div>
  )
})

const TensBlock = forwardRef<HTMLDivElement, BlockProps>(({attributes, listeners, style, isDragging}, ref) => {
  return (
    <div ref={ref} {...attributes} {...listeners} style={style} className={`flex flex-col transition-colors duration-300 rounded-sm border border-black overflow-hidden ${isDragging ? "bg-blue-200" : "bg-blue-500"}`}>
      {Array.from({length: 10}, (_, i) => (
        <div key={i} className="size-7 border-black border" />
      ))}
    </div>
  )
})

const HundredsBlock = forwardRef<HTMLDivElement, BlockProps>(({attributes, listeners, style, isDragging}, ref) => {
  return (
    <div ref={ref} {...attributes} {...listeners} style={style} className={`grid grid-cols-10 grid-rows-10 transition-colors duration-300 rounded-sm border-black border-2 overflow-hidden ${isDragging ? "bg-yellow-100" : "bg-yellow-300"}`}>
      {Array.from({length: 100}, (_, i) => (
        <div key={i} className="size-7 border-black border" />
      ))}
    </div>
  )
})

export const BaseTenBlock: React.FC<BaseTenBlockProps> = ({ block }) => {

  const { id, selected, type } = block
  const { attributes, listeners, setNodeRef: dragRef, transform, isDragging } = useDraggable({
    id, 
    data: {
      type
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
    isDragging
  }

  return (
    <div className="relative">
      {type === "ONES" && <OnesBlock {...blockProps} />}
      {type === "TENS" && <TensBlock {...blockProps} />}
      {type === "HUNDREDS" && <HundredsBlock {...blockProps} />}
    </div>
  )
}