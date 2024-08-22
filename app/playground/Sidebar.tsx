import { Button } from "@/components/ui/button"
import { MainState, useAppDispatch } from "@/lib/redux/hooks"
import { clearBoard, randomizeBoard, toggleDisplay, toggleGrouping, toggleSorting } from "@/lib/redux/slices/mainSlice"
import { getWholeSum } from "@/lib/utils"

type SidebarProps = {
}

export const Sidebar: React.FC<SidebarProps> = () => {

  const { display, blocks, sorting, grouping } = MainState()
  const dispatch = useAppDispatch()

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-neutral-800 rounded-lg flex flex-col gap-4 p-4 w-96">
        <h1 className='text-3xl font-bold font-mono text-white text-center'>Base-10 Blocks</h1>
        <h4 className={`text-center text-7xl font-mono ${!display && "text-neutral-700"}`}>{!display ? "???" : getWholeSum(blocks)}</h4>
        <Button onClick={() => dispatch(clearBoard())}>Clear Board</Button>
        <Button onClick={() => dispatch(randomizeBoard())}>Randomize</Button>
      </div>

      <div className="bg-neutral-900 rounded-lg flex flex-col gap-4 p-4 w-96">
        <Button variant={"secondary"} onClick={() => dispatch(toggleDisplay())}>{`${!display ? "Show" : "Hide"} Sum`}</Button>
        <Button variant={"secondary"} onClick={() => dispatch(toggleSorting())}>{`${sorting ? "Disable" : "Enable"} Sorting`}</Button>
        <Button variant={"secondary"} onClick={() => dispatch(toggleGrouping())}>{`${grouping ? "Disable" : "Enable"} Grouping`}</Button>
      </div>
    </div>
  )
}
