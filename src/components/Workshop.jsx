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
            },
            {
                id: 3,
                img: "https://files.thailandtourismdirectory.go.th/assets/upload/2017/11/06/2017110691b3b612250732c72f42036881ef400b114059.jpg",
                name: "คฤหาสน์กูเด็น"
            }
        ]);

    return (
        <div className="w-full h-full pt-6 bg-slate-50 ">
            <div className="w-full h-full max-w-4xl mx-auto min-h-screen">

                <div className='px-6 mx-auto'>
                    <div className="relative flex items-center w-full h-12 rounded-lg shadow-md bg-white overflow-hidden border-[1px] border-[#10000]">
                        <div className="grid place-items-center h-full w-12 text-gray-300">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>

                        <input
                            class="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                            type="text"
                            id="search"
                            placeholder="ค้นหา" />
                    </div>
                </div>

                <div className="mt-8 ml-6 flex">
                    <button className="ml-2 rounded-lg px-4 py-1 flex bg-blue-100 text-blue-500 font-semibold border-[0.5px] border-blue-500">
                        <p className="my-auto">เปิดอยู่</p>
                    </button>
                    <button className="ml-2 rounded-lg px-4 py-1 flex bg-blue-100 text-blue-500 font-semibold border-[0.5px] border-blue-500">
                        <p className="my-auto">ทำขนม</p>
                    </button>
                    <button className="ml-2 rounded-lg px-4 py-1 flex text-slate-500 font-semibold border-[0.5px] border-slate-500">
                        <p className="my-auto">เดินป่า</p>
                    </button>
                    <button className="ml-2 rounded-lg px-4 py-1 flex text-slate-500 font-semibold border-[0.5px] border-slate-500">
                        <p className="my-auto">ดำน้ำ</p>
                    </button>
                </div>

                <div className="relative mt-6 w-full h-full">
                    <div className="mx-6 max-w-sm rounded-xl overflow-hidden shadow-lg border-[2px] border-[#10000] ">
                        <img
                            className="w-full"
                            src="https://pbs.twimg.com/media/CgyhH5yXEAA2hxG.jpg"
                            alt="Sunset in the mountains" />
                        <div className="px-6 py-4">
                            <div className="flex">
                                <p className="text-green-700 text-sm">เปิด</p>
                                <p className="text-gray-600 text-sm ml-2">| 09.00 - 17.00</p>
                            </div>
                            <p className="font-bold text-xl mt-2">เรียนรู้การทำขนมบุหงาปูดะ</p>
                            <p className="text-gray-700 text-base mt-1">ลองลงมือทำขนมบุหงาปูดะด้วยตัวเอง มีผู้สอนละเอียดทุกขั้นตอน จากกลุ่มแม่บ้านเจ๊ะบิลัง</p>
                        </div>
                        <div className="px-6 pb-2 mt-2">
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">ทำขนม</span>
                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">ขนมพื้นเมือง</span>
                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">ของฝากสตูล</span>
                        </div>
                        <div className="mb-4 flex ml-6">
                            <button className="rounded-lg px-4 py-2 flex text-red-700 border-[1px] border-red-700">
                                <FaBahtSign className="my-auto" />
                                <p className="my-auto ml-1">100/คน</p>
                            </button>
                            <button className="ml-2 rounded-lg px-4 py-2 flex text-blue-700 border-[1px] border-blue-700">
                                <FaPhoneAlt className="my-auto" />
                                <p className="my-auto ml-2">โทร</p>
                            </button>
                            <button className="ml-2 rounded-lg px-4 py-2 flex bg-blue-700 text-white">
                                <AiFillPlusCircle className="my-auto" />
                                <p className="my-auto ml-2">แผน</p>
                            </button>
                        </div>

                    </div>
                </div>

                <div className="ml-8 mt-8 mb-2 text-lg font-semibold">
                    <p>กิจกรรมยอดนิยม</p>
                </div>

                <div className="w-full h-full mt-2">
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

