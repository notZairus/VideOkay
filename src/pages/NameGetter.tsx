import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form";
import type { User } from "@/ts/types";
import { nanoid } from 'nanoid';
import { doc, setDoc, deleteDoc, getDocs, collection } from "firebase/firestore";
import { db } from "@/lib/firebaseClient";
import { useNavigate } from "react-router-dom";

type FormType = {
    user_name: string 
};


export default function NameGetter() {
    const { register, handleSubmit, formState: { errors } } = useForm<FormType>();
    const navigate = useNavigate();

    
    async function clearPreviousRoom() {
        if (!localStorage.getItem("user_id")) return;

        const members = await getDocs(collection(db, `rooms/${localStorage.getItem('user_id')}/members`));
        members.forEach(async (member) => {
            console.log(member);
            await deleteDoc(member.ref);
        })

        const prevUserId = localStorage.getItem('user_id');
        await deleteDoc(doc(db, "rooms", prevUserId as string));
    }


    async function onSubmit(data: FormType) {
        clearPreviousRoom();
        
        const user: User = {
            id: nanoid(12),
            name: data.user_name,
        }

        try {
            await setDoc(doc(db, "rooms", user.id), { 
                admin: {...user}, 
                created_at: new Date().toISOString() 
            });
            
            await setDoc(doc(db, `rooms/${user.id}/members`, user.id), { 
                ...user, 
                joined_at: new Date().toISOString() 
            });
        }  
        catch(e) {
            console.log("error adding document");
        }

        localStorage.setItem('user_id', user.id);
        navigate(`/room/${user.id}`);
    } 

    return (
        <div className="w-full min-h-dvh bg-background p-8 flex items-center justify-center">
            <div className="lg:max-w-3/5 w-full bg-red-4000 mx-auto flex flex-col items-center">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex items-center flex-col">
                        <Label>Enter your name:</Label>
                        <Input 
                            className="mt-2 text-center" 
                            placeholder="John Doe" 
                            {...register('user_name', {
                                required: "name is required.",
                                minLength: {
                                    value: 4,
                                    message: "name requires more than 3 characters."
                                }
                            })}
                            required
                        />
                        { errors.user_name && <p className="text-sm mt-2 text-red-600">{errors.user_name.message}</p>}
                        <Button className="mt-4" size={"lg"}>Continue</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
