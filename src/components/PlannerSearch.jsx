import Flicking from "@egjs/react-flicking"
import { AutoPlay } from "@egjs/flicking-plugins"
import { useState } from "react"
import "@egjs/react-flicking/dist/flicking.css";
import "@egjs/react-flicking/dist/flicking-inline.css";
import { FaPhoneAlt } from "react-icons/fa"
import { FaBahtSign } from "react-icons/fa6"
import { AiFillPlusCircle } from "react-icons/ai"
import { IoChevronBackSharp, IoWaterOutline, IoFastFoodOutline } from "react-icons/io5"
import { MdOutlineTempleBuddhist, MdOutlineBakeryDining } from "react-icons/md"
import { BsSun } from "react-icons/bs"
import Draggable from 'react-draggable';
import { BsTree, BsWater } from "react-icons/bs"
import { MdOutlineHouseSiding } from "react-icons/md"
import { PiPersonSimpleRunDuotone } from "react-icons/pi"
import { IoLocationSharp } from "react-icons/io5"
import { FiMenu } from "react-icons/fi"
const PlannerSearch = () => {

    const [panels, setPanels] = useState
        ([
            {
                id: 0,
                img: "https://mpics.mgronline.com/pics/Images/561000010681702.JPEG",
                name: "ถ้ำภูผาเพชร"
            },
            {
                id: 1,
                img: "https://www.me-fi.com/tourismdb/tourism-5sbp/uploadfile/620150619105515.jpg",
                name: "เกาะหินงาม"
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
        const [panels2, setPanels2] = useState
        ([
            {
                id: 0,
                img: "https://dk6ct0qhg0w6z.cloudfront.net/uploads/source/1664859707633bbe3be5b42.jpg",
                name: "เกาะหลีเป๊ะ",
                detail: "เกาะสวยยอดฮิตแห่งทะเลอันดามัน จุดเด่น คือ น้ำทะเลมีฟ้าเขียวใส มีเวิ้งอ่าวที่สวยงาม"
            },
            {
                id: 1,
                img: "https://www.เที่ยวเกาะหลีเป๊ะ.com/wp-content/uploads/2021/02/%E0%B9%80%E0%B8%81%E0%B8%B2%E0%B8%B0%E0%B9%84%E0%B8%82%E0%B9%88.jpg",
                name: "เกาะไข่",
                detail: "รอบๆ จะรายล้อมด้วยน้ำทะเลใสสีมรกตสวยงดงามมากๆ ไฮไลท์ของเกาะคือซุ้มหินที่ชายฝั่ง"
            },
            {
                id: 2,
                img: "https://www.me-fi.com/tourismdb/tourism-5sbp/uploadfile/620150619105515.jpg",
                name: "เกาะหินงาม",
                detail: "ทั้งหาดจะเต็มไปด้วยก้อนหินสีดำ ไซส์เล็กใหญ่แตกต่างกันไปหลายขนาด แต่ลักษณะที่คล้ายกันทุกก้อนก็คือความกลมเกลี้ยง"
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
                <div className="px-5 mt-2">
                    <div className="w-full bg-slate-50 rounded-lg border-[1px] drop-shadow-lg px-3 py-3 text-center flex justify-between">
                        <div className="flex">
                            <IoLocationSharp className="text-2xl my-auto text-red-600" />
                            <p className="ml-1 text-xl text-slate-700 tracking-wider">สตูล</p>
                        </div>
                        <FiMenu className="text-2xl my-auto" />
                    </div>
                </div>
                <div className="w-full grid grid-cols-2 px-6 gap-x-2 gap-y-2 mt-4">
                    <p className="col-span-2 text-center">อยากเที่ยวแบบไหน ?</p>
                    <div className="bg-green-100 rounded-xl border-green-500 border-2 px-3 pt-2 pb-1 text-center">
                        <BsTree className="text-2xl mx-auto text-green-800" />
                        <p className="text-lg tracking-wider text-slate-700 mt-1">ธรรมชาติ, ป่าไม้</p>
                    </div>
                    <div className="bg-blue-100 rounded-xl border-blue-500 border-2 px-3 pt-2 pb-1 text-center">
                        <BsWater className="text-2xl mx-auto text-blue-800" />
                        <p className="text-lg tracking-wider text-slate-700 mt-1">แหล่งน้ำ, ทะเล</p>
                    </div>
                    <div className="bg-orange-100 rounded-xl border-orange-500 border-2 px-3 pt-2 pb-1 text-center">
                        <MdOutlineHouseSiding className="text-2xl mx-auto text-orange-800" />
                        <p className="text-lg tracking-wider text-slate-700 mt-1">แหล่งวัฒนธรรม</p>
                    </div>
                    <div className="bg-red-100 rounded-xl border-red-500 border-2 px-3 pt-2 pb-1 text-center">
                        <PiPersonSimpleRunDuotone className="text-2xl mx-auto text-red-800" />
                        <p className="text-md tracking-wider text-slate-700 mt-1.5">สนุกสนาน, ผจญภัย</p>
                    </div>
                </div>
                <div className="ml-8 mt-4 mb-2 text-lg font-semibold">
                    <p>สถานที่แนะนำ</p>
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

                <div className='px-5 mx-auto mt-4'>
                    <p className="mb-1">ค้นหาสถานที่เที่ยว</p>
                    <div className="relative flex items-center w-full h-12 rounded-lg shadow-md bg-white overflow-hidden border-[1px] border-[#10000]">
                        <div className="grid place-items-center h-full w-12 text-gray-300">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>

                        <input
                            class="peer h-full w-full outline-none text-lg text-gray-700 pr-2"
                            type="text"
                            id="search"
                            placeholder="เกาะ" />
                    </div>
                </div>
                <div className="px-5 mt-3">
                    <p className="mb-1">ผลลัพธ์</p>
                    {panels2.map((item) => [
                        <div className="w-full bg-slate-50 rounded-lg border-[1px] drop-shadow-lg text-center px-2 py-2
                       flex mb-2" id={item.id}>
                            <img src={item.img} className="w-32 rounded-l-lg"/>
                            <div className="">
                                <p className="ml-2 text-xl font-bold tracking-wide text-slate-600 text-left">{item.name}</p>
                                <p className="text-sm tracking-wide text-slate-500 text-left mx-2">{item.detail}</p>
                            </div>
                        </div>
                    ])}
                </div>
            </div>
        </div>
    )
}

export default PlannerSearch;

