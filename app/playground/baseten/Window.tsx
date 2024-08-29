import { BaseTenState } from "@/lib/redux/hooks"
import { Block, Blocks } from "@/lib/types"
import { groupOnes, getNum } from "@/lib/utils"
import { UniqueIdentifier, useDroppable } from "@dnd-kit/core"
import React, { useEffect, useState } from "react"
import { BaseTenBlock } from "@/components/custom/BaseTenBlock"
import { ScrollArea } from "@/components/ui/scroll-area"

type WindowProps = {
  id: UniqueIdentifier
  blocks: Block[]
  height?: string
}

export const Window: React.FC<WindowProps> = ({id, blocks, height}) => {
  
  const { isOver, setNodeRef: dropRef } = useDroppable({ id })
  const { sorting, grouping } = BaseTenState()

  const workingBlocks = blocks
  const [displayBlocks, setDisplayBlocks] = useState<Blocks>(workingBlocks)

  useEffect(() => {
    grouping ? 
    setDisplayBlocks(groupOnes(sorting ? [...workingBlocks].sort((a, b) => getNum(b.type) - getNum(a.type)) : workingBlocks)) :
    setDisplayBlocks(sorting ? [...workingBlocks].sort((a, b) => getNum(b.type) - getNum(a.type)) : workingBlocks)
  }, [workingBlocks, sorting, grouping])
  
  return (
    <ScrollArea ref={dropRef} className={`${height} rounded-lg p-4 flex-1 ${isOver ? "bg-neutral-700" : "bg-neutral-800"}`}>
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
