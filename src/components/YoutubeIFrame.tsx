import { useEffect } from 'react'




export default function YoutubeIFrame({ videoId = "r50u7AlzwJQ" }: { videoId: string }) {

    useEffect(() => {
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";

        document.body.appendChild(tag);

        var player;

        window.onYouTubeIframeAPIReady = () => {
            player = new YT.Player('player', {
                width: 36*16,
                height: 36*9,
                videoId: videoId,
                playerVars: {
                    'playsinline': 1
                },
                events: {
                    'onReady': (e) => { e.target.playVideo() }
                }
            });
        }
    }, []);
    
    return (
        <>
            <p className="text-xl">Now Playing</p>
            <div className="lg:w-[600px] w-full aspect-16/9 mt-2 bg-black/10 rounded overflow-hidden" id="player">
                {/* For youtube i frame */}
            </div>
        </>
    )
}
