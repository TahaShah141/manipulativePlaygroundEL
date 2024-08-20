import { Button } from "@/components/ui/button"
import { randomizeBoard } from "@/lib/utils"

type SidebarProps = {
  blocks: number[]
  setBlocks: React.Dispatch<React.SetStateAction<number[]>>
  hiding: boolean
  setHiding: React.Dispatch<React.SetStateAction<boolean>>
  sorting: boolean
  setSorting: React.Dispatch<React.SetStateAction<boolean>>
  grouping: boolean
  setGrouping: React.Dispatch<React.SetStateAction<boolean>>
}

export const Sidebar: React.FC<SidebarProps> = ({blocks, setBlocks, hiding, setHiding, sorting, setSorting, grouping, setGrouping}) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="bg-neutral-800 rounded-lg flex flex-col gap-4 p-4 w-96">
        <h1 className='text-3xl font-bold font-mono text-white text-center'>Base-10 Blocks</h1>
        <h4 className={`text-center text-7xl font-mono ${hiding && "text-neutral-700"}`}>{hiding ? "???" : (function(arr) {return arr.reduce((sum: number, item: number) => sum + item, 0).toString().padStart(3, '0')})(blocks)}</h4>
        <Button onClick={() => setBlocks([])}>Clear Board</Button>
        <Button onClick={() => setBlocks(randomizeBoard())}>Randomize</Button>
      </div>

      <div className="bg-neutral-900 rounded-lg flex flex-col gap-4 p-4 w-96">
        <Button variant={"secondary"} onClick={() => setHiding(!hiding)}>{`${hiding ? "Show" : "Hide"} Sum`}</Button>
        <Button variant={"secondary"} onClick={() => setSorting(!sorting)}>{`${sorting ? "Disable" : "Enable"} Sorting`}</Button>
        <Button variant={"secondary"} onClick={() => setGrouping(!grouping)}>{`${grouping ? "Disable" : "Enable"} Grouping`}</Button>
      </div>
    </div>
  )
}
