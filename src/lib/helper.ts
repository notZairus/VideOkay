import { doc, collection, getDocs, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebaseClient";
import type {Video} from "@/ts/types";


export async function setRemoteCurrentVideo(roomCode: string, param: Video | null) {
    let roomSnapshot = await getDoc(doc(db, `rooms/${roomCode}`));

    await setDoc(roomSnapshot.ref, {
        ...roomSnapshot.data(),
        currentVideo: param,
    })
}

export async function setRemoteQueue(roomCode: string, queue: Video[]) {
    let roomSnapshot = await getDoc(doc(db, `rooms/${roomCode}`));

    await setDoc(roomSnapshot.ref, {
        ...roomSnapshot.data(),
        queue: queue
    })
} 