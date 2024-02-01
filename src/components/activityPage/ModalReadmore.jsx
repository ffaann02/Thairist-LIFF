import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import axios from "axios";
import { useUser } from "../../UserContext";
import { IoChevronBackSharp, IoWaterOutline, IoFastFoodOutline } from "react-icons/io5"
import { MdOutlineTempleBuddhist, MdOutlineBakeryDining } from "react-icons/md"
import { BsSun } from "react-icons/bs"
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { TimePicker } from 'antd';
import { AiFillPlusCircle } from "react-icons/ai"
import { FaPhoneAlt } from "react-icons/fa"
import { FaBahtSign } from "react-icons/fa6"
import { CiLocationOn } from "react-icons/ci";
import { MdCancel } from "react-icons/md";
import Rating from './Rating';

const ModalReadmore = ({ displayModalReadmore, selectedAttraction }) => {

    console.log(selectedAttraction.review);

    const tags = selectedAttraction.tag.split(',');
    useEffect(() => {
        console.log(selectedAttraction);
    }, [])
    return (
        <div>
            <div className="justify-center items-center flex fixed inset-0 z-50 outline-none focus:outline-none bg-black bg-opacity-50">
                <div className="relative rounded-xl my-auto bg-white p-2 mx-4 max-w-sm pb-1">
                    <MdCancel className='absolute -top-3 -right-1 text-4xl text-white bg-red-500 rounded-full'
                        onClick={() => { displayModalReadmore() }} />
                    <img src={selectedAttraction.image_url} className="rounded-t-lg" />
                    <div className='px-1 mt-2'>
                        <p className='text-xl font-bold mt-1'>{selectedAttraction.name}</p>
                        <Rating rating={selectedAttraction.review}/>
                        <p className=''>{selectedAttraction.description}</p>
                        <div className='flex gap-x-2 mt-2'>
                            <button className="rounded-lg px-2 py-1 flex text-red-700 border-[1px] border-red-700">
                                <FaBahtSign className="my-auto" />
                                <p className="my-auto ml-1">{selectedAttraction.price}/คน</p>
                            </button>
                            <button className="rounded-lg px-2 py-1 flex text-blue-700 border-[1px] border-blue-700">
                                <FaPhoneAlt className="my-auto" />
                                <p className="my-auto ml-2">โทร</p>
                            </button>
                        </div>
                        <div className="text-sm mt-4">
                            {tags.map((tag, index) => (
                                <span key={index} className="inline-block bg-gray-200 rounded-xl px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{tag}</span>
                            ))}
                        </div>
                        <div className="flex w-full mb-2 mt-1">
                            <CiLocationOn className='text-red-800 my-auto mr-1 text-xl' />
                            <p className='text-slate-500 text-md'>{selectedAttraction.province}</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ModalReadmore