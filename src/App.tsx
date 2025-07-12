import { BrowserRouter, Routes, Route } from "react-router-dom"
import Welcome from "./pages/Welcome";
import NameGetter from "./pages/NameGetter";
import { QueueProvider } from "./contexts/QueueContext";

import HostRoom from "./pages/HostRoom";


function App() {
  return (
    <QueueProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/name_getter" element={<NameGetter />} />

          <Route path="/host" element={<HostRoom />} />


        </Routes>
      </BrowserRouter>
    </QueueProvider>
  )
}

export default App