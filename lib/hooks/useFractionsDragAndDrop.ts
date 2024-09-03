import { DragEndEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import { Fraction } from "../types"
import { v4 as randomID } from "uuid"
import { useAppDispatch } from "../redux/hooks"
import { insertIntoRow } from "../redux/slices/FractionSlice"

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
      source,
      type,
      selected: false,
      disabled: false,
    }

    dispatch(insertIntoRow({fraction, index}))
  }

  return { sensors, handleDragEnd }
}