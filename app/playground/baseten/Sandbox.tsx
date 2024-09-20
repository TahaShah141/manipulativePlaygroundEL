import { ScrollArea } from "@/components/ui/scroll-area"
import { BaseTenState } from "@/lib/redux/hooks"
import { Blocks } from "@/lib/types"
import { getNum, groupOnes } from "@/lib/utils"
import { useDroppable } from "@dnd-kit/core"
import { useEffect, useState } from "react"
import { BaseTenBlock } from "./BaseTenBlock"

type SandboxProps = {
}

export const Sandbox: React.FC<SandboxProps> = () => {
  
  const { blocks, sorting, grouping } = BaseTenState()
  const { isOver, setNodeRef: dropRef } = useDroppable({ id: 'sandbox' })

  const [displayBlocks, setDisplayBlocks] = useState<Blocks>(blocks)

  useEffect(() => {
    grouping ? 
    setDisplayBlocks(groupOnes(sorting ? [...blocks].sort((a, b) => getNum(b.type) - getNum(a.type)) : blocks)) :
    setDisplayBlocks(sorting ? [...blocks].sort((a, b) => getNum(b.type) - getNum(a.type)) : blocks)
  }, [blocks, sorting, grouping])

  return (

    <ScrollArea ref={dropRef} className={`h-[calc(100vh-16px)] lg:h-[calc(100vh-32px)] xl:h-[calc(100vh-64px)] rounded-lg lg:p-2 xl:p-4 flex-1 ${isOver ? "bg-neutral-700" : "bg-neutral-800"}`}>
      <div className={`p-1 flex flex-col`}>
        <div className='gap-1 xl:gap-2 flex flex-wrap'>
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
  )
} 