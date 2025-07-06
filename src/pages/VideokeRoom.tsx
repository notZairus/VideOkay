import Header from "@/components/Header";
import {useRef } from "react";


export default function VideokeRoom() {
    const iframeRef = useRef(null);



    return (
        <div className="w-full min-h-dvh bg-gray-200 pb-12">
            <Header />

            <main className="w-full lg:max-w-5/6 max-w-11/12 mt-8 mx-auto">
                <div className="flex gap-8 flex-col lg:flex-row">
                    <div>
                        <p className="text-xl">Now Playing</p>
                        <div className="lg:w-[600px] w-full aspect-16/9 mt-2 bg-black/10 rounded overflow-hidden" ref={iframeRef}>
                            {/* For youtube i frame */}
                            <iframe
                                src={`https://www.youtube.com/embed/zRgiBWcxBYg`}
                                title="YouTube video"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="w-full h-full"
                            ></iframe>
                        </div>
                    </div>
                    <div className="flex-1 flex flex-col">
                        <p className="text-xl">Comments.</p>
                        <div className="w-full min-h-20 flex-1 border bg-white shadow-primary/10 shadow mt-2 rounded">
                            {/* for comments */}
                        </div>
                    </div>
                </div>
                <div className="w-full mt-4">
                    <p className="text-xl">Queue:</p>
                    <div className="flex flex-col md:flex-row lg:flex-row items-center bg-primary lg:items-start min-h-24 mt-2 rounded gap-2 flex-wrap">
                        {/* song queue */}
                    </div>
                </div>

            </main>

        </div>
    )
}