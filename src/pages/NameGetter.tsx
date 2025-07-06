import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form";
import type { FormEvent } from "react";


type FormType = {
    user_name: string 
};


export default function NameGetter() {
    const { register, handleSubmit, formState: { errors }} = useForm<FormType>();

    function onSubmit(data: FormType) {
        console.log(data);
        console.log('this is where i stopped. implement it.....')
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
