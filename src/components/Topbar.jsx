import {IoLocationSharp} from "react-icons/io5"
import {BiChevronLeft} from "react-icons/bi"
const Topbar = () => {
  return (
    <div className="h-10 w-full justify-between pl-1 pr-2 flex">
        <div className="flex">
            <BiChevronLeft className="my-auto text-3xl"/>
        </div>
        <div className="flex h-full">
            <IoLocationSharp className="my-auto text-2xl text-red-800"/>
            <p className="my-auto text-xl ml-1">สตูล</p>
        </div>
        <div className="h-6 w-6 my-auto">
            <img src="https://avatars.githubusercontent.com/u/84792604?v=4" className="h-full w-full rounded-full"/>
        </div>
    </div>
  )
}
export default Topbar