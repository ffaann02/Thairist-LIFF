import { IoLocationSharp } from "react-icons/io5"
import { BiChevronLeft } from "react-icons/bi"
import logo from "/logo2.png"
import { useUser } from "../UserContext"
import { useLocation } from "react-router-dom"
import { useEffect } from "react"
const Topbar = () => {
  const { userProfile } = useUser();
  const location = useLocation();
  const isPointsPath = location.pathname === '/points';
  useEffect(()=>{
    console.log(location.pathname)  
  },[])
  return (
    <div className={`h-10 w-full justify-between pl-3 pr-2 flex z-[100] ${isPointsPath?"bg-[#51b3ce]":"bg-white fixed"}`} id={!isPointsPath && "navbar"}>
      <div className="flex">
        <img src={logo} className="w-16 py-1 mr-1.5" />
      </div>
      {userProfile &&
        <div className="h-8 w-8 my-auto p-0.5 border-[2px] border-white rounded-full">
          <img src={userProfile.pictureUrl} className="h-full w-full rounded-full" />
        </div>
      }

    </div>
  )
}
export default Topbar