import { Button } from "@/components/ui/button"
import { FractionState, useAppDispatch } from "@/lib/redux/hooks"
import { changeMode, clearRows, nextQuestions, toggleColors, toggleFullTray, toggleLabels, toggleScale } from "@/lib/redux/slices/FractionSlice"

type SidebarProps = {

}

const modes = [
  'sandbox',
  'fill the gaps',
  'comparisons',
]

export const Sidebar: React.FC<SidebarProps> = ({}) => {

  const { labels, colors, scale, fullTray, mode: currentMode } = FractionState()
  const dispatch = useAppDispatch()

  return (
    <div className='flex flex-col w-72 justify-between gap-4'>
      <div className='flex flex-col gap-2 bg-neutral-900 p-2 rounded-md'>
        <h1 className="text-3xl text-center">Fraction Board</h1>
      </div>

      <div className="flex flex-col p-4 bg-neutral-900 rounded-md gap-2">
        <Button variant={"secondary"} className='' onClick={() => dispatch(clearRows())}>Clear All</Button>
        <Button variant={"secondary"} className='' onClick={() => dispatch(toggleColors())}>{`${colors ? "Hide" : "Show"} Colors`}</Button>
        <Button variant={"secondary"} className='' onClick={() => dispatch(toggleLabels())}>{`${labels ? "Hide" : "Show"} Labels`}</Button>
        <Button variant={"secondary"} className='' onClick={() => dispatch(toggleFullTray())}>{fullTray ? "Show Each Block" : "Show Full Tray"}</Button>
        <Button variant={"secondary"} className='' onClick={() => dispatch(toggleScale())}>{scale === 1 ? "Set Large" : "Set Small"}</Button>
        {currentMode !== 'sandbox' && <Button variant={"secondary"} className='' onClick={() => dispatch(nextQuestions())}>New Questions</Button>}
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-2xl text-center">Modes</p>
        {modes.map(mode => <Button key={mode} variant={mode === currentMode ? "default" : "outline"} onClick={() => dispatch(changeMode({mode}))} className="capitalize">{mode}</Button>)}
      </div>
    </div>
  )
}
