import Header from "@/components/Header";
import SongQueue from "@/components/SongQueue";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Button } from "@/components/ui/button";
import Modal from "@/components/Modal";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import type { Song } from "@/ts/types";


declare global {
    interface Window {
        onYouTubeIframeAPIReady: () => void,
    }
}

declare var YT: any;


export default function VideokeRoom() {
    const { register, handleSubmit, reset } = useForm<{ search: string }>();
    const [searchingSong, setSearchingSong] = useState<boolean>(false);
    const [searchResult, setSearchResult] = useState([]);
    const [queue, setQueue] = useState<Song[]>([]);
    const [currentSong, setCurrentSong] = useState<Song>({
        id: "rW2541x8VzY",
        title: "Piano Man",
        thumbnail: "",
        channel: ""
    });
    const [videoPlayer, setVideoPlayer] = useState<any>();

    function search(data: { search: string }) {
        axios(`https://www.googleapis.com/youtube/v3/search?videoEmbeddable=true&maxResults=5&key=${import.meta.env.VITE_YOUTUBE_API_KEY}&part=snippet&q=${data.search + "karaoke"}&type=video`)
        .then(response => setSearchResult(response.data.items));
    }

    function addToQueue(song: any) {
        let newSong: Song = {
            id: song.id.videoId,
            title: song.snippet.title,
            thumbnail: song.snippet.thumbnails.default.url,
            channel: song.snippet.channelTitle
        }

        if (!currentSong) {
            setCurrentSong(newSong);
            return;
        }

        setQueue([...queue, newSong]);

        setSearchingSong(false);
        setSearchResult([]);
        reset()
    }

    useEffect(() => {
        function handleVideoEnded() {
            if (queue.length === 0)return;

            let nextSong = queue[0];
            setCurrentSong(nextSong);
            setQueue(queue.slice(1));
        }

        document.addEventListener('vidEnded', handleVideoEnded)

        return () => {
            removeEventListener('vidEnded', handleVideoEnded);
        }
    }, [queue]);

    useEffect(() => {
        if (!videoPlayer) return;
        videoPlayer.loadVideoById(currentSong.id);
    }, [currentSong]);


    useEffect(() => {
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";

        if (!document.getElementById('youtube-iframe-api')) {
            const tag = document.createElement('script');
            tag.id = 'youtube-iframe-api';
            tag.src = "https://www.youtube.com/iframe_api";
            document.body.appendChild(tag);
        }

        let player: any;

        window.onYouTubeIframeAPIReady = () => {
            player = new YT.Player('player', {
                width: 36*16,
                height: 36*9,
                videoId: currentSong.id,
                playerVars: {
                    'playsinline': 1,
                    'rel': 0,
                },
                events: {
                    'onReady': (e: any) => { e.target.playVideo() },
                    'onStateChange': (e: any) => {
                        if (e.data === YT.PlayerState.ENDED) {
                            document.dispatchEvent(new CustomEvent('vidEnded'));
                        }
                    }
                }
            });
            setVideoPlayer(player);
        }

        return () => {
            if (player && typeof player.destroy === 'function') {
                player.destroy();
            }
        };
    }, []);


    return (
        <>
            <Modal isOpen={searchingSong} handleClose={() => {
                setSearchingSong(false);
                setSearchResult([]);
                reset();
            }}>
                <div className="w-xs md:w-md lg:w-lg bg-white rounded p-4 pt-2">
                    <h1 className="text-xl font-semibold">Search Songs</h1>
                    <div className="mt-2">
                        <form onSubmit={handleSubmit(search)}>
                            <Input {...register('search')} />
                        </form>
                    </div>
                    <div className="mt-4 space-y-1">
                        {
                            searchResult.map((result: any) => (
                                <div className="border rounded p-2" onClick={() => addToQueue(result)} key={result.id.videoId}>
                                    {result.snippet.title}
                                </div>
                            ))
                        }
                    </div>
                </div>
            </Modal>

            <div className="w-full min-h-dvh bg-gray-200 pb-12">
                <Header />
                
    
                <main className="w-full lg:max-w-5/6 max-w-11/12 mt-8 mx-auto">
                    <div className="flex gap-8 flex-col lg:flex-row">
                        <div>
                            <p className="text-xl">Now Playing</p>
                            <div className="lg:w-[600px] w-full aspect-16/9 mt-2 bg-black/80 rounded overflow-hidden flex items-center justify-center" id="player">
                                {!currentSong && <p className="text-white text-center pt-4 text-2xl">No song selected</p>}
                            </div>
                        </div>
                        <div className="flex-1 flex flex-col">
                            <div>
                                <p className="text-xl">Queue.</p>
                                <div className="p-4 bg-background mt-2 rounded">
                                    <div className="w-full scroll-hidden max-h-[200px] relative min-h-20 space-y-2 flex-1 rounded overflow-y-scroll">
                                        {
                                            queue.map((song, index) => (
                                                <SongQueue key={index}>{song.title}</SongQueue>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4">
                                <Button className="w-full text-2xl py-7" size={'lg'} onClick={() => setSearchingSong(true)}>
                                    Search
                                </Button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}