import { PolygonType } from "@/lib/types"
import { Perimeter } from "./Perimeter"
import { Filling } from "./Filling"
import { GeoboardState } from "@/lib/redux/hooks"

type PolygonProps = {
  polygon: PolygonType
}

export const Polygon: React.FC<PolygonProps> = ({polygon}) => {

  const { filled } = GeoboardState()

  const {id, points, color } = polygon

  return (
    <>
    <Filling color={color} points={points} />
    <Perimeter id={id} color={color} points={points} />
    </>
  )
}
