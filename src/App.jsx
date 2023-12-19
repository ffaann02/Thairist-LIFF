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
        if(liff.isLoggedIn()) {
          getUserProfile();
        }
        else{
          liff.login();
        }
      })
      .catch((e) => {
        setMessage("LIFF init failed.");
        setError(`${e}`);
      });
  }, []);

  const getUserProfile = async () => {
    const profile = await liff.getProfile();
    console.log(`displayName: ${profile.displayName}`);
    setUserProfile(profile);
  }

  return (
    <div className="w-full h-full min-h-screen relative max-w-4xl mx-auto">
      <Router>
        <Navbar userProfile={userProfile}/>
        <Topbar userProfile={userProfile}/>
        <Routes>
          <Route path="/planner" element={<Planner userProfile={userProfile}/>} />
          <Route path="/home" element={<Home userProfile={userProfile} />} />
          <Route path="/workshop" element={<Workshop userProfile={userProfile}/>} />
          <Route path="/points" element={<Point userProfile={userProfile}/>} />
          <Route path="/points/camera" element={<CameraComponent userProfile={userProfile}/>} />
          <Route path="/planner/search" element={<PlannerSearch userProfile={userProfile}/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
