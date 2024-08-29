import { DragEndEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import { newBlock } from "../redux/slices/BaseTenSlice"
import { BaseTenState, useAppDispatch } from "../redux/hooks"

export const useBaseTenDragAndDrop = () => {

  const { mode, question, role } = BaseTenState()
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

    if (!active.data.current || !over || over.id === active.data.current.source || (mode === 'trivia' && role === 'text')) return;

    const type = active.data.current.type

    dispatch(newBlock({ type, source: over.id.toString() }))

  }

  return { sensors, handleDragEnd }
}