import { BiHomeAlt } from "react-icons/bi"
import {GrPlan} from "react-icons/gr"
import {AiOutlineStar} from "react-icons/ai"
import {PiHandFistLight} from "react-icons/pi"
import {RiFilePaper2Line,RiFilePaper2Fill} from "react-icons/ri"
const Navbar = () => {
    return (
        <div className="fixed w-full bottom-5 px-4 text-center z-10">
            <div className="w-full h-full py-3 rounded-xl px-4 grid grid-cols-4" id="navbar">
                <div className="mx-auto ">
                    <BiHomeAlt className="text-2xl mx-auto text-blue-700"/>
                    <p className="text-sm text-blue-700">Home</p>
                </div>
                <div className="mx-auto">
                    <RiFilePaper2Line className="text-2xl mx-auto "/>
                    <p className="text-sm ">Plan</p>
                </div>
                <div className="mx-auto">
                    <AiOutlineStar className="text-2xl mx-auto"/>
                    <p className="text-sm">Points</p>
                </div>
                <div className="mx-auto">
                    <PiHandFistLight className="text-2xl mx-auto"/>
                    <p className="text-sm">Workshop</p>
                </div>
            </div>
        </div>
    )
}
export default Navbar