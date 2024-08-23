import { ScrollArea } from "@/components/ui/scroll-area"
import { useDroppable } from "@dnd-kit/core"
import { BaseTenBlock } from "../components/custom/BaseTenBlock"
import { MainState } from "@/lib/redux/hooks"
import { useEffect, useState } from "react"
import { getNum, groupOnes } from "@/lib/utils"
import { Blocks } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"

type BasicMathProps = {
}

export const BasicMath: React.FC<BasicMathProps> = () => {
  
  const { blocks, sorting, grouping, operator } = MainState()
  
  const operandOneBlocks = blocks.filter(b => b.source === 'operandOne')
  const operandTwoBlocks = blocks.filter(b => b.source === 'operandTwo')
  const { isOver: isOverOne, setNodeRef: dropRefOne } = useDroppable({ id: 'operandOne' })
  const { isOver: isOverTwo, setNodeRef: dropRefTwo } = useDroppable({ id: 'operandTwo' })

  const [displayBlocksOne, setDisplayBlocksOne] = useState<Blocks>(operandOneBlocks)
  const [displayBlocksTwo, setDisplayBlocksTwo] = useState<Blocks>(operandTwoBlocks)

  useEffect(() => {
    grouping ? 
    setDisplayBlocksOne(groupOnes(sorting ? [...operandOneBlocks].sort((a, b) => getNum(a.type) - getNum(b.type)) : operandOneBlocks)) :
    setDisplayBlocksOne(sorting ? [...operandOneBlocks].sort((a, b) => getNum(a.type) - getNum(b.type)) : operandOneBlocks)
  }, [blocks, sorting, grouping])
  
  useEffect(() => {
    grouping ? 
    setDisplayBlocksTwo(groupOnes(sorting ? [...operandTwoBlocks].sort((a, b) => getNum(a.type) - getNum(b.type)) : operandTwoBlocks)) :
    setDisplayBlocksTwo(sorting ? [...operandTwoBlocks].sort((a, b) => getNum(a.type) - getNum(b.type)) : operandTwoBlocks)
  }, [blocks, sorting, grouping])

  return (
    <div className="flex relative flex-col flex-1 gap-2">
      <Button size="icon" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 p-2 rounded-full"><PlusIcon className="size-12" /></Button>
      <ScrollArea ref={dropRefOne} className={`h-[calc(50vh-36px)] rounded-lg p-4 ${isOverOne ? "bg-neutral-700" : "bg-neutral-800"}`}>
        <div className={`p-1 flex flex-col`}>
          <div className='gap-2 flex flex-wrap'>
            {displayBlocksOne.map((block, i) => {
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
      <ScrollArea ref={dropRefTwo} className={`h-[calc(50vh-36px)] rounded-lg p-4 ${isOverTwo ? "bg-neutral-700" : "bg-neutral-800"}`}>
        <div className={`p-1 flex flex-col`}>
          <div className='gap-2 flex flex-wrap'>
            {displayBlocksTwo.map((block, i) => {
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
    </div>
  )
} 