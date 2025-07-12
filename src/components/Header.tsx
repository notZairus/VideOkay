import { useLocation } from "react-router-dom";
import { ChevronLeftIcon } from "lucide-react";

export default function Header() {
  const { state: { roomCode } } = useLocation();

  return (
    <header className="w-full h-20 bg-white shadow flex px-8 items-center justify-between">
        <div>
            <div className="cursor-pointer">
              <ChevronLeftIcon size={40} />
            </div>
        </div>
        <p className="text-3xl font-semibold font-mada">
            VideOkay
        </p>
        <p className="text-lg font-lf">
            {roomCode}
        </p>
    </header>
  )
}
