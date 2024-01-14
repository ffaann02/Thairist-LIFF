import { BiHomeAlt } from "react-icons/bi"
import { GrPlan } from "react-icons/gr"
import { AiOutlineStar } from "react-icons/ai"
import { PiHandFistLight } from "react-icons/pi"
import { RiFilePaper2Line, RiFilePaper2Fill } from "react-icons/ri"
import { Link, useLocation } from "react-router-dom"
const MenuBar = () => {
    const location = useLocation();
    return (
        <div className="fixed w-full bottom-4 px-4 text-center z-10">
            <div className="w-full h-full py-3 rounded-xl px-4 grid grid-cols-4" id="navbar">
                <Link to="/">
                    <div className={`mx-auto ${location.pathname=="/"? "text-blue-700":"text-black"}`}>
                        <BiHomeAlt className="text-2xl mx-auto " />
                        <p className="text-sm ">Home</p>
                    </div>
                </Link>
                <Link to="/planner">
                    <div className={`mx-auto ${location.pathname=="/planner"? "text-blue-700":"text-black"}`}>
                        <RiFilePaper2Line className="text-2xl mx-auto " />
                        <p className="text-sm ">Plan</p>
                    </div>
                </Link>
                <Link to="/points">
                    <div className={`mx-auto ${location.pathname=="/points" || location.pathname=="/points/camera"? "text-blue-700":"text-black"}`}>
                        <AiOutlineStar className="text-2xl mx-auto " />
                        <p className="text-sm ">Points</p>
                    </div>
                </Link>
                <Link to="/activity">
                    <div className={`mx-auto ${location.pathname=="/activity"? "text-blue-700":"text-black"}`}>
                        <PiHandFistLight className="text-2xl mx-auto " />
                        <p className="text-sm ">Activities</p>
                    </div>
                </Link>
            </div>
        </div>
    )
}
export default MenuBar