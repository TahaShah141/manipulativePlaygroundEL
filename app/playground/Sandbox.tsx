import { ScrollArea } from "@/components/ui/scroll-area"
import { Blocks } from "@/lib/types"
import { useDroppable } from "@dnd-kit/core"
import { BaseTenBlock } from "../components/custom/BaseTenBlock"

type SandboxProps = {
  blocks: Blocks
  deleteBlock: (num: number) => void
}

export const Sandbox: React.FC<SandboxProps> = ({ blocks, deleteBlock }) => {
  
  const { isOver, setNodeRef: dropRef } = useDroppable({ id: 'sandbox' })

  return (

    <ScrollArea ref={dropRef} className={`h-[calc(100vh-64px)] rounded-lg p-4 flex-1 ${isOver ? "bg-neutral-700" : "bg-neutral-800"}`}>
      <div className={`rounded-lg flex flex-col`}>
        <div className='gap-2 flex flex-wrap'>
          {blocks.map((block, i) => {
            if (block instanceof Array) {
              return (
                <div className="flex flex-col">
                  {block.map((_, j) => <BaseTenBlock onDelete={deleteBlock} type='ONES' id={`BLOCK-${i}-${j}`} />)}
                </div>
              )
            } else {
              return <BaseTenBlock onDelete={deleteBlock} type={block === 1 ? "ONES" : block === 10 ? "TENS" : "HUNDREDS"} id={`BLOCK-${i}`} />
            }
          })}
        </div>
      </div>
    </ScrollArea>
  )
} 