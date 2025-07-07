


export function playYoutubeVideo(videoId: string) {
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
}