import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import axios from "axios";
import { AiFillCaretLeft, AiFillCaretRight, AiFillPlusCircle } from "react-icons/ai"
import { MdOutlineTempleBuddhist } from "react-icons/md"
import { IoWaterOutline, IoFastFoodOutline } from "react-icons/io5"

const OldPlanner = () => {

    const navigate = useNavigate();

    return (
        <div className="w-full h-full">
            <div className="w-full h-full max-w-4xl bg-slate-50 mx-auto min-h-screen">

            <div className="relative h-[40vh]">
                    <p className="absolute text-white right-2 top-2 tracking-widest text-xl">9:30 น.</p>
                    <div className="absolute bottom-0 text-white tracking-wider pl-3 pr-2 bg-green-400 w-full bg-opacity-50 
                    py-3 grid grid-cols-2">
                        <div>
                            <p className="text-2xl">น้ำตกวังสายทอง</p>
                            <p className="text-sm">อำเภอละงู, จังหวัดสตูล</p>
                        </div>
                        <div className="border-l-[1px]">
                            <p className="ml-1.5 mt-1 text-sm">ประเภท</p>
                            <div className="flex ml-1">
                                <div className="bg-white h-fit w-fit py-1 px-2 rounded-3xl">
                                    <p className="text-black text-sm">ธรรมชาติ</p>
                                </div>
                                <div className="bg-white h-fit w-fit py-1 px-2 rounded-3xl ml-2">
                                    <p className="text-black text-sm">ผจญภัย</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <img src="https://files.thailandtourismdirectory.go.th/assets/upload/2017/11/02/2017110227f237e6b7f96587b6202ff3607ad88a153922.JPG"
                        className="w-full h-[40vh]" />
                </div>

                <div className="text-center mt-3">
                    <p className="mb-2 ">แผนการเที่ยวของคุณ</p>
                    <div className="">
                        <div className="flex px-1 mx-auto justify-center mb-1">
                            <div className="w-fit border-b-4 py-1 px-2 border-[#51b3ce] text-slate-800">
                                <p>วัน 1</p>
                                <p className="text-sm">10 ก.ย. 2566</p>
                            </div>
                            <div className="w-fit border-b-4 py-1 px-2 border-slate-200 text-slate-500">
                                <p>วัน 2</p>
                                <p className="text-sm">11 ก.ย. 2566</p>
                            </div>
                            <div className="w-fit border-b-4 py-1 px-2 border-slate-200 text-slate-500">
                                <p>วัน 3</p>
                                <p className="text-sm">12 ก.ย. 2566</p>
                            </div>
                            <div className="w-fit border-b-4 py-1 px-4 border-slate-200 flex">
                                <AiFillPlusCircle className="my-auto text-xl text-blue-600" />
                            </div>
                        </div>
                        <div className="">
                            <div className="grid grid-cols-12 text-center py-2 mt-1" onClick={() => { navigate("/planner/search") }}>
                                <div className="col-span-4 text-left ml-4 flex justify-between">
                                    <p>8:00 น.</p>
                                    <div className="ml-3 relative mr-3">
                                        <div className="mt-1 rounded-full bg-slate-200 p-1 mx-auto">
                                            <MdOutlineTempleBuddhist className="border-[1px] text-blue-600" />
                                        </div>
                                        <div className="h-[80%] mt-1 border-l-2 absolute flex justify-center left-[0.7rem] w-full border-dotted
                                        border-blue-400"></div>
                                    </div>
                                </div>
                                <div className="col-span-2">
                                    <img src="https://ak-d.tripcdn.com/images/1i6302215cij6g8xc3131_W_400_0_R5_Q90.jpg?proc=source/trip"
                                        className="rounded-xl drop-shadow-md w-full h-[3.9rem]" />
                                </div>
                                <div className="col-span-6 text-left ml-3">
                                    <p className="text-xl text-bold">สะพานข้ามกาลเวลา</p>
                                    <p className="text-slate-400 text-sm">มรดกโลก, อุทยานธรณีสตูล</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-12 text-center py-2 mt-1">
                                <div className="col-span-4 text-left ml-4 flex justify-between">
                                    <p>9:30 น.</p>
                                    <div className="ml-3 relative mr-3">
                                        <div className="mt-1 rounded-full bg-slate-200 p-1 mx-auto">
                                            <IoWaterOutline className="border-[1px] text-blue-600" />
                                        </div>
                                        <div className="h-[80%] mt-1 border-l-2 absolute flex justify-center left-[0.7rem] w-full border-dotted
                                        border-blue-400"></div>
                                    </div>
                                </div>
                                <div className="col-span-2">
                                    <img src="https://files.thailandtourismdirectory.go.th/assets/upload/2017/11/02/2017110227f237e6b7f96587b6202ff3607ad88a153922.JPG"
                                        className="rounded-xl drop-shadow-md w-full h-[3.9rem]" />
                                </div>
                                <div className="col-span-6 text-left ml-3">
                                    <p className="text-xl text-bold">น้ำตกวังสายทอง</p>
                                    <p className="text-slate-400 text-sm">ล่องแก่งชมธรรมชาติ</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-12 text-center py-2 mt-1">
                                <div className="col-span-4 text-left ml-4 flex justify-between">
                                    <p>12:00 น.</p>
                                    <div className="ml-3 relative mr-3">
                                        <div className="mt-1 rounded-full bg-slate-200 p-1 mx-auto">
                                            <IoFastFoodOutline className="border-[1px] text-blue-600" />
                                        </div>
                                        <div className="h-[80%] mt-1 border-l-2 absolute flex justify-center left-[0.7rem] w-full border-dotted
                                        border-blue-400"></div>
                                    </div>
                                </div>
                                <div className="col-span-2">
                                    <img src="https://cdn-icons-png.flaticon.com/512/2276/2276931.png"
                                        className="rounded-xl drop-shadow-md w-full h-[3.9rem] bg-slate-100 p-1" />
                                </div>
                                <div className="col-span-6 text-left ml-3">
                                    <p className="text-xl text-bold">อาหารเที่ยง</p>
                                    <p className="text-slate-400 text-sm">-</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-12 text-center py-2 mt-1">
                                <div className="col-span-4 text-left ml-4 flex">
                                    <p>12:00 น.</p>
                                    <div className="ml-3 relative">
                                        <div className="mt-1 rounded-full bg-slate-200 p-1 mx-auto">
                                            <IoWaterOutline className="border-[1px] text-blue-600" />
                                        </div>
                                        <div className="h-[80%] mt-1 border-l-2 absolute flex justify-center left-[0.7rem] w-full border-dotted
                                        border-blue-400"></div>
                                    </div>
                                </div>
                                <div className="col-span-2">
                                    <img src="https://files.thailandtourismdirectory.go.th/assets/upload/2017/11/02/2017110227f237e6b7f96587b6202ff3607ad88a153922.JPG"
                                        className="rounded-xl drop-shadow-md w-full h-[3.9rem]" />
                                </div>
                                <div className="col-span-6 text-left ml-3">
                                    <p className="text-xl text-bold">น้ำตกวังสายทอง</p>
                                    <p className="text-slate-400 text-sm">ล่องแก่งชมธรรมชาติ</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-12 text-center py-2 ">
                                <div className="col-span-3 text-left ml-4">
                                    <p>9:30 น.</p>
                                </div>
                                <div className="col-span-2">
                                    <img src="https://www.paiduaykan.com/travel/wp-content/uploads/2022/03/3-DSC00758.jpg"
                                        className="rounded-xl drop-shadow-md w-full h-[3.9rem]" />
                                </div>
                                <div className="col-span-7 text-left ml-2">
                                    <p className="text-xl text-bold">หาดปากบารา</p>
                                    <p className="text-slate-400 text-sm">จุดชมวิวพระอาทิตย์ตก</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default OldPlanner