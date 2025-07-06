import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Link } from "react-router-dom"


export default function Welcome() {
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
                
                <div className="flex items-center flex-col">
                    <Label>Room Code</Label>
                    <Input className="mt-2 text-center"></Input>
                    <Button className="mt-4" size={"lg"}>Join room</Button>
                </div>

                <div className="my-4 text-center">
                    <p className="text-gray-400">----------  or  ----------</p>
                </div>

                <div>
                    <Link to="/name_getter">
                        <Button size="lg">
                            Create new room
                        </Button>
                    </Link>
                </div>


            </div>
        </div>
    )
}
