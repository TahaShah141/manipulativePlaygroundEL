import { DragEndEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import { useDispatch } from "react-redux"
import { newBlock } from "../redux/slices/mainSlice"

export const useDragAndDrop = () => {

  const dispatch = useDispatch()

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      }
    })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (!active.data.current || !over || over.id === active.data.current.source) return;

    const type = active.data.current.type

    dispatch(newBlock({ type }))
  }

  return { sensors, handleDragEnd }
}