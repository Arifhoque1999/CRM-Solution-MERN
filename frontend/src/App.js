import "./App.css";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import MainBody from "./components/Home/MainBody";
import WelCome from "./components/welcome/WelCome";
import { useEffect } from "react";
import Inventory from "./components/Inventory/Inventory";
const Routing = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const user = localStorage.getItem("jwt");
    if (!user) {
      navigate("/");
    }
  }, []);
  return (
    <Routes>
      <Route path="/" element={<MainBody />} />
      <Route path="/inventory" element={<Inventory />} />
      <Route path="/welcomePage" element={<WelCome />} />
      {/* <Route path="/createorder" element={<CreateOrder />} />
      <Route path="/confirmedorder" element={<Confirmedorder />} /> */}
    </Routes>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routing />
    </BrowserRouter>
  );
}

export default App;
