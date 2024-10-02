import { DragEndEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import { GeoboardState, useAppDispatch } from "../redux/hooks"
import { PolygonType } from "../types"
import { addPolygon, movePoint } from "../redux/slices/GeoboardSlice"
import { v4 as randomID } from "uuid"

export const useGeoboardDragAndDrop = () => {

  const { N } = GeoboardState()
  const dispatch = useAppDispatch()

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      }
    })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    
    if (!over || !active.data.current || !over.data.current) return;
    
    const {x, y} = over.data.current
    const {color, source, polygonID, pointIndex} = active.data.current

    if (source === 'tray') {
    const polygon: PolygonType = {
        id: randomID(),
        color,
        points: [
          {x, y},
          {x: x === N-1 ? x-1 : x+1, y: y}
        ]
      }

      dispatch(addPolygon({polygon}))
    } else {
      dispatch(movePoint({polygonID, pointIndex, x, y}))
    }
  }

  return { sensors, handleDragEnd }
}