

export interface User {
    id: string,
    name: string,
    isAdmin?: boolean
}

export interface Song {
    id: string,
    title: string,
    thumbnail: string,
    channel?: string,
}