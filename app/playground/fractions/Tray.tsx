import { FractionBlock } from "./FractionBlock"

export const fractionColors = [
  'bg-pink-50', 
  'bg-pink-100',
  'bg-pink-200',
  'bg-pink-300',
  'bg-pink-400',
  'bg-pink-500',
  'bg-pink-600',
  'bg-pink-700',
  'bg-pink-800',
  'bg-pink-900',
  'bg-pink-950',
].reverse()

export const Tray = () => {
  return (
    <div className="w-[600px] flex flex-col">
      {Array.from({ length: 11 }, (_, row) =>
        <div className='bg-neutral-800 flex overflow-x-visible'>
          {Array.from({ length: row+2 }, (_, i) => (
            <FractionBlock fraction={{
              id: `${row}-${i}`,
              type: row+2,
              selected: false,
              disabled: false,
              source: 'tray'
            }} />
          ))}
        </div>
      )}
    </div>
  )
}
