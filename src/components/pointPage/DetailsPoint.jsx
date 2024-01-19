import { useState } from "react"

import { ARList, ARListExp, ARListReview } from "./Mission/MissionDoneExample"
import { ExcPointFood,ExcPointDrink } from "./ExchangePoint"
import { MdChevronRight, MdOutlineLocationOn } from "react-icons/md";
import AR_Mission1 from "./Mission/AR_Mission1";
import Blog_Mission2 from "./Mission/Blog_Mission2";
import Review_Mission3 from "./Mission/Review_Mission3";
const DetailsPoint = ({ section, province }) => {

  return (
    <div className="bg-slate-50 rounded-t-3xl border-2 flex-grow mt-4">
      <div className="mb-4 w-full border-b-2 bg-white border-slate-200 pl-6 pr-2 py-2 rounded-t-3xl flex justify-between">
        <div className="flex">
          <div>
            <p className="text-sm leading-tight text-slate-500">ตำแหน่ง</p>
            <p className="text-xl leading-tight font-semibold">{province}</p>
          </div>
        </div>
        <div className="my-auto flex text-blue-600">
          <button className="flex">แก้ไข</button>
          <MdChevronRight className="my-auto text-2xl" />
        </div>
      </div>
      {/* <p className="ml-6">กิจกรรมค้นหาความลับผ่านโลก 3 มิติ</p> */}
      {section === 0 && <div className="flex flex-col gap-y-2">
        <AR_Mission1 title={"ภารกิจค้นหาความลับผ่านโลก 3 มิติ"}/>
        {/* <ARList title={"ภารกิจค้นหาความลับผ่านโลก 3 มิติ"} />*/}
        <Blog_Mission2 title={"กิจกรรมแบ่งปันประสบการณ์ รับคะแนนเพิ่ม"}/>
        {/* <ARListExp title={"กิจกรรมแบ่งปันประสบการณ์ รับ Point เพิ่ม"} /> */}
        <Review_Mission3 title={"รีวิวสถานที่ท่องเที่ยวรับ 3 คะแนน"}/>
        {/* <ARListReview title={"กิจกรรมรีวิวสถานที่ท่องเที่ยว"} /> */}
      </div>}
      
      {section===1 && <div className="flex flex-col gap-y-2">
        <ExcPointFood title={"สิทธิพิเศษเเนะนำเเลกคะเเนนกับร้านอาหารพื้นเมือง"} />
        <ExcPointDrink title={"แบ่งปันประสบการณ์ รับ Point เพิ่ม"} />
        <Review_Mission3 title={"รีวิวสถานที่ท่องเที่ยว"} />
      </div>}
      {section===2 && <div className="flex flex-col gap-y-2">
        <ARList title={"กิจกรรมค้นหาความลับผ่านโลก 3 มิติ"} />
        <ARListExp title={"แบ่งปันประสบการณ์ รับ Point เพิ่ม"} />
        <Review_Mission3 title={"รีวิวสถานที่ท่องเที่ยว"} />
      </div>} 
      </div> 
    
  )
}
export default DetailsPoint