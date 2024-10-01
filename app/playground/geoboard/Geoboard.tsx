import { Anchor } from "./Anchor"
import { Polygon } from "./Polygon"
import { useState } from "react"
import { GeoboardState } from "@/lib/redux/hooks"

export const Geoboard = () => {

  const { N, polygons } = GeoboardState()
  
  return (
    <div className="grid relative bg-neutral-900 rounded-md w-full aspect-square max-w-[500px]" style={{gridTemplateColumns: `repeat(${N}, 1fr)`, gridTemplateRows: `repeat(${N}, 1fr)`}}>
      {Array.from({length: N*N}, (_, i) => (
        <Anchor x={i % N} y={Math.floor(i / N)} key={i} />
      ))}
      {polygons.map((polygon, i) => (
        <Polygon key={i} polygon={polygon} />
      ))}
    </div>
  )
}
