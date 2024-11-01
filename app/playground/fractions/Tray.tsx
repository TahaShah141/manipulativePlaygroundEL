import { FractionState } from "@/lib/redux/hooks"
import { FractionBlock } from "./FractionBlock"

export const Tray = () => {

  const { fullTray } = FractionState()

  return (
    <div className="flex-1 flex flex-col z-10">
      {Array.from({ length: 12 }, (_, row) =>
        <div key={`row-${row}`} className={`bg-neutral-8 flex overflow-x-visible`}>
          {Array.from({ length: fullTray ? row+1 : 1 }, (_, i) => (
            <FractionBlock key={`block-${row}-${i}`} fraction={{
              id: `${row}-${i}`,
              type: row+1,
              selected: false,
              disabled: false,
              source: 'tray'
            }} />
          ))}
        </div>
      )}
    </div>
  )
}
