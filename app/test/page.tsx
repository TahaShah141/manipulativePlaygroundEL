"use client"
import { useChangeInputType } from "@/lib/hooks/useChangeInputType";
import { useTestDragAndDrop } from "@/lib/hooks/useTestDragAndDrop";
import { DndContext, DragEndEvent, pointerWithin, useDraggable, useDroppable, PointerSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core"
import { useEffect, useState } from "react";

const Draggable = () => {
  const { attributes, listeners, setNodeRef: dragRef, transform, isDragging } = useDraggable({id: "draggable"})

  const style = {
    transform: `translate3d(${transform?.x ?? 0}px, ${transform?.y ?? 0}px, 0)`
  }

  const props = {
    ref: dragRef,
    attributes,
    listeners,
    style,
  }

  return (
    <div ref={dragRef} {...attributes} {...listeners} style={style}  className="bg-red-500 p-4 rounded-md text-center">
      Drag Me
    </div>
  )
}

type DroppableProps = {
  id: string
  children: React.ReactNode 
}

const Droppable: React.FC<DroppableProps> = ({children, id}) => {

  const { isOver, setNodeRef: dropRef } = useDroppable({ 
    id
  })

  return (
    <div ref={dropRef} className={`size-48 ${isOver ? "bg-green-500" : 'bg-sky-500'} p-6 rounded-md`}>
      {children}
    </div>
  )
}

export default function Test() {

  const [ hasTouch, setHasTouch ] = useState(false)
  const [ hasMouse, setHasMouse ] = useState(false)

  useEffect(() => {
    setHasMouse(window.matchMedia("(pointer: fine)").matches);
    setHasTouch(window.matchMedia("(pointer: coarse)").matches);
  }, [window])

  const { sensors } = useTestDragAndDrop()

  const [droppedID, setDroppedID] = useState("")

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    console.log({event})

    if (!over) return;

    setDroppedID(over.id.toString())
  }

  return (
    <DndContext onDragEnd={handleDragEnd} collisionDetection={pointerWithin} sensors={sensors}>
      <div className="flex flex-col h-screen justify-center items-center gap-2">
        <div className="flex gap-4 items-center justify-center">
          <p>{`Touch: ${hasTouch}`}</p>
          <p>{`Mouse: ${hasMouse}`}</p>
        </div>
        <div className="flex flex-wrap gap-4 items-center justify-center">
          <Droppable id="D1">
            {droppedID === 'D1' && <Draggable />}
          </Droppable>
          {!droppedID && <Draggable />}
          <Droppable id="D2">
            {droppedID === 'D2' && <Draggable />}
          </Droppable>
        </div>
      </div>
    </DndContext>
  );
}
