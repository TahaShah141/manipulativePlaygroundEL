import { useMouseCoords } from "@/lib/hooks/useMouseCoords"

export const Pointer: React.FC = () => {

  const { mouseX, mouseY } = useMouseCoords()

  return (
    <div className="fixed bg-white size-3 rounded-full pointer-events-none" style={{top: `${mouseY}px`, left: `${mouseX}px`}}>
      
    </div>
  )
}