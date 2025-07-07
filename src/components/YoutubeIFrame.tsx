import { playYoutubeVideo } from '@/lib/helper';
import { useEffect } from 'react'




export default function YoutubeIFrame({ videoId = "" }: { videoId?: string }) {

    useEffect(() => {
        if (!videoId) return;
        playYoutubeVideo(videoId);
    }, [videoId]);
    
    return (
        <>
            <p className="text-xl">Now Playing</p>
            <div className="lg:w-[600px] w-full aspect-16/9 mt-2 bg-black/80 rounded overflow-hidden flex items-center justify-center" id="player">
                {!videoId && <p className="text-white text-center pt-4 text-2xl">No song selected</p>}
            </div>
        </>
    )
}
