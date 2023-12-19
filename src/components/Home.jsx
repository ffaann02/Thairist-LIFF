import Flicking from "@egjs/react-flicking"
import { AutoPlay } from "@egjs/flicking-plugins"
import "@egjs/react-flicking/dist/flicking.css";
import "@egjs/react-flicking/dist/flicking-inline.css";
import React, { useState } from "react"
import { AiTwotoneEdit } from "react-icons/ai"
import kongProfile from "/kong.jpeg"
import latif from "/latif.jpeg"
const Home = ({userProfile}) => {
    const [notes,setNotes] = useState([1,2,3,4,5,6,7]);
    const [currentTrips, setCurrentTrips] = useState([
        {
            id: 1,
            name: "สะพานข้ามกาลเวลา",
            time: "8:00 น. | 10 กันยายน",
            imageUrl: "https://ak-d.tripcdn.com/images/1i6302215cij6g8xc3131_W_400_0_R5_Q90.jpg?proc=source/trip",
        },
        {
            id: 2,
            name: "น้ำตกวังสายทอง",
            time: "9:30 น. | 10 กันยายน",
            imageUrl: "https://thailandtourismdirectory.go.th/assets/upload/2017/11/02/2017110227f237e6b7f96587b6202ff3607ad88a153922.JPG",
        },
        {
            id: 2,
            name: "น้ำตกวังสายทอง",
            time: "8:30 น.",
            imageUrl: "https://thailandtourismdirectory.go.th/assets/upload/2017/11/02/2017110227f237e6b7f96587b6202ff3607ad88a153922.JPG",
        },

    ]);
    return (
        <div className="w-full h-full pl-3.5 mt-4">
            <p className="text-xl">แผนการเที่ยวของคุณ</p>
            <div className="flex mt-2">
                <div className="mr-4">
                    <p className="underline underline-offset-[6px] text-blue-600">ปัจจุบัน</p>
                </div>
                <div className="">
                    <p className="mr-4 text-slate-500">ที่ผ่านมา</p>
                </div><div className="">
                    <p className="mr-4 text-slate-500">กำลังจะถึง</p>
                </div>
            </div>

            {userProfile && 
                <div className="text-2xl my-auto">
                    <p>Test update: </p>
                    <p>{userProfile.displayName}</p>
                    {/* <p>{userData.userId}</p>
                    <p>{userData.displayName}</p>
                    <p>{userData.statusMessage}</p> */}
                </div>
            }

            <div className="mt-4 flex">
                <p className="text-lg">เที่ยววันหยุดจังหวัดสตูล</p>
                <AiTwotoneEdit className="my-auto text-xl text-blue-800 ml-2" />
            </div>
            <div className="w-[105%] h-full mt-2 -ml-[5%]">
                <Flicking renderOnlyVisible={true}>
                    {currentTrips.map((trip) =>
                    (
                        <div className="h-56 w-[90%] rounded-xl pr-4 relative" key={trip.id}>
                            <img src={trip.imageUrl}
                                className="rounded-xl opacity-75 h-full w-full" />
                            <div className="w-full absolute bottom-0 pr-4">
                                <div className="w-full bg-blue-400 bg-opacity-50 py-1 px-2 rounded-b-xl">
                                    <p className="text-white text-lg tracking-widest">{trip.name}</p>
                                    <p className="text-white text-sm tracking-widest">{trip.time}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </Flicking>
            </div>
            <p className="text-lg mt-2">รายละเอียดการเที่ยว</p>
            <div className="w-full pr-4 text-slate-500">
                <div className="w-full justify-between flex mt-1">
                    <p>ระยะเวลา</p>
                    <p>3 วัน</p>
                </div>
                <div className="w-full justify-between flex">
                    <div></div>
                    <p className="text-sm text-slate-400">10 กันยายน - 12 กันยายน</p>
                </div>
                <div className="w-full justify-between flex my-1">
                    <p>จำนวนคน</p>
                    <p>3 คน</p>
                </div>
                <div className="w-full justify-between flex my-1">
                    <div></div>
                    <div className="flex">
                        <img src="https://avatars.githubusercontent.com/u/84792604?v=4" className="w-6 ml-1" />
                        <img src={kongProfile} className="w-6 h-6 ml-1" />
                        <img src={latif} className="w-6 h-6 ml-1" />
                    </div>
                </div>
                <div className="w-full justify-between flex my-1">
                    <p>งบประมาณ</p>
                    <p>5,000 บาท</p>
                </div>
                <div className="w-full justify-between flex mt-1">
                    <p>คงเหลือ</p>
                    <p>5,000 บาท</p>
                </div>
                <div className="w-full justify-between flex">
                    <div></div>
                    <p className="text-sm text-blue-400 underline underline-offset-4">ดูรายละเอียดค่าใช้จ่าย</p>
                </div>
                <div className="w-full justify-between flex my-2 mt-4">
                    <p>แจ้งเตือนสภาพอากาศ</p>
                    <input type="checkbox" checked={true} />
                </div>
                <div className="w-full justify-between flex mt-2">
                    <p>แจ้งเตือนเมื่อใกล้ถึงเวลา</p>
                    <input type="checkbox" checked={true} />
                </div>
                <div className="w-full justify-between flex">
                    <div></div>
                    <p className="text-sm text-blue-400 underline underline-offset-4">ระบุกิจกรรมที่ต้องเตือน</p>
                </div>
            </div>
            <p className="text-lg mt-4">โน้ต</p>
            <div className="w-full h-full mt-1 pr-4">
                <div className="w-full bg-slate-100 border-[1px] rounded-lg h-20 px-3 py-3 text-sm text-slate-600">
                    <p>- ซื้อของฝากให้แม่กับป้าทิพย์</p>
                    <p>- แวะเจอลุงอามีน</p>
                </div>
            </div>
        </div>
    )
}
export default Home