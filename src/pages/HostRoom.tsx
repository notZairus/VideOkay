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







type SearchType = {
    songTitle: string
}





export default function HostRoom() {
    const [currentVideo, setCurrentVideo] = useState<Video | null>(null);
    const [iFrame, setIFrame] = useState<any | null>();
    const [searchOpen, setSearchOpen] = useState<boolean>(true);
    const { register, handleSubmit, reset } = useForm<SearchType>();

    async function searchVideo(data: SearchType) {
        console.log(data.songTitle);


        axios.get(`https://www.googleapis.com/youtube/v3/search?maxResults=5&key=${import.meta.env.VITE_YOUTUBE_API_KEY}&part=snippet&q=${data.songTitle + " karaoke"}&type=video`)
        .then(response => {
            console.log(response.data);
        })

        // implement tomorrow



        reset();
    }




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
    }, []);

    return (
        <>
            <Modal isOpen={searchOpen} handleClose={() => setSearchOpen(false)}>
                <div className="w-md bg-white rounded-lg px-6 py-4">
                    <h1 className="text-2xl font-semibold">Search</h1>
                    <form onSubmit={handleSubmit(searchVideo)}>
                        <Input 
                            className="mt-2" 
                            {...register('songTitle')}
                        />
                    </form>
                    <div>
                        {
                            //search result
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