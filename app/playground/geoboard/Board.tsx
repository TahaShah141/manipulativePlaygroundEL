import { PolygonType } from "@/lib/types"
import { Anchor } from "./Anchor"
import { Polygon } from "./Polygon"

export const Board = () => {

  const TestPolygon: PolygonType = {
    color: '#f200f2',
    filled: false,
    points: [
      {x: 4, y: 2},
      {x: 5, y: 5},
      {x: 2, y: 3},
      {x: 6, y: 3},
      {x: 3, y: 5}  
    ]
  }

  const n = 10

  return (
    <div className="grid relative bg-neutral-900 rounded-md w-full aspect-square max-w-[600px]" style={{gridTemplateColumns: `repeat(${n}, 1fr)`, gridTemplateRows: `repeat(${n}, 1fr)`}}>
      {Array.from({length: n*n}, (_, i) => (
        <Anchor key={i} />
      ))}
      <Polygon polygon={TestPolygon} />
    </div>
  )
}
