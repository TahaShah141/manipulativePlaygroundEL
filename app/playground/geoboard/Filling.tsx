import { GeoboardState, useAppDispatch } from "@/lib/redux/hooks"
import { Vertex } from "@/lib/types"
import { useEffect, useRef, useState } from "react"

type FillingProps = { 
  color: string
  points: Vertex[]
}

export const Filling: React.FC<FillingProps> = ({color, points}) => {
  
  const { N, filled } = GeoboardState()
  const offset = {
    x: (100/N)/2,
    y: (100/N)/2
  }

  const step = 100/N

  const [svgWidth, setSVGWidth] = useState(100)
  const [svgHeight, setSVGHeight] = useState(100)
  const svgRef = useRef<SVGSVGElement | null>(null)

  useEffect(() => {
    if (svgRef.current) {
      const { width, height } = svgRef.current.getBoundingClientRect()
      setSVGWidth(width)
      setSVGHeight(height)
    }
  }, [svgRef.current, window.innerHeight, window.innerWidth])

  // Generate SVG points in pixels
  const svgPoints = points.map(point => 
    `${(offset.x + step * point.x) * (svgWidth / 100)},${(offset.y + step * point.y) * (svgHeight / 100)}`
  ).join(' ');

  return (
    <svg ref={svgRef} className="absolute" style={{width: "100%", height: "100%", top: 0, left: 0, pointerEvents: 'none', opacity: filled ? 1 : 0}}>
      <polygon points={svgPoints} fill={color} fillOpacity={0.2} />
    </svg>
  )
}