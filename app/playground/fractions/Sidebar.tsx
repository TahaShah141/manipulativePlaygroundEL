import { Button } from "@/components/ui/button"
import { FractionState, useAppDispatch } from "@/lib/redux/hooks"
import { clearRows, nextQuestions, toggleFullTray, toggleLabels, toggleScale } from "@/lib/redux/slices/FractionSlice"

type SidebarProps = {

}

const modes = [
  'sandbox',
  'fill the gaps',
  'comparisons',
]

export const Sidebar: React.FC<SidebarProps> = ({}) => {

  const { labels, scale, fullTray } = FractionState()
  const dispatch = useAppDispatch()

  return (
    <div className='flex flex-col w-72 justify-between gap-4'>
      <div className='flex flex-col gap-2 bg-neutral-900 p-2 rounded-md'>
        <h1 className="text-3xl text-center">Fraction Board</h1>
      </div>

      <div className="flex flex-col p-2 px-4 bg-neutral-900 rounded-md gap-2">
        <p className="text-2xl text-center">Controls</p>
        <Button variant={"default"} className='' onClick={() => dispatch(clearRows())}>Clear All</Button>
        <Button variant={"default"} className='' onClick={() => dispatch(nextQuestions())}>New Questions</Button>
        <Button variant={"default"} className='' onClick={() => dispatch(toggleLabels())}>{`${labels ? "Hide" : "Show"} Labels`}</Button>
        <Button variant={"default"} className='' onClick={() => dispatch(toggleScale())}>{scale === 1 ? "Set Large" : "Set Small"}</Button>
        <Button variant={"default"} className='' onClick={() => dispatch(toggleFullTray())}>{fullTray ? "Show Less" : "Show Full"}</Button>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-2xl text-center">Modes</p>
        {modes.map(m => <Button variant={"outline"} className="capitalize">{m}</Button>)}
      </div>
    </div>
  )
}
