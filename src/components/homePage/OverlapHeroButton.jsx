import { Link } from "react-router-dom"
const OverlapHeroButton = () => {
  return (
    <div className="px-6 w-full drop-shadow-md -mt-4">
      <div className="w-full h-full bg-white px-2 py-3 rounded-lg border-[1px] flex">
        <Link to="/points/ar" className="flex flex-grow justify-center">
            <img src="https://cdn-icons-png.flaticon.com/512/718/718022.png" className="w-10 h-10" />
            <div className="ml-2">
              <p className="sm:text-lg text-md font-bold text-blue-800">เก็บสะสมแต้ม</p>
              <p className="-mt-1.5 text-sm text-slate-600">แลกของรางวัล</p>
            </div>
        </Link>
        <div className="divider divider-horizontal m-0"></div>
        <div className="flex flex-grow justify-center">
          <img src="https://cdn-icons-png.flaticon.com/512/11395/11395352.png" className="w-10 h-10" />
          <div className="ml-2">
            <p className="sm:text-lg text-md font-bold text-blue-800">วิธีการใช้งาน</p>
            <p className="-mt-1.5 text-sm text-slate-600">เรียนรู้เพิ่มเติม</p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default OverlapHeroButton