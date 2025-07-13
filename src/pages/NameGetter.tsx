import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form";
import type { User } from "@/ts/types";
import { nanoid } from 'nanoid';
import { doc, setDoc, addDoc, collection } from "firebase/firestore";
import { db } from "@/lib/firebaseClient";
import { useNavigate, useLocation } from "react-router-dom";

type FormType = {
    user_name: string 
};

export default function NameGetter() {
    const { register, handleSubmit, formState: { errors } } = useForm<FormType>();
    const navigate = useNavigate();
    const { state } = useLocation();


    async function createRoom(data: FormType) {
        const user: User = {
            id: nanoid(12),
            name: data.user_name,
            isHost: state.isAdmin
        }

        try {
            let result = await addDoc(collection(db, `rooms`),{ 
                host: {...user},
                created_at: new Date().toISOString(),
                currentVideo: null,
                queue: [],
            });

            navigate(`/host`, {
                state: { user, roomCode: result.id }
            });
        }  
        catch(e) {
            console.log("error adding document");
            return;
        }
    } 

    return (
        <div className="w-full min-h-dvh bg-background p-8 flex items-center justify-center">
            <div className="lg:max-w-3/5 w-full bg-red-4000 mx-auto flex flex-col items-center">
                <form onSubmit={handleSubmit(state.isAdmin ? createRoom : joinRoom)}>
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
