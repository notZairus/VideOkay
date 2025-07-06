import { Link } from "react-router-dom";
import { ChevronLeftIcon } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full h-20 bg-white shadow flex px-8 items-center">
        <div>
            <Link to="/" ><ChevronLeftIcon size={40} /></Link>
        </div>
        <p className="mx-auto text-3xl font-semibold font-mada">
            VideOkay
        </p>
    </header>
  )
}
