declare global {
    interface Window {
        onYouTubeIframeAPIReady: () => void;
    }
}

declare var YT: any;

export function playYoutubeVideo(videoId: string) {
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";

    document.body.appendChild(tag);

    window.onYouTubeIframeAPIReady = () => {
        const player = new YT.Player('player', {
            width: 36*16,
            height: 36*9,
            videoId: videoId,
            playerVars: {
                'playsinline': 1
            },
            events: {
                'onReady': (e: any) => { e.target.playVideo() },
                'onStateChange': (e: any) => {
                    if (e.data === YT.PlayerState.ENDED) {
                        // Handle video end
                        console.log("Video ended");
                    }
                }
            }
        });
    }
}