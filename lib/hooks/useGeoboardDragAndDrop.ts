import { DragEndEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import { useAppDispatch } from "../redux/hooks"

export const useGeoboardDragAndDrop = () => {

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
    
    console.log({active, over})
  }

  return { sensors, handleDragEnd }
}