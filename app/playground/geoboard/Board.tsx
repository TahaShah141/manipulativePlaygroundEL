import { canAddNewPoint, isIntersectingLines, MakePolygon } from "@/lib/utils"
import { Anchor } from "./Anchor"
import { Polygon } from "./Polygon"
import { Vertex } from "@/lib/types"
import { useState } from "react"

export const Board = () => {

  const n = 10

  const [ hovered, setHovered ] = useState(-1)

  const hoveredX = hovered % n
  const hoveredY = Math.floor(hovered / n)

  let points = [2, 3, 3, 1, 5, 1, 6, 4, 4, 8]

  const prevPolygon = MakePolygon(points)
  if (hovered !== -1 && canAddNewPoint(prevPolygon, {x: hoveredX, y: hoveredY})) {
    points.push(hoveredX, hoveredY)
  }
  
  return (
    <div className="grid relative bg-neutral-900 rounded-md w-full aspect-square max-w-[500px]" style={{gridTemplateColumns: `repeat(${n}, 1fr)`, gridTemplateRows: `repeat(${n}, 1fr)`}}>
      {Array.from({length: n*n}, (_, i) => (
        <Anchor setHovered={() => setHovered(i)} hovering={i === hovered} key={i} />
      ))}
      {/* <p className="absolute top-2 left-2 bg-black text-white">
        {`${isIntersectingLines(
          {color: "#f200f2", start: {x: points[0], y: points[1]}, end: {x: points[2], y: points[3]}},
          {color: "#f200f2", start: {x: points[4], y: points[5]}, end: {x: points[6], y: points[7]}},
        )}`}
      </p> */}
      <Polygon polygon={MakePolygon(points)} />
    </div>
  )
}
