import type { Video } from "@/ts/types";

export default function SearchResult({ video, addToQueue }: { video: Video, addToQueue: () => void }) {
  return (
    <div className="p-2 rounded border flex gap-4" onClick={addToQueue}>
        <div className="w-20 aspect-video overflow-hidden rounded">
            <img src={video.thumbnail} alt="thumbnail" className="w-full h-full object-over" />
        </div>
        <p className="flex-1 ">{video.title}</p>
    </div>
  )
}



