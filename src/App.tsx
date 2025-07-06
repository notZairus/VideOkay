import { BrowserRouter, Routes, Route } from "react-router-dom"
import Welcome from "./pages/Welcome";
import NameGetter from "./pages/NameGetter";
import VideokeRoom from "./pages/VideokeRoom";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/name_getter" element={<NameGetter />} />
        <Route path="/room/:roomId" element={<VideokeRoom />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App