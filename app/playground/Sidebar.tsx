import { Button } from "@/components/ui/button"
import { MainState, useAppDispatch } from "@/lib/redux/hooks"
import { clearBoard, clearSelected, deleteSelected, groupSelected, randomizeBoard, splitSelected, toggleDisplay, toggleGrouping, toggleSorting } from "@/lib/redux/slices/mainSlice"
import { getNum, getType, getWholeSum } from "@/lib/utils"

type SidebarProps = {
}

export const Sidebar: React.FC<SidebarProps> = () => {

  const { display, blocks, sorting, grouping } = MainState()
  const dispatch = useAppDispatch()

  const selectedBlocks = blocks.filter(b => b.selected)

  return (
    <div className="flex flex-col gap-4 justify-between h-full">
      <div className="bg-neutral-800 rounded-lg flex flex-col gap-4 p-4 w-96">
        <h1 className='text-3xl font-bold font-mono text-white text-center'>Base-10 Blocks</h1>
        <h4 className={`text-center text-7xl font-mono ${!display && "text-neutral-700"}`}>{!display ? "???" : getWholeSum(blocks)}</h4>
        <Button onClick={() => dispatch(clearBoard())}>Clear Board</Button>
        <Button onClick={() => dispatch(randomizeBoard())}>Randomize</Button>
      </div>

      <div className="bg-neutral-900 rounded-lg grid grid-cols-2 gap-4 p-4 w-96">
        <Button disabled={selectedBlocks.length === 0 || selectedBlocks.every(b => b.type === "ONES")} onClick={() => dispatch(splitSelected())}>{`Split Selected`}</Button>
        <Button disabled={selectedBlocks.length !== 10 || selectedBlocks.some(b => b.type !== selectedBlocks[0].type)} 
        onClick={() => dispatch((groupSelected({type: getType(getNum(selectedBlocks[0].type)*10)})))}>{`Group Selected`}</Button>
        <Button disabled={selectedBlocks.length === 0} onClick={() => dispatch(clearSelected())}>{`Unselect All`}</Button>
        <Button disabled={selectedBlocks.length === 0} onClick={() => dispatch(deleteSelected())}>{`Delete Selected`}</Button>
      </div>

      <div className="bg-neutral-900 rounded-lg flex flex-col gap-4 p-4 w-96">
        <Button variant={"secondary"} onClick={() => dispatch(toggleDisplay())}>{`${!display ? "Show" : "Hide"} Sum`}</Button>
        <Button variant={"secondary"} onClick={() => dispatch(toggleSorting())}>{`${sorting ? "Disable" : "Enable"} Sorting`}</Button>
        <Button variant={"secondary"} onClick={() => dispatch(toggleGrouping())}>{`${grouping ? "Disable" : "Enable"} Grouping`}</Button>
      </div>

    </div>
  )
}
