import { GeoboardState } from "@/lib/redux/hooks"
import { LineType, Vertex } from "@/lib/types"
import { getAngle, getLength } from "@/lib/utils"
import { useDraggable } from "@dnd-kit/core"

type PerimeterProps = {
  id: string
  color: string
  points: Vertex[]
}

type LineProps = {
  offset: {
    x: number
    y: number
  }
  color: string
  id: string
  step: number
  index: number
  line: LineType
}

type PointProps = {
  id: string
  index: number
  vertex: Vertex,
  offset: {
    x: number
    y: number
  }
  color: string
  step: number
}

const Line: React.FC<LineProps> = ({id, index, line, offset, step, color}) => {
  const {start} = line

  const { attributes, listeners, setNodeRef: dragRef, transform, isDragging } = useDraggable({
    id: `Edge-${id}-${color}-${index}`, 
    data: {
      type: "Edge",
      color,
      polygonID: id,
      pointIndex: index
    }
  })

  const style = {
    backgroundColor: color,
    top: `calc(${offset.y + step*start.y}% - 4px)`, 
    left: `${offset.x + step*start.x}%`,
    width: `${getLength(line)*step}%`,
    //transform origin at left most side but vertically centered
    transformOrigin: '0% 50%',
    transform: `rotate(${getAngle(line)}deg) `
  }

  return (
    <div ref={dragRef} {...attributes} {...listeners} className={`absolute opacity-50 flex items-center text-black h-2`} style={style}>
      {/* <p className="font-bold px-4">{index-1}</p> */}
    </div>
  )
} 

const Point: React.FC<PointProps> = ({id, index, color, offset, step, vertex}) => {

  const { attributes, listeners, setNodeRef: dragRef, transform, isDragging } = useDraggable({
    id: `${id}-${color}-${vertex.x}-${vertex.y}`, 
    data: {
      type: "Vertex",
      color,
      source: vertex,
      polygonID: id,
      pointIndex: index
    }
  })

  const style = {
    // transform: `translate3d(${transform?.x ?? 0}px, ${transform?.y ?? 0}px, 0)`,
    backgroundColor: color, 
    top: `calc(${offset.y + step*vertex.y}% - 8px)`, 
    left: `calc(${offset.x + step*vertex.x}% - 8px)`
  }

  return (
    <div ref={dragRef} {...attributes} {...listeners} className={`absolute size-4 rounded-full border-2 flex justify-center items-center text-black text-[10px] border-black`} style={style}>
      {/* <p className="font-bold">{index}</p> */}
    </div>
  )
}

export const Perimeter: React.FC<PerimeterProps> = ({id, color, points}) => {

  const { N } = GeoboardState()

  const offset = {
    x: (100/N)/2,
    y: (100/N)/2
  }

  const step = 100/N

  const lines: LineType[] = points.length == 2 ? 
  [{
    start: points[0],
    end: points[1],
  }]
  : points.map((point, index) => {
    const nextIndex = (index + 1) % points.length
    const nextPoint = points[nextIndex]
    return {
      start: point,
      end: nextPoint,
    }
  })

  return (
    <>
    {lines.map((line, i) => <Line id={id} index={(i+1)%N} key={Math.random()} color={color} line={line} offset={offset} step={step} />)}
    {points.map((point, i) => <Point id={id} key={Math.random()} color={color} offset={offset} step={step} vertex={point} index={i} />)}
    </>
  )
}