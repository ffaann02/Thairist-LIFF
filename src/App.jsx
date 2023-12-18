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
import PlannerSearch from "./components/PlannerSearch";
function App() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [userProfile, setUserProfile] = useState();

  useEffect(() => {
    liff.init({ liffId: import.meta.env.VITE_LIFF_ID })
      .then(() => {
        setMessage("LIFF init succeeded.");
      })
      .catch((e) => {
        setMessage("LIFF init failed.");
        setError(`${e}`);
      });
    liff
      .getProfile()
      .then((profile) => {
        const name = profile.displayName;
        setUserProfile(name)
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, []);

  const getUserProfile = async () => {
    const profile = await liff.getProfile();
    setUserProfile("LIFF is logged in");
  }

  return (
    <div className="w-full h-full min-h-screen relative max-w-4xl mx-auto">
      <Router>
        <Navbar />
        <Topbar />
        <Routes>
          <Route path="/planner" element={<Planner />} />
          <Route path="/home" element={<Home userProfile={userProfile} />} />
          <Route path="/workshop" element={<Workshop />} />
          <Route path="/points" element={<Point />} />
          <Route path="/points/camera" element={<CameraComponent />} />
          <Route path="/planner/search" element={<PlannerSearch />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
