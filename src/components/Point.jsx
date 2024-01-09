import Flicking from "@egjs/react-flicking"
import { AutoPlay } from "@egjs/flicking-plugins"
import "@egjs/react-flicking/dist/flicking.css";
import "@egjs/react-flicking/dist/flicking-inline.css";
import React, { useState, useEffect } from "react"
import { AiTwotoneEdit } from "react-icons/ai"
import kongProfile from "/kong.jpeg"
import latif from "/latif.jpeg"
import logo from "/logo.png"
import { FaLocationDot } from "react-icons/fa6"
import { AiOutlineStar } from "react-icons/ai"
import { Link } from "react-router-dom";

const Point = () => {
    const [notes, setNotes] = useState([1, 2, 3, 4, 5, 6, 7]);
    const [currentTrips, setCurrentTrips] = useState([
        {
            id: 1,
            name: "กลุ่มแม่บ้านเจ๊ะบิลัง ขนมผูกรัก",
            time: "50 คะแนน | ส่วนลด 10%",
            imageUrl: "https://77kaoded.com/wp-content/uploads/2018/02/DSC_0257-1-1024x683.jpg",
        },
        {
            id: 2,
            name: "ร้านแม่ทิพย์ โรตีกรอบไร้น้ำตาล",
            time: "50 คะแนน | แถมฟรี 1 กล่อง",
            imageUrl: "https://img.salehere.co.th/p/1200x0/2023/02/22/hayaddiq26u3.jpg",
        },
        {
            id: 2,
            name: "น้ำตกวังสายทอง",
            time: "8:30 น.",
            imageUrl: "https://files.thailandtourismdirectory.go.th/assets/upload/2017/11/02/2017110227f237e6b7f96587b6202ff3607ad88a153922.JPG",
        },

    ]);
    const [currentPoints, setCurrentPoints] = useState([
        {
            id: 1,
            name: "กลุ่มแม่บ้านเจ๊ะบิลัง ขนมผูกรัก",
            time: "50 คะแนน | ส่วนลด 10%",
            imageUrl: "https://sv1.picz.in.th/images/2023/09/02/dW5yIbR.jpeg",
        },
        {
            id: 2,
            name: "ร้านแม่ทิพย์ โรตีกรอบไร้น้ำตาล",
            time: "50 คะแนน | แถมฟรี 1 กล่อง",
            imageUrl: "https://sv1.picz.in.th/images/2023/09/02/dW5yF38.jpeg",
        },
        {
            id: 2,
            name: "น้ำตกวังสายทอง",
            time: "8:30 น.",
            imageUrl: "https://files.thailandtourismdirectory.go.th/assets/upload/2017/11/02/2017110227f237e6b7f96587b6202ff3607ad88a153922.JPG",
        },
    ]);

    return (
        <div className="w-full h-full pl-3.5 pt-14">
            <div className="w-full flex">
                <img src={logo} className="w-16" />
                <p className="text-2xl my-auto ml-4 tracking-wider">คะแนนสะสมของคุณ</p>
            </div>
            <div className="flex mt-2">
                <p className="text-3xl font-bold text-blue-600 tracking-wider">219</p>
                <p className="mt-[0.65rem] ml-1">คะแนน</p>
            </div>

            <div className="px-4 bg-slate-50 mr-3 py-4 rounded-xl mt-0 border-[1px] drop-shadow-md grid grid-cols-2">
                <p className="my-auto text-sm col-span-1">คะแนนของคุณสามารถใช้แลกของขวัญ ส่วนลด และอื่น ๆ ที่ร่วมรายการได้</p>
                <Link to="/points/camera">
                    <div className="col-span-1 w-full flex justify-end">
                        <button className="px-3 py-3 my-auto bg-blue-600 text-white rounded-xl drop-shadow-md">
                            ดูรายละเอียดคะแนน
                        </button>
                    </div>
                </Link>
            </div>
            <div className="mt-4 flex">
                <p className="text-lg">ของฝากใกล้คุณ</p>
                <FaLocationDot className="my-auto text-xl text-blue-800 ml-2" />
                <p className="my-auto ml-1">สตูล</p>
            </div>
            <div className="w-[105%] h-full mt-2 -ml-[5%]">
                <Flicking renderOnlyVisible={true}>
                    {currentTrips.map((trip) =>
                    (
                        <div className="h-56 w-[90%] rounded-xl pr-4 relative" key={trip.id}>
                            <img src={trip.imageUrl}
                                className="rounded-xl opacity-75 h-full w-full" />
                            <div className="w-full absolute bottom-0 pr-4">
                                <div className="w-full py-1 px-2 rounded-b-xl mb-1">
                                    <div className="w-full h-full bg-white rounded-lg pl-3 pr-2 py-2">
                                        <p className="text-slate-700 text-xl tracking-widest">{trip.name}</p>
                                        <p className="text-slate-700 text-md tracking-widest">{trip.time}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Flicking>
            </div>
            <div className="mt-4 flex">
                <p className="text-lg">ภารกิจเก็บคะแนน</p>
                <FaLocationDot className="my-auto text-xl text-blue-800 ml-2" />
                <p className="my-auto ml-1">สตูล</p>
            </div>
            <div className="w-[105%] h-full mt-2 -ml-[5%]">
                <Flicking renderOnlyVisible={true}>
                    {currentPoints.map((trip) =>
                    (
                        <div className="h-56 w-[90%] rounded-xl pr-4 relative" key={trip.id}>
                            <div className="flex w-full h-full absolute z-[20]">
                                <img src={"https://sv1.picz.in.th/images/2023/09/02/dWEWpGz.png"}
                                    className="mx-auto h-3/4 mt-6" />
                            </div>
                            <img src={trip.imageUrl}
                                className="rounded-xl opacity-75 h-full w-full" />
                            <div className="absolute left-2 top-2 bg-white px-2 py-1 rounded-lg flex">
                                <AiOutlineStar className="text-xl my-auto mr-1 text-orange-600" />
                                <p>100 คะแนน</p>
                            </div>
                        </div>
                    ))}
                </Flicking>
            </div>
        </div>
    )
}
export default Point;