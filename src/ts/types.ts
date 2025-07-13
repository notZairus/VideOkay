

export interface User {
    id: string,
    name: string,
    isHost?: boolean
}

export interface Video {
    id: string,
    title: string,
    thumbnail: string,
    queuedBy?: User,
}