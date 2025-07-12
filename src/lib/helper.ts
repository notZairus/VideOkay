import { deleteDoc, doc, collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseClient";


export async function deleteRoomOnDb(id: string) {
    if (!id) {
        console.error("Room ID is required to delete the room.");
        return;
    }
    
    const members = await getDocs(collection(db, `rooms/${id}/members`));
    members.forEach(async (member) => {
        console.log(member);
        await deleteDoc(member.ref);
    })

    const queue = await getDocs(collection(db, `rooms/${id}/queue`));
    queue.forEach(async (song) => {
        await deleteDoc(song.ref);
    })

    const prevUserId = id;
    await deleteDoc(doc(db, "rooms", prevUserId as string));
}