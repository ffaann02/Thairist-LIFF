import Flicking from "@egjs/react-flicking"
import { AutoPlay } from "@egjs/flicking-plugins"
import { useState } from "react"
import "@egjs/react-flicking/dist/flicking.css";
import "@egjs/react-flicking/dist/flicking-inline.css";
import { FaPhoneAlt } from "react-icons/fa"
import { FaBahtSign } from "react-icons/fa6"
import { AiFillPlusCircle } from "react-icons/ai"

const Workshop = () => {

    const [panels, setPanels] = useState
    ([
        {
            id: 0,
            img: "https://www.wonderfulpackage.com/uploads/moxie/Article/thai/7colors-coral-lipe/7colors-coral-lipe1.jpg",
            name: "ปะการังเจ็ดสี หลีเป๊ะ"
        },
        {
            id: 1,
            img: "https://4.bp.blogspot.com/-LYLYZROdMvM/XAi-8uDg3BI/AAAAAAAAFAs/vvHJD1eWgUExik_R6uMQh8ortn5vsKSewCLcBGAs/s1600/26868637_1868291719908317_5576795105760641024_n.jpg",
            name: "ขนมผูกรัก"
        },
        {
            id: 2,
            img: "https://s.isanook.com/tr/0/ui/282/1411979/40532700_1867583929989555_5005885615867166720_n_1535906985.jpg",
            name: "ปราสาทหินพันยอด"
        }
    ]);

    return (
        <div className="w-full h-full ">
            <div className="w-full h-full max-w-4xl bg-slate-50 mx-auto min-h-screen">

                <div className="relative">
                    <div className="ml-8 mt-4 text-lg font-semibold">
                        <p>เวิร์คช้อปที่กำลังเปิดอยู่</p>
                    </div>
                    <div className="mx-6 max-w-sm rounded-xl overflow-hidden shadow-lg border-[2px] border-[#10000]">
                        <img
                            className="w-full"
                            src="https://pbs.twimg.com/media/CgyhH5yXEAA2hxG.jpg"
                            alt="Sunset in the mountains" />
                        <div className="px-6 py-4">
                            <div className="flex">
                                <p className="text-green-700 text-sm">เปิด</p>
                                <p className="text-gray-600 text-sm ml-2">| 09.00 - 17.00</p>
                            </div>
                            <p className="font-bold text-xl mt-2">ขนมบุหงาปูดะ</p>
                            <p className="text-gray-700 text-base mt-1">ลองทำขนมบุหงาปูดะ</p>
                        </div>
                        <div className="px-6 pb-2 mt-2">
                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">ขนมพื้นบ้าน</span>
                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">ของฝากสตูล</span>
                        </div>
                        <div className="mb-4 flex justify-center">
                            <button className="rounded-lg px-4 py-2 flex text-red-700 border-[1px] border-red-700">
                                <FaBahtSign className="my-auto"/>
                                <p className="my-auto ml-1">100/คน</p>
                            </button>
                            <button className="ml-2 rounded-lg px-4 py-2 flex text-blue-700 border-[1px] border-blue-700">
                                <FaPhoneAlt className="my-auto"/>
                                <p className="my-auto ml-2">โทร</p>
                            </button>
                            <button className="ml-2 rounded-lg px-4 py-2 flex bg-blue-700 text-white">
                                <AiFillPlusCircle className="my-auto"/>
                                <p className="my-auto ml-2">แผน</p>
                            </button>
                        </div>
            
                    </div>
                </div>

                <div className="ml-8 mt-6 mb-2 text-lg font-semibold">
                    <p>แนะนำสำหรับคุณ</p>
                </div>

                <div className="w-full h-full mt-2 ">
                <Flicking renderOnlyVisible={true}>
                    {panels.map((trip) =>
                    (
                        <div className="-ml-24 h-40 w-[90%] rounded-xl pr-28 relative" key={trip.id}>
                            <img src={trip.img}
                                className="rounded-xl h-full w-full" />
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


            </div>
        </div>
    )
}

export default Workshop;

