import { useState } from "react"
import ARList from "./ARList"

const DetailsPoint = ({section}) => {
  return (
    <div className="bg-slate-100 mt-6 pt-6  rounded-t-3xl border-2 flex-grow">
      {/* <p className="ml-6">กิจกรรมค้นหาความลับผ่านโลก 3 มิติ</p> */}
      {section===0 && <div className="flex flex-col gap-y-2">
        <ARList title={"กิจกรรมค้นหาความลับผ่านโลก 3 มิติ"} />
        <ARList title={"แบ่งปันประสบการณ์ รับ Point เพิ่ม"} />
        <ARList title={"รีวิวสถานที่ท่องเที่ยว"} />
      </div>}
      {section===1 && <div className="flex flex-col gap-y-2">
        <ARList title={"กิจกรรมค้นหาความลับผ่านโลก 3 มิติ"} />
        <ARList title={"แบ่งปันประสบการณ์ รับ Point เพิ่ม"} />
        <ARList title={"รีวิวสถานที่ท่องเที่ยว"} />
      </div>}
      {section===2 && <div className="flex flex-col gap-y-2">
        <ARList title={"กิจกรรมค้นหาความลับผ่านโลก 3 มิติ"} />
        <ARList title={"แบ่งปันประสบการณ์ รับ Point เพิ่ม"} />
        <ARList title={"รีวิวสถานที่ท่องเที่ยว"} />
      </div>}
    </div>
  )
}
export default DetailsPoint