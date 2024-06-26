import { useEffect, useState } from "react";
import liff from "@line/liff";
import "./App.css";
import Planner from "./components/planPage/Planner";
import MenuBar from "./components/MenuBar";
import Topbar from "./components/Topbar";
import Activity from "./components/activityPage/Activity";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Home from "./components/homePage/Home";
import CameraComponent from "./components/Camera";
import PlannerSearch from "./components/PlannerSearch";
import OldPlanner from "./components/planPage/OldPlanner";
import { useUser, UserProvider } from './UserContext';
import EmptyFooter from "./components/EmptyFooter";
// import ARdisplay from "./components/ARdisplay";
import OldPoint from "./components/OldPoint";
import Point from "./components/pointPage/Point";
import WebXR from "./components/ARPage/WebXR";
import Expense from "./components/expensePage/Expense";
import AR from "./components/ARPage/AR";
import History from "./components/overviewHistoryPage/History";
import Help from "./components/helpPage/Help";
import DocumentRequest from "./components/docPage/DocumentRequest";
import UploadImage from "./components/UploadImage";
import Plan from "./components/planPage/Plan";

function App() {

  const { userProfile, setUser,isOpenAR } = useUser();

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  // const [userProfile, setUserProfile] = useState();

  useEffect(() => {
    liff.init({ liffId: import.meta.env.VITE_LIFF_ID })
      .then(async() => {
        setMessage("LIFF init succeeded.");
        if (liff.isLoggedIn()) {
          await getUserProfile();
        }
        //for functional
        else{
          liff.login();
        }
        // for dev on pc
        // else {
        //   const templateProfile =
        //   {
        //     "userId": "U5b7bef2d143fb728b673cfb6e7ce88e0",
        //     "displayName": "Kong Chayapol",
        //     "pictureUrl": "https://profile.line-scdn.net/0h54lO-CdPahtBNn7fINgUZDFmaXFiRzMJaAByLycwMCx1ASQabwQsKnwzNC19USsdPVIte30wMS9NJR19X2CWL0YGNyp9BypNbVIs_w",
        //     "statusMessage": "templateProfile!"
        //   }
        //   setUser(templateProfile);
        // }
      })
      .catch((e) => {
        setMessage("LIFF init failed.");
        setError(`${e}`);
      });
  }, []);

  const getUserProfile = async () => {
    const profile = await liff.getProfile();
    console.log(`displayName: ${profile.displayName}`);
    await setUser(profile);
    return;
  }

  return (
    <div className={`w-full h-full min-h-screen relative max-w-4xl mx-auto ${!isOpenAR ? "bg-slate-50":null}`}>
      <Router>
          {!isOpenAR ? <Topbar />:null}
          <Routes>
            <Route path="/planner" element={<Planner />} />
            <Route path="/" element={<Home />} />
            <Route path="/activity" element={<Activity />} />
            <Route path="/points" element={<Point/>} />
            <Route path="/ar" element={<AR/>} />
            <Route path="/points/camera" element={<CameraComponent />} />
            <Route path="/planner/search" element={<PlannerSearch />} />
            <Route path="/expense" element={<Expense />} />
            <Route path="/history" element={<History/>} />
            <Route path="/help" element={<Help/>} />
            <Route path="/document" element={<DocumentRequest/>} />
            <Route path="/upload-image" element={<UploadImage />}/>
            <Route path="/plan" element={<Plan/>}/>
          </Routes>
          {!isOpenAR ? <MenuBar />:null}
          {!isOpenAR ? <EmptyFooter />:null}
      </Router>
    </div>
  );
}

export default App;
