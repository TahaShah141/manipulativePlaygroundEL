import { GeoboardState } from "@/lib/redux/hooks"
import { LineType, Vertex } from "@/lib/types"
import { getAngle, getLength } from "@/lib/utils"

type PerimeterProps = {
  color: string
  points: Vertex[]
}

export const Perimeter: React.FC<PerimeterProps> = ({color, points}) => {

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
    {lines.map(({start}, i) =>
      <div key={`line-${i}`} className={`absolute opacity-50 flex justify-between h-2`} 
      style={{
        backgroundColor: color,
        top: `${offset.y + step*start.y}%`, 
        left: `${offset.x + step*start.x}%`,
        width: `${getLength(lines[i])*step}%`,
        //transform origin at left most side but vertically centered
        transformOrigin: '0% 50%',
        transform: `translateY(-50%) rotate(${getAngle(lines[i])}deg)`
      }}>
        <div className="size-2 rounded-full -translate-x-1/2" style={{backgroundColor: color}}/>
        <div className="size-2 rounded-full translate-x-1/2" style={{backgroundColor: color}}/>
      </div>
    )}
    </>
  )
}