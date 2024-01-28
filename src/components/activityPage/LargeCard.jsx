import React, { useState, useEffect } from 'react'
import { AiFillPlusCircle } from "react-icons/ai"
import { FaPhoneAlt } from "react-icons/fa"
import { FaBahtSign } from "react-icons/fa6"
import { CiLocationOn } from "react-icons/ci";

const LargeCard = ({ id, data, displayModalPlan, displayModalReadmore }) => {

    const tags = data.tag.split(',');

    const DisplayModalState = () => {
        displayModalPlan(true, id);
    }

    const DisplayReadmoreState = () => {
        displayModalReadmore(true, id);
    }

    return (
        <div className="relative w-full h-full mb-4">
            <div className="rounded-xl overflow-hidden shadow-lg border-2 border-slate-200 border-b-0 grid grid-cols-12">
                <div className="col-span-5 w-full h-full">
                    <img
                        className="object-cover h-full"
                        src={data.image_url}
                        alt="Sunset in the mountains" />
                </div>
                <div className="text-xs col-span-7 px-3">
                    <div className="pb-1 pt-3">
                        <div className="flex">
                            <p className="text-green-700 text-xs">เปิด</p>
                            <p className="text-gray-600 text-xs ml-2">| {data.open_time} - {data.close_time}</p>
                        </div>
                        <p className="font-bold text-lg mt-1">{data.name}</p>
                        <p className="text-gray-700 text-xs">{data.description}</p>
                    </div>
                    <button className="rounded-lg px-2 py-2 flex border-2 border-gray-400 text-slate-500 w-fit"
                        onClick={() => DisplayReadmoreState()}>
                        {/* <AiFillPlusCircle className="my-auto text-xl" /> */}
                        <p className="my-auto text-[0.9rem]">ดูข้อมูลเพิ่มเติม</p>
                    </button>
                    <button className="rounded-lg px-2 py-2 flex bg-[#51b3ce] text-white w-fit mt-1.5"
                        onClick={() => DisplayModalState()}>
                        <AiFillPlusCircle className="my-auto text-xl" />
                        <p className="my-auto ml-1 text-[0.9rem]">เพิ่มในแผนเที่ยว</p>
                    </button>
                    <div className='pt-2 pb-2 flex'>
                        <CiLocationOn className='text-red-800 my-auto mr-1 text-xl' />
                        <p className='text-slate-500 text-sm'>{data.province}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LargeCard