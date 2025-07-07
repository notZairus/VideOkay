import Header from "@/components/Header";
import YoutubeIFrame from "@/components/YoutubeIFrame";
import SongQueue from "@/components/SongQueue";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Button } from "@/components/ui/button";
import Modal from "@/components/Modal";
import { useState } from "react";
import { Input } from "@/components/ui/input";



interface UseFormData {
    search: string
}

export default function VideokeRoom() {
    const { register, handleSubmit, reset } = useForm<UseFormData>();
    const [searchingSong, setSearchingSong] = useState<boolean>(false);
    const [searchResult, setSearchResult] = useState<any[]>([]);
    const [queue, setQueue] = useState<any[]>([]);

    function search(data: UseFormData) {
        axios(`https://www.googleapis.com/youtube/v3/search?maxResults=5&key=${import.meta.env.VITE_YOUTUBE_API_KEY}&part=snippet&q=${data.search + "karaoke"}&type=video`)
        .then(response => setSearchResult(response.data.items));
    }

    console.log(queue);

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
                            searchResult.map((result) => (
                                <div className="border rounded p-2" onClick={() => setQueue([...queue, result])}>
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
                            <YoutubeIFrame videoId={"m9PFo_8eKnM"}/>
                        </div>
                        <div className="flex-1 flex flex-col">
                            <div>
                                <p className="text-xl">Queue.</p>
                                <div className="p-4 bg-background mt-2 rounded">
                                    <div className="w-full scroll-hidden max-h-[200px] relative min-h-20 space-y-2 flex-1 rounded overflow-y-scroll">
                                        {
                                            queue.map((song, index) => (
                                                <SongQueue key={index}>{song.snippet.title}</SongQueue>
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
                    {/* <div className="w-full mt-4">
                        <p className="text-xl">Queue:</p>
                        <div className="flex flex-col md:flex-row lg:flex-row items-center bg-primary lg:items-start min-h-24 mt-2 rounded gap-2 flex-wrap">
                            
                        </div>
                    </div> */}
                </main>
            </div>
        </>
    )
}