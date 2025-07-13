import type {Video} from "@/ts/types.ts";

export default function VideoQueue({ video }: { video: Video }) {
  return (
    <div 
        className="py-4 px-2 w-full gap-4 grow-1 max-h-16 shrink-0 border-2 min-w-[250px] rounded flex items-center overflow-hidden"
    >
        <div className="h-12 object-cover overflow-hidden rounded">
          <img src={video.thumbnail} alt="thumbnail" className="h-full object-cover" />
        </div>
        <p>{ video.title }</p>
    </div>
  )
}
