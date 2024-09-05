import { DragEndEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import { Fraction } from "../types"
import { v4 as randomID } from "uuid"
import { useAppDispatch } from "../redux/hooks"
import { insertIntoRow, moveIntoRow } from "../redux/slices/FractionSlice"

export const useFractionsDragAndDrop = () => {

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

    const index = over.data.current.rowIndex
    const { source, type } = active.data.current
    const fraction: Fraction = {
      id: randomID(),
      source: over.id.toString(),
      type,
      selected: false,
      disabled: false,
    }
    if (source === 'tray') {
      dispatch(insertIntoRow({fraction, index}))
    } else if (source !== over.id.toString()) {
      dispatch(moveIntoRow({index, fraction: {...fraction, id: active.id}}))
    }
  }

  return { sensors, handleDragEnd }
}