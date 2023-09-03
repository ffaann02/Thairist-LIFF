import Flicking from "@egjs/react-flicking"
import { AutoPlay } from "@egjs/flicking-plugins"
import "@egjs/react-flicking/dist/flicking.css";
import "@egjs/react-flicking/dist/flicking-inline.css";
import React, { useState } from "react"
import {AiTwotoneEdit} from "react-icons/ai"
const Home = () => {
    const [currentTrips, setCurrentTrips] = useState([
        {
            id: 1,
            name: "สะพานข้ามกาลเวลา",
            time: "8:00 น.",
            imageUrl: "https://ak-d.tripcdn.com/images/1i6302215cij6g8xc3131_W_400_0_R5_Q90.jpg?proc=source/trip",
        },
        {
            id: 2,
            name: "น้ำตกวังสายทอง",
            time: "9:30 น.",
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
            <div className="mt-4 flex">
                <p className="">เที่ยววันหยุดจังหวัดสตูล</p>
                <AiTwotoneEdit className="my-auto text-xl text-blue-800 ml-2"/>
            </div>
            <div className="w-full h-full mt-2 ">
                <Flicking renderOnlyVisible={true}>
                    {currentTrips.map((trip) =>
                    (
                        <div className="-ml-24 h-40 w-[90%] rounded-xl pr-28 relative" key={trip.id}>
                            <img src={trip.imageUrl}
                                className="rounded-xl opacity-75 h-full w-full" />
                            <div className="w-full absolute bottom-0 pr-28">
                                <div className="w-full bg-blue-400 bg-opacity-50 py-1 px-2 rounded-b-xl">
                                    <p className="text-white text-lg tracking-widest">{trip.name}</p>
                                    <p className="text-white text-sm tracking-widest">{trip.time}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </Flicking>
            </div>
            <p className="text-xl mt-2">แผนที่</p>
            <div className="w-full h-44 pr-3 mt-1">
                <img src="https://ak-d.tripcdn.com/images/1i6302215cij6g8xc3131_W_400_0_R5_Q90.jpg?proc=source/trip"
                className="w-full h-full"/>
            </div>
        </div>
    )
}
export default Home