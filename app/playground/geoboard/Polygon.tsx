import { LineType, PolygonType, Vertex } from "@/lib/types"
import { getAngle, getLength } from "@/lib/utils"

type PolygonProps = {
  polygon: PolygonType
}

export const Polygon: React.FC<PolygonProps> = ({polygon}) => {

  const n = 10
  const offset = {
    x: (100/n)/2,
    y: (100/n)/2
  }

  const step = 100/n

  const { points, color } = polygon
  
  //make lines using adjacent points
  const lines: LineType[] = points.length == 2 ? 
  [{
    start: points[0],
    end: points[1],
    color,
  }]
  : points.map((point, index) => {
    const nextIndex = (index + 1) % points.length
    const nextPoint = points[nextIndex]
    return {
      start: point,
      end: nextPoint,
      color 
    }
  })

  return (
    <>
    {lines.map(({start, color}, i) =>
      <div className={`absolute opacity-40 flex justify-between h-px`} 
      style={{
        backgroundColor: i % 2 === 0 ? color : "#ff0000", 
        top: `${offset.y + step*start.y}%`, 
        left: `${offset.x + step*start.x}%`,
        width: `${getLength(lines[i])*step}%`,
        //transform origin at left most side but vertically centered
        transformOrigin: '0% 50%',
        transform: `translateY(-50%) rotate(${getAngle(lines[i])}deg)`
      }}>
        <div className="size-px rounded-full -translate-x-1/2" style={{backgroundColor: i % 2 === 0 ? color : "#ff0000"}}/>
          <p>{i}</p>
        <div className="size-px rounded-full translate-x-1/2" style={{backgroundColor: i % 2 === 0 ? color : "#ff0000"}}/>
      </div>
    )}
    </>
  )
}
