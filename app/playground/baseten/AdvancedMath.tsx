import { BaseTenState } from "@/lib/redux/hooks"
import { Window } from "./Window"
import { Heights, layouts } from "@/lib/layouts"
import { useEffect, useState } from "react"
import { Block, Blocks } from "@/lib/types"
import { getBlocks, getNum, getType, getWholeSum, groupOnes } from "@/lib/utils"
import { BaseTenBlock } from "./BaseTenBlock"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Edit, EyeIcon } from "lucide-react"

export const AdvancedMath = () => {

  const { blocks, supply, question: Q, grouping, sorting, operator } = BaseTenState()
  const question = Q as [number, number]
  const windowCount = question[1]

  const { windowsPerRow } = layouts[windowCount - 1]

  const [showingAnswer, setShowingAnswer] = useState(false)

  const [displayBlocks, setDisplayBlocks] = useState<Blocks>(blocks)
  const [supplyBlocks, setSupplyBlocks] = useState<Blocks>(supply)

  useEffect(() => {
    const total = operator === '*' ? 
    getWholeSum(blocks) * windowCount :
    getWholeSum(blocks)

    const totalBlocks: Block[] = getBlocks(total).map((n, i) => ({
      id: `displayBlock-${i}`,
      type: getType(n),
      selected: false,
      disabled: false,
      source: "display"
    }))

    grouping ? 
    setDisplayBlocks(groupOnes(sorting ? [...totalBlocks].sort((a, b) => getNum(b.type) - getNum(a.type)) : totalBlocks)) :
    setDisplayBlocks(sorting ? [...totalBlocks].sort((a, b) => getNum(b.type) - getNum(a.type)) : totalBlocks)
    
    grouping ? 
    setSupplyBlocks(groupOnes(sorting ? [...supply].sort((a, b) => getNum(b.type) - getNum(a.type)) : supply)) :
    setSupplyBlocks(sorting ? [...supply].sort((a, b) => getNum(b.type) - getNum(a.type)) : totalBlocks)
  }, [blocks, sorting, grouping, showingAnswer])

  return (
    <div className="relative flex-1">
      <Button onClick={() => setShowingAnswer(!showingAnswer)} size={"icon"} className="absolute z-10 top-0 right-0 bg-white">
        {showingAnswer ? <Edit className="size-6" /> : <EyeIcon className="size-6" />}
      </Button>
      {showingAnswer ? 
      <div className="flex gap-2">
        <ScrollArea className={`h-[calc(100vh-64px)] rounded-lg p-4 flex-1 bg-neutral-800`}>
          <div className={`p-1 flex flex-col`}>
            <div className='gap-2 flex flex-wrap'>
              {displayBlocks.map((block, i) => {
                if (block instanceof Array) {
                  return (
                    <div className="flex flex-col">
                      {block.map((subBlock, j) => <BaseTenBlock block={subBlock} />)}
                    </div>
                  )
                } else {
                  return <BaseTenBlock block={block} />
                }
              })}
            </div>
          </div>
        </ScrollArea>
        {operator === '/' && 
        <ScrollArea className={`h-[calc(100vh-64px)] rounded-lg p-4 flex-1 bg-neutral-800`}>
          <div className={`p-1 flex flex-col`}>
            <div className='gap-2 flex flex-wrap'>
              {supplyBlocks.map((block, i) => {
                if (block instanceof Array) {
                  return (
                    <div className="flex flex-col">
                      {block.map((subBlock, j) => <BaseTenBlock block={subBlock} />)}
                    </div>
                  )
                } else {
                  return <BaseTenBlock block={block} />
                }
              })}
            </div>
          </div>
        </ScrollArea>}
      </div> : 
      <div className="flex-1 h-full flex flex-col gap-2">
        {windowsPerRow.map((row, j)=> (
          <div key={`row-${j}`} className="flex gap-2">
            {Array.from({length: row}, (_, i) => (
              <Window key={`window-${j}-${i}`} id={`window-${j}-${i}`} height={Heights[windowsPerRow.length - 1]} blocks={blocks} />
            ))}
          </div>
        ))}
      </div>}
    </div>
  )
}
