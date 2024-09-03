import { FractionBlock } from "./FractionBlock"

export const fractionColors = [
  'bg-blue-400', 
  'bg-green-500',
  'bg-yellow-400',
  'bg-red-500',
]

export const Tray = () => {
  return (
    <div className="flex-1 flex flex-col z-10">
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
