import React from 'react'
import { Music } from "lucide-react";

export default function SongQueue({ children }: { children: React.ReactNode}) {
  return (
    <div 
        className="p-4 gap-4 w-full md:w-min lg:w-min text-xl text-background grow-1 shrink-0 min-w-[250px] min-h-22 rounded-lg flex items-center justify-center border-3 border-background bg-primary"
    >
        <div>
            <Music size={40} strokeOpacity={0.7}/>
        </div>
        <p>{ children }</p>
    </div>
  )
}
