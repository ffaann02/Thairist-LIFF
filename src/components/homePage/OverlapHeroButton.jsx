import { useState } from "react";
import { Link } from "react-router-dom"
const OverlapHeroButton = () => {
  const [coordinate, setCoordinate] = useState([0, 0]);
  const [province, setProvince] = useState('กรุงเทพมหานคร');
  const [location, setLocation] = useState('เสาชิงช้า');
  const [arUrl, setArUrl] = useState('https://pngimg.com/d/mario_PNG125.png');
  return (
    <div className="px-6 w-full drop-shadow-md -mt-4">
      <div className="w-full h-full bg-white px-2 py-3 rounded-lg border-[1px] flex">
        <Link to={`https://liff.line.me/2000611383-Pqqw005D/?id=1&lat=${coordinate[0]}&long=${coordinate[1]}&province=${province}&location=${location}&ar_url=${arUrl}`}
        className="flex flex-grow justify-center">
          <img src="https://cdn-icons-png.flaticon.com/512/718/718022.png" className="w-10 h-10" />
          <div className="ml-2">
            <p className="sm:text-lg text-md font-bold text-blue-800">เก็บสะสมแต้ม</p>
            <p className="-mt-1.5 text-sm text-slate-600">แลกของรางวัล</p>
          </div>
        </Link>
        <div className="divider divider-horizontal m-0"></div>
        <Link to="https://liff.line.me/2000611383-Pqqw005D/?key=1&name=John&age=25" className="flex flex-grow justify-center">
          <img src="https://cdn-icons-png.flaticon.com/512/11395/11395352.png" className="w-10 h-10" />
          <div className="ml-2">
            <p className="sm:text-lg text-md font-bold text-blue-800">วิธีการใช้งาน</p>
            <p className="-mt-1.5 text-sm text-slate-600">เรียนรู้เพิ่มเติม</p>
          </div>
        </Link>
      </div>
    </div>
  )
}
export default OverlapHeroButton