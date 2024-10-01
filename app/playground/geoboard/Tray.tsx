import { useDraggable } from "@dnd-kit/core"
import { CSSProperties } from "react"

type TrayProps = {

}

type RubberBandProps = {
  color: string
}

const RubberBandColors = [
  '#FFADAD',
  '#FFD6A5',
  '#FDFFB6',
  '#CAFFBF',
  '#9BF6FF',
  '#A0C4FF',
  '#BDB2FF',
  '#FFC6FF',
  '#FFFFFC',
]

const RubberBand: React.FC<RubberBandProps> = ({color}) => {

  const { attributes, listeners, setNodeRef: dragRef, transform, isDragging } = useDraggable({
    id: color, 
    // data: {
    //   type,
    //   source
    // }
  })

  const style: CSSProperties = {
    backgroundColor: color,
    transform: `translate3d(${transform?.x ?? 0}px, ${transform?.y ?? 0}px, 0px)`
  }

  return (
    <div ref={dragRef} {...attributes} {...listeners} style={style} className={`${isDragging ? "opacity-20 pointer-events-none" : ""} size-10 rounded-md`}>

    </div>
  )
}

export const Tray: React.FC<TrayProps> = () => {
  return (
    <div className="flex flex-col gap-4">
      {RubberBandColors.map(color => <RubberBand key={color} color={color} />)}
    </div>
  )
}