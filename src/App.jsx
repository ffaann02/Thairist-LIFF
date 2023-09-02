import { useEffect, useState } from "react";
import liff from "@line/liff";
import "./App.css";
import Planner from "./components/Planner";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
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
        <Routes>
          <Route path="/planner" element={<Planner/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
