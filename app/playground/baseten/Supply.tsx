import { ScrollArea } from "@/components/ui/scroll-area"
import { BaseTenState, useAppDispatch } from "@/lib/redux/hooks"
import { Blocks } from "@/lib/types"
import { groupOnes, getNum } from "@/lib/utils"
import { ChevronUp } from "lucide-react"
import { useState, useEffect } from "react"
import { BaseTenBlock } from "./BaseTenBlock"
import { Button } from "@/components/ui/button"
import { splitSelectedSupply } from "@/lib/redux/slices/BaseTenSlice"

export const Supply = () => {

  const { supply, grouping, sorting } = BaseTenState()
  const [open, setOpen] = useState(false)

  const [displayBlocks, setDisplayBlocks] = useState<Blocks>(supply)
  const selectedSupply = supply.filter(b => b.selected && b.type !== 'ONES')
  const dispatch = useAppDispatch()

  useEffect(() => {
    grouping ? 
    setDisplayBlocks(groupOnes(sorting ? [...supply].sort((a, b) => getNum(b.type) - getNum(a.type)) : supply)) :
    setDisplayBlocks(sorting ? [...supply].sort((a, b) => getNum(b.type) - getNum(a.type)) : supply)
  }, [supply, sorting, grouping])

  useEffect(() => {
    setTimeout(() => setOpen(true), 1000)
  }, [])

  return (
    <div onClick={() => setOpen(!open)} className={`fixed left-2 lg:left-4 xl:left-8 bottom-4 w-64 lg:w-72 xl:w-80 transition-transform duration-500 ${!open && "translate-y-full"}`}>
      <div className='relative flex justify-between p-2 py-4 bg-neutral-100 rounded-lg'>
        <div className="absolute text-black top-0 right-0 -translate-y-1/2 bg-white flex justify-center items-center w-full rounded-lg">
          <ChevronUp className={`size-7 transition-transform duration-300 delay-200 ${open && "rotate-180"}`} />
        </div>
        {selectedSupply.length !== 0 && <Button onClick={() => dispatch(splitSelectedSupply())} variant={'destructive'}>Split Selected</Button>}
        <ScrollArea className={`h-[25vh]`}>
          <div className={`p-1 flex flex-col`}>
            <div className='gap-2 flex flex-wrap'>
              {displayBlocks.map((block, i) => {
                if (block instanceof Array) {
                  return (
                    <div key={`block-${i}`} className="flex flex-col">
                      {block.map((subBlock, j) => <BaseTenBlock key={`subBlock-${i}-${j}`} block={subBlock} />)}
                    </div>
                  )
                } else {
                  return <BaseTenBlock key={`block-${i}`} block={block} />
                }
              })}
            </div>
          </div>
        </ScrollArea> 
      </div>
    </div>
  )
}
