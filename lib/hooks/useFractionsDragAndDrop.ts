import { DragEndEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"

export const useFractionsDragAndDrop = () => {

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      }
    })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

  }

  return { sensors, handleDragEnd }
}