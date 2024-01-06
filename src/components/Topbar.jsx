import { IoLocationSharp } from "react-icons/io5"
import { BiChevronLeft } from "react-icons/bi"
import logo from "/logo2.png"
import { useUser } from "../UserContext"
const Topbar = () => {
  const { userProfile } = useUser();
  return (
    <div className="h-10 w-full justify-between pl-3 pr-2 flex">
      <div className="flex">
        {/* <BiChevronLeft className="my-auto text-3xl"/> */}
        <img src={logo} className="w-16 py-1 mr-1.5" />
        {/* <p className="my-auto text-xl tracking-wider font-bold">Thairist</p> */}
      </div>
      {/* <div className="flex h-full">
            <IoLocationSharp className="my-auto text-2xl text-red-800"/>
            <p className="my-auto text-xl ml-1">สตูล</p>
        </div> */}
      {userProfile &&
        <div className="h-6 w-6 my-auto">
          <img src={userProfile.pictureUrl} className="h-full w-full rounded-full" />
        </div>
      }

    </div>
  )
}
export default Topbar