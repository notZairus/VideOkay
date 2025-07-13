declare global {
    interface Window {
        onYouTubeIframeAPIReady: () => void
    }
}

declare var YT: any;


import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Modal from "@/components/Modal";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form"
import type { Video } from "@/ts/types.ts";
import axios from "axios";
import SearchResult from "@/components/SearchResult";
import { useLocation } from "react-router-dom";
import { getDoc, doc, collection, addDoc, serverTimestamp, getDocs } from "firebase/firestore";
import { db } from "@/lib//firebaseClient.ts";
import VideoQueue from "@/components/VideoQueue";
import { setRemoteCurrentVideo, setRemoteQueue } from "@/lib/helper";






type SearchType = {
    songTitle: string
}





export default function HostRoom() {
    const { state: { user, roomCode } } = useLocation();
    const [currentVideo, setCurrentVideo] = useState<Video | null>(null);
    const [queue, setQueue] = useState<Video[]>([]);

    const [iFrame, setIFrame] = useState<any | null>();

    // search states
    const { register, handleSubmit, reset } = useForm<SearchType>();
    const [searchOpen, setSearchOpen] = useState<boolean>(false);
    const [searchResult, setSearchResult] = useState<Video[]>([]);

    



    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // FUNCTIONS BELOW

    async function searchVideo(data: SearchType) {
        axios.get(`https://www.googleapis.com/youtube/v3/search?maxResults=5&key=${import.meta.env.VITE_YOUTUBE_API_KEY}&part=snippet&q=${data.songTitle + " karaoke"}&type=video`)
        .then(response => {
            let result: Video[] = [];
            response.data.items.forEach((item: any) => {
                result.push({
                    'id': item.id.videoId,
                    'title': item.snippet.title,
                    'thumbnail': item.snippet.thumbnails.default.url,
                });
            });

            setSearchResult(result);
        })
        reset();
    } 

    async function addToQueue(video: Video) {
        setSearchOpen(false);
        setSearchResult([]);

        let selectedVideo: Video = {
            ...video,
            queuedBy: user
        }

        if (!currentVideo) {
            setCurrentVideo(selectedVideo);
            setRemoteCurrentVideo(roomCode, selectedVideo);
        } else {
            setQueue([...queue, selectedVideo]);
            setRemoteQueue(roomCode, [...queue, selectedVideo]);
        }
    }

    async function playNextVideo() {
        setQueue((prev) => {
            if (prev.length === 0) {
                setCurrentVideo(null);
                setRemoteCurrentVideo(roomCode, null);
                return [];
            }

            setCurrentVideo(prev[0]);
            setRemoteCurrentVideo(roomCode, prev[0]);
            setRemoteQueue(roomCode, prev.slice(1));
            return prev.slice(1);
        })
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // SIDE EFFECTS BELOW

    useEffect(() => {
        getDoc(doc(db, `rooms/${roomCode}`)).then(roomSnapshot => {
            setCurrentVideo(roomSnapshot.data()?.currentVideo as Video);
            setQueue(roomSnapshot.data()?.queue);
        })
    }, []); // fetch currentSong and queue from firebase. I did this so that the data will persist on refresh

    useEffect(() => {
        var tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";

        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

        var player: any;

        window.onYouTubeIframeAPIReady = () => {
            player = new YT.Player('player', {
                height: '390',
                width: '640',
                videoId: 'M7lc1UVf-VE',
                playerVars: {
                    'playsinline': 1
                },
                events: {
                    'onReady': () => {
                        setIFrame(player);
                    },
                }
            });
        }
    }, []); // load and get the youtube iframe.

    useEffect(() => {  
        if (!currentVideo || !iFrame) return;

        iFrame.loadVideoById(currentVideo.id);
    }, [currentVideo, iFrame]); // load the video in iFrame when the currentVideo state change
    


    useEffect(() => {
        if (!iFrame) return;

        iFrame.addEventListener('onStateChange', (e: any) => {
            if (e.data === YT.PlayerState.ENDED) {
                playNextVideo();
            }
        })  
    }, [iFrame]);
    



    return (
        <>
            <Modal isOpen={searchOpen} handleClose={() => setSearchOpen(false)}>
                <div className="w-md bg-white rounded-lg px-6 py-4 pb-8">
                    <h1 className="text-2xl font-semibold">Search</h1>
                    <form onSubmit={handleSubmit(searchVideo)}>
                        <Input 
                            className="mt-2" 
                            {...register('songTitle')}
                        />
                    </form>
                    <div className="space-y-2 mt-4">
                        {
                            searchResult && searchResult.map(video => (
                                <SearchResult video={video} addToQueue={() => addToQueue(video)}/>
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
                                
                            </div>
                        </div>
                        <div className="flex-1 flex flex-col">
                            <div>
                                <p className="text-xl" onClick={() => {console.log(iFrame)}}>Queue.</p>
                                <div className="p-4 bg-background mt-2 rounded">
                                    <div className="w-full scroll-hidden max-h-[200px] relative min-h-20 space-y-2 flex-1 rounded overflow-y-scroll">
                                        {
                                            queue.map((vid) => (
                                                <VideoQueue video={vid} />
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4">
                                <Button className="w-full text-2xl py-7" size={'lg'} onClick={() => setSearchOpen(true)}>
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