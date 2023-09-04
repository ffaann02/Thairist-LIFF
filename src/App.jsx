import { useEffect, useState } from "react";
import liff from "@line/liff";
import "./App.css";
import Planner from "./components/Planner";
import Navbar from "./components/Navbar";
import Topbar from "./components/Topbar";
import Workshop from "./components/Workshop";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Home from "./components/Home";
import Point from "./components/Point";
import CameraComponent from "./components/Camera";
function App() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    liff
      .init({
        liffId: import.meta.env.VITE_LIFF_ID
      })
      .then(() => {
        setMessage("LIFF init succeeded.");
      })
      .catch((e) => {
        setMessage("LIFF init failed.");
        setError(`${e}`);
      });
  },[]);

  return (
    <div className="w-full h-full min-h-screen relative max-w-4xl mx-auto">
      <Router>
        <Navbar/>
        <Topbar/>
        <Routes>
          <Route path="/planner" element={<Planner/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/workshop" element={<Workshop/>}/>
          <Route path="/points" element={<Point/>}/>
          <Route path="/points/camera" element={<CameraComponent/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
