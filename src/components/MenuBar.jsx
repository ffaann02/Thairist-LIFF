import { BiHomeAlt } from "react-icons/bi"
import { GrPlan } from "react-icons/gr"
import { AiOutlineStar } from "react-icons/ai"
import { PiHandFistLight } from "react-icons/pi"
import { RiFilePaper2Line, RiFilePaper2Fill } from "react-icons/ri"
import { FiSearch } from "react-icons/fi";
import { BsBox } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom"
const MenuBar = () => {
    const location = useLocation();
    return (
        <div className="fixed z-[900] w-full bottom-0 text-center">
            <div className="w-full h-full py-3 rounded-xl px-4 grid grid-cols-5 bg-slate-50 border-t-2">
                <Link to="/">
                    <div className={`mx-auto ${location.pathname=="/"? "text-blue-700":"text-black"}`}>
                        <BiHomeAlt className="text-2xl mx-auto " />
                        <p className="text-sm ">Home</p>
                    </div>
                </Link>
                <Link to="/plan">
                    <div className={`mx-auto ${location.pathname=="/plan"? "text-blue-700":"text-black"}`}>
                        <RiFilePaper2Line className="text-2xl mx-auto " />
                        <p className="text-sm ">Plan</p>
                    </div>
                </Link>
                <Link to="https://liff.line.me/2000611383-3obyJJlw">
                    <div className={`mx-auto ${location.pathname=="/ar"? "text-blue-700":"text-black"}`}>
                        <BsBox className="text-2xl mx-auto " />
                        <p className="text-sm ">AR</p>
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
                        <FiSearch className="text-2xl mx-auto "/>
                        <p className="text-sm ">Search</p>
                    </div>
                </Link>
            </div>
        </div>
    )
}
export default MenuBar