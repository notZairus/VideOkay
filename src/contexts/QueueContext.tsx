import { createContext, useContext, useState } from "react";
import type { Song } from "@/ts/types";


type QueueContextType = {
    queue: Song[],
    setQueue: React.Dispatch<React.SetStateAction<Song[]>>,
}

const initialQueueContext: QueueContextType = {
    queue: [],
    setQueue: () => {},
}

const QueueContext = createContext<QueueContextType>(initialQueueContext);


export function QueueProvider({ children }: { children: React.ReactNode }) {
    const [queue, setQueue] = useState<Song[]>([]);

    return (
        <QueueContext.Provider value={{ queue, setQueue }}>
            {children}
        </QueueContext.Provider>
    );
}

export function useQueueContext() {
    const context = useContext(QueueContext);
    if (!context) {
        throw new Error("useQueueContext must be used within a QueueProvider");
    }
    return context;
}