import { DragEndEvent, DragOverEvent, DragStartEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import { GeoboardState, useAppDispatch } from "../redux/hooks"
import { PolygonType } from "../types"
import { addPolygon, clearSelection, movePoint, selectPoint } from "../redux/slices/GeoboardSlice"
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

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    if (!active.data.current) return
    const {color, source, polygonID, pointIndex} = active.data.current
    if (source !== 'tray') {
      dispatch(selectPoint({polygon:polygonID, index:pointIndex}))
    }
  }

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event

    if (!over || !active.data.current || !over.data.current) return;

    const {x, y} = over.data.current
    const {color, source } = active.data.current

    if (source !== 'tray') {
      dispatch(movePoint({x, y}))
    }
  }

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
      dispatch(movePoint({x, y, dropped:true}))
      dispatch(clearSelection())
    }
  }

  return { sensors, handleDragEnd, handleDragOver, handleDragStart}
}