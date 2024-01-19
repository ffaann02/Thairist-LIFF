import React, { useState, useEffect } from 'react'
import { AiFillPlusCircle } from "react-icons/ai"
import { FaPhoneAlt } from "react-icons/fa"
import { FaBahtSign } from "react-icons/fa6"

const LargeCard = ({id, data, displayModalPlan}) => {

    const tags = data.tag.split(',');

    const DisplayModalState = () => {
        displayModalPlan(true, id);
    }

    return (
        <div className="relative mt-6 w-full h-full">
            <div className="mx-6 max-w-sm rounded-xl overflow-hidden shadow-lg border-[2px] border-[#10000] ">
                <img
                    className="w-full"
                    src={data.image_url}
                    alt="Sunset in the mountains" />
                <div className="px-6 py-4">
                    <div className="flex">
                        <p className="text-green-700 text-sm">เปิด</p>
                        <p className="text-gray-600 text-sm ml-2">| {data.open_time} - {data.close_time}</p>
                    </div>
                    <p className="font-bold text-xl mt-2">{data.name}</p>
                    <p className="text-gray-700 text-base mt-1">{data.description}</p>
                </div>
                <div className="px-6 pb-2 mt-2">
                    {tags.map((tag, index) => (
                        <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{tag}</span>
                    ))}
                </div>
                <div className="mb-4 flex ml-6">
                    <button className="rounded-lg px-4 py-2 flex text-red-700 border-[1px] border-red-700">
                        <FaBahtSign className="my-auto" />
                        <p className="my-auto ml-1">{data.price}/คน</p>
                    </button>
                    <button className="ml-2 rounded-lg px-4 py-2 flex text-blue-700 border-[1px] border-blue-700">
                        <FaPhoneAlt className="my-auto" />
                        <p className="my-auto ml-2">โทร</p>
                    </button>
                    <button className="ml-2 rounded-lg px-4 py-2 flex bg-blue-700 text-white" onClick={() => DisplayModalState()}>
                        <AiFillPlusCircle className="my-auto" />
                        <p className="my-auto ml-2">แผน</p>
                    </button>
                </div>

            </div>
        </div>
    )
}

export default LargeCard