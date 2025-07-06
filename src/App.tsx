import { BrowserRouter, Routes, Route } from "react-router-dom"
import Welcome from "./pages/Welcome";
import NameGetter from "./pages/NameGetter";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/name_getter" element={<NameGetter />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App