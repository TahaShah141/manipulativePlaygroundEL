import { DragEndEvent, PointerSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core"
import { useEffect, useState } from "react"

export const useTestDragAndDrop = () => {

  const mouseSensor = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      }
    }),
  )

  const touchSensor = useSensors(
    useSensor(TouchSensor),
  )

  const [sensors, setSensors] = useState(mouseSensor)

  useEffect(() => {
    if (window.matchMedia("(pointer: fine)").matches) setSensors(mouseSensor)
    if (window.matchMedia("(pointer: coarse)").matches) setSensors(touchSensor)
  }, [window])

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    console.log({event})
  }

  return { sensors, handleDragEnd }
}