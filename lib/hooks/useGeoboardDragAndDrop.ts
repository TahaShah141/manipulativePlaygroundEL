import { DragEndEvent, DragOverEvent, DragStartEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import { GeoboardState, useAppDispatch } from "../redux/hooks"
import { PolygonType } from "../types"
import { addPoint, addPolygon, clearSelection, movePoint, selectPoint, selectType } from "../redux/slices/GeoboardSlice"
import { v4 as randomID } from "uuid"

export const useGeoboardDragAndDrop = () => {

  const { N, selectedType } = GeoboardState()
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
    const {color, type, source, polygonID, pointIndex} = active.data.current
    dispatch(selectType({type}))
    if (type === 'Vertex') {
      dispatch(selectPoint({polygon:polygonID, index:pointIndex}))
    } else if (type === 'Edge') {
      dispatch(selectPoint({polygon:polygonID, index:pointIndex}))
    } else {
    }
  }

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event

    if (!over || !active.data.current || !over.data.current) return;

    const {x, y} = over.data.current
    const {color, source } = active.data.current

    if (selectedType === "Vertex") {
      dispatch(movePoint({x, y}))
    } if (selectedType === "Edge") {
      dispatch(addPoint({x, y}))
      dispatch(selectType({type:'Vertex'}))
    }
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    
    if (!over || !active.data.current || !over.data.current) return;
    
    const {x, y} = over.data.current
    const {color} = active.data.current
    if (selectedType === 'Rubberband') {
    const polygon: PolygonType = {
        id: randomID(),
        color,
        points: [
          {x, y},
          {x: x === N-1 ? x-1 : x+1, y: y}
        ]
      }

      dispatch(addPolygon({polygon}))
    } else if (selectedType === 'Vertex') {
      dispatch(movePoint({x, y, dropped:true}))
      dispatch(clearSelection())
    }
  }

  return { sensors, handleDragEnd, handleDragOver, handleDragStart}
}