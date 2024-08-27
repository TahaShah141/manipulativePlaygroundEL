import { MainState } from "@/lib/redux/hooks"
import { Window } from "./Window"
import { Heights, layouts } from "@/lib/layouts"

export const AdvancedMath = () => {

  const { blocks, operator, question: Q } = MainState()
  const question = Q as [number, number]
  const windowCount = question[1]

  const { windowsPerRow } = layouts[windowCount - 1]

  console.log(windowsPerRow)

  return (
    <div className="flex-1 h-full flex flex-col gap-2">
      {windowsPerRow.map((row, j)=> (
        <div key={`row-${j}`} className="flex gap-2">
          {Array.from({length: row}, (_, i) => (
            <Window key={`window-${j}-${i}`} id={`window-${j}-${i}`} height={Heights[windowsPerRow.length - 1]} blocks={blocks} />
          ))}
        </div>
      ))}
      {/* {Array.from({length: windowCount}, (_, i) => (
        <Window id={`window-${i}`} blocks={blocks} />
      ))} */}
    </div>
  )
}
