import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import { Analytics } from "@vercel/analytics/next";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile/:id" element={<Profile />} />
      </Routes>
      <Analytics />
    </BrowserRouter>
  );
}

export default App;