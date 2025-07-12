import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { type UseFormProps } from "react-hook-form"
import { collection, doc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebaseClient"

interface FormType extends UseFormProps {
    room_code: string
}


export default function Welcome() {
    const { register, handleSubmit, formState: { errors }, setError } = useForm<FormType>();
    const navigate = useNavigate();

    async function onSubmit(data: FormType) {
        const roomCode = data.room_code;

        const room = await getDoc(doc(db, "rooms", roomCode));

        console.log("room", room.data());
        
        if (!room.exists()) {
            setError('room_code', {
                type: 'manual',
                message: 'Room does not exist.'
            })
            return;
        }

        navigate('/name_getter', {
            state: {
                isAdmin: false,
                roomCode: roomCode,
                roomData: room.data()
            }
        });
    }


    return (
        <div className="w-full min-h-dvh bg-background p-8 flex items-center justify-center">
            <div className="lg:max-w-3/5 w-full bg-red-4000 mx-auto flex flex-col items-center">

                <div className="text-center">
                    <h1 className="text-6xl font-mada font-bold">
                        VideOkay
                    </h1>
                    <p className="font-lf tracking-wide mt-4 text-xl font-medium">
                        Online Videoke for all!
                    </p>                    
                </div>

                <Separator className="my-8"/>
                
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex items-center flex-col">
                        <Label>Room Code</Label>
                        <Input className="mt-2 text-center" required {...register('room_code')}></Input>
                        {errors.room_code && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.room_code.message}
                            </p>
                        )}
                        <Button className="mt-4" size={"lg"}>Join room</Button>
                    </div>
                </form>

                <div className="my-4 text-center">
                    <p className="text-gray-400">----------  or  ----------</p>
                </div>

                <div>
                    <Link to="/name_getter" state={{ isAdmin: true }}>
                        <Button size="lg">
                            Create new room
                        </Button>
                    </Link>
                </div>


            </div>
        </div>
    )
}
