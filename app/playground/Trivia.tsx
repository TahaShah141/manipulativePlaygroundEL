import { ScrollArea } from "@/components/ui/scroll-area"
import { useDroppable } from "@dnd-kit/core"
import { BaseTenBlock } from "../components/custom/BaseTenBlock"
import { MainState } from "@/lib/redux/hooks"
import { useEffect, useState } from "react"
import { getNum, groupOnes } from "@/lib/utils"
import { Block, Blocks } from "@/lib/types"

type TriviaProps = {
}

export const Trivia: React.FC<TriviaProps> = () => {
  
  const { blocks, sorting, grouping } = MainState()
  const { isOver, setNodeRef: dropRef } = useDroppable({ id: 'trivia' })

  const workingBlocks = blocks
  const [displayBlocks, setDisplayBlocks] = useState<Blocks>(workingBlocks)

  useEffect(() => {
    grouping ? 
    setDisplayBlocks(groupOnes(sorting ? [...workingBlocks].sort((a, b) => getNum(b.type) - getNum(a.type)) : workingBlocks)) :
    setDisplayBlocks(sorting ? [...workingBlocks].sort((a, b) => getNum(b.type) - getNum(a.type)) : workingBlocks)
  }, [workingBlocks, sorting, grouping])

  return (

    <ScrollArea ref={dropRef} className={`h-[calc(100vh-64px)] rounded-lg p-4 flex-1 ${isOver ? "bg-neutral-700" : "bg-neutral-800"}`}>
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
  )
} 