import { ScrollArea } from "@/components/ui/scroll-area"
import { useDroppable } from "@dnd-kit/core"
import { BaseTenBlock } from "../components/custom/BaseTenBlock"
import { MainState } from "@/lib/redux/hooks"
import { useEffect, useState } from "react"
import { getNum, groupOnes } from "@/lib/utils"
import { Blocks } from "@/lib/types"

type SandboxProps = {
}

export const Sandbox: React.FC<SandboxProps> = () => {
  
  const { blocks, sorting, grouping } = MainState()
  const { isOver, setNodeRef: dropRef } = useDroppable({ id: 'sandbox' })

  const [displayBlocks, setDisplayBlocks] = useState<Blocks>(blocks)

  useEffect(() => {
    grouping ? 
    setDisplayBlocks(groupOnes(sorting ? [...blocks].sort((a, b) => getNum(a.type) - getNum(b.type)) : blocks)) :
    setDisplayBlocks(sorting ? [...blocks].sort((a, b) => getNum(a.type) - getNum(b.type)) : blocks)
  }, [blocks, sorting, grouping])

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