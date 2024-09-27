import { ChevronLeft, ChevronUp } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { BaseTenBlock } from './BaseTenBlock'

type TrayProps = {
}

export const Tray: React.FC<TrayProps> = () => {
  
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setTimeout(() => setOpen(true), 1000)
  }, [])

  const defaultBlockOptions = {
    disabled: false,
    selected: false,
    source: "tray"
  }

  return (
    <div onClick={() => setOpen(!open)} className={`fixed left-2 lg:left-4 xl:left-8 bottom-4 w-48 lg:w-64 xl:w-72 transition-transform duration-500 ${!open && "translate-y-full"}`}>
      <div className='relative flex justify-center gap-2 p-2 py-4 bg-neutral-100 rounded-lg'>
        <div className="absolute text-black top-0 right-0 -translate-y-1/2 bg-white flex justify-center items-center w-full rounded-lg">
          <ChevronUp className={`size-7 transition-transform duration-300 delay-200 ${open && "rotate-180"}`} />
        </div>
        <div className="flex flex-col">
          {Array.from({length: 10}, (_, i) => <BaseTenBlock key={`block-${i}`} block={{...defaultBlockOptions, id: `ONES-${i}`, type: "ONES"}} />)}
        </div>
        <BaseTenBlock block={{...defaultBlockOptions, id: `TENS`, type: "TENS"}} />
        <BaseTenBlock block={{...defaultBlockOptions, id: `HUNDREDS`, type: "HUNDREDS"}} />
      </div>
    </div>
  )
}
