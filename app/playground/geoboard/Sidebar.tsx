import { Button } from "@/components/ui/button"
import { GeoboardState, useAppDispatch } from "@/lib/redux/hooks"
import { addRandomShape, changeMode, clearBoard, toggleFilled } from "@/lib/redux/slices/GeoboardSlice"

type SidebarProps = {

}

const modes = [
  'sandbox',
  'area',
  'perimeter',
]

export const Sidebar: React.FC<SidebarProps> = ({}) => {

  const { mode: currentMode, filled } = GeoboardState()
  const dispatch = useAppDispatch()

  return (
    <div className='flex flex-col w-72 justify-between gap-4'>
      <div className='flex flex-col gap-2 bg-neutral-900 p-2 rounded-md'>
        <h1 className="text-3xl text-center">Geoboard</h1>
      </div>

      <div className="flex flex-col p-4 bg-neutral-900 rounded-md gap-2">
        <Button variant={"secondary"} className='' onClick={() => dispatch(clearBoard())}>Clear Board</Button>
        <Button variant={"secondary"} className='' onClick={() => dispatch(toggleFilled())}>Toggle Fill</Button>
        {currentMode !== 'sandbox' && <Button variant={"secondary"} className='' onClick={() => dispatch(addRandomShape())}>Get Random Shape</Button>}
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-2xl text-center">Modes</p>
        {modes.map(mode => <Button key={mode} variant={mode === currentMode ? "default" : "outline"} onClick={() => dispatch(changeMode({mode}))} className="capitalize">{mode}</Button>)}
      </div>
    </div>
  )
}
