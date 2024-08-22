import { ChevronLeft } from 'lucide-react'
import React, { useState } from 'react'
import { BaseTenBlock } from '../components/custom/BaseTenBlock'

type TrayProps = {
}

export const Tray: React.FC<TrayProps> = () => {
  
  const [open, setOpen] = useState(true)

  const defaultBlockOptions = {
    disabled: false,
    selected: false
  }

  return (
    <div className={`fixed bottom-4 left-4 transition-transform duration-500 ${!open && "-translate-x-full"}`}>
      <div className='relative flex gap-4 p-4 bg-neutral-100 rounded-lg'>
        <div onClick={() => setOpen(!open)} className="absolute text-black top-1/2 right-0 translate-x-1/2 flex justify-center items-center -translate-y-1/2 h-full bg-white rounded-lg">
          <ChevronLeft className={`size-7 transition-transform duration-300 delay-200 ${!open && "rotate-180"}`} />
        </div>
        <div className="flex flex-col">
          {Array.from({length: 10}, (_, i) => <BaseTenBlock block={{...defaultBlockOptions, id: `ONES-${i}`, type: "ONES"}} />)}
        </div>
        <BaseTenBlock block={{...defaultBlockOptions, id: `TENS`, type: "TENS"}} />
        <BaseTenBlock block={{...defaultBlockOptions, id: `HUNDREDS`, type: "HUNDREDS"}} />
      </div>
    </div>
  )
}
