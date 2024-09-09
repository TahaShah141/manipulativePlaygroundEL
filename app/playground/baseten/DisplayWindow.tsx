import { ScrollArea } from "@/components/ui/scroll-area"
import { Blocks } from "@/lib/types"
import { BaseTenBlock } from "./BaseTenBlock"

type DisplayWindowProps = {
  displayBlocks: Blocks
  height?: string
}

export const DisplayWindow: React.FC<DisplayWindowProps> = ({ displayBlocks, height="h-[calc(100vh-64px)]" }) => {
  return (
    <ScrollArea className={`${height} rounded-lg p-4 flex-1 bg-neutral-800`}>
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
  )
}
