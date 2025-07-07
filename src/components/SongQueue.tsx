import React from 'react'
import { Music } from "lucide-react";

export default function SongQueue({ children }: { children: React.ReactNode}) {
  return (
    <div 
        className="p-4 gap-4 w-full text-background grow-1 shrink-0 min-w-[250px] rounded-lg flex items-center bg-primary"
    >
        <div className='flex items-center gap-4'>
          <div>
              <Music size={24} strokeOpacity={0.7}/>
          </div>
          <p>{ children }</p>
        </div>
    </div>
  )
}
