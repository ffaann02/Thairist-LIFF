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
import HeaderModal from './HeaderModal';
import PlanTimeline from './PlanTimeline';
import { sortByStartTime, findDefaultTime, addHoursToTime, calculateOverlapTime } from './modalUtils';

const ModalPlan = ({ displayModalPlan, selectedAttraction }) => {

    const { userProfile, setUser } = useUser();

    const navigate = useNavigate();

    const [planData, setPlanData] = useState();
    const [noPlanCreated, setNoPlanCreated] = useState();
    const [dates, setDates] = useState();
    const [currentSelectDay, setCurrentSelectDay] = useState(null);
    const monthNames = ["ม.ค.", "ก.พ.", "มี.ย.", "เม.ย.", "พ.ค.", "มิ.ย.",
        "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."
    ];
    const [planDetailExist, setPlanDetailExist] = useState();

    dayjs.extend(customParseFormat);
    const [startTimeSelects, setStartTimeSelects] = useState();
    const [endTimeSelects, setEndTimeSelects] = useState();
    const [disabledHours, setDisabledHours] = useState([]);
    const [newOrderPlanDetail, setNewOrderPlanDetail] = useState();
    const [defaultStartTime, setDefaultStartTime] = useState();

    useEffect(() => {
        if (userProfile) {
            console.log(`user_id: ${userProfile.userId}`);
            axios.get(`${import.meta.env.VITE_SERVER_HTTP}/check_plan_exist?owner_id=${userProfile.userId}`)
                .then(res => {
                    if (res.data.empty) {
                        console.log("Plan is empty");
                        setNoPlanCreated(true);
                    }
                    else {
                        setPlanData(res.data);
                        dateFormat(res.data.result);
                    }
                })
                .catch(err => console.log(err));
        }
    }, [userProfile])

    useEffect(() => {
        if (planData) {
            axios.get(`${import.meta.env.VITE_SERVER_HTTP}/fetch_plan_detail?plan_id=${planData.plan_id}`)
                .then(res => {
                    if (res.data.empty) {
                        console.log("No plan detail");
                    }
                    else {
                        setPlanDetailExist(res.data.result);
                    }
                })
        }
    }, [planData])

    useEffect(() => {
        // Already have plan detail
        if (planData && planDetailExist) {
            sortByStartTime(planData, planDetailExist, selectedAttraction, setNewOrderPlanDetail, dates, currentSelectDay, switchDay);
        }
        // Empty array
        else {
            if (dates) {
                const duplicateSelectedAttraction = selectedAttraction;
                duplicateSelectedAttraction.isSelectedAttraction = true;
                duplicateSelectedAttraction.formated_date = {
                    day: parseInt(dates[0].day),
                    month: parseInt(dates[0].month),
                    year: parseInt(dates[0].year)
                }
                const arrayOfSelectledAttraction = [duplicateSelectedAttraction];
                setNewOrderPlanDetail(arrayOfSelectledAttraction);
                findDefaultTime(dates[0], arrayOfSelectledAttraction, selectedAttraction, setDefaultStartTime, setEndTimeSelects);
            }
        }
    }, [planDetailExist, dates])

    const DisplayModalState = (state) => {
        displayModalPlan(state, 0);
    }

    const dateFormat = (date) => {
        setDates(date);
        setCurrentSelectDay(0);
    }

    const switchDay = (indexDay, specific_day, sortedPlanDetail) => {
        setCurrentSelectDay(indexDay);
        calculateOverlapTime(selectedAttraction, planDetailExist, specific_day, setDisabledHours);
        findDefaultTime(specific_day, sortedPlanDetail, selectedAttraction, setDefaultStartTime, setEndTimeSelects);
    }

    // update to db
    const InsertToDatabase = () => {
        axios.post(`${import.meta.env.VITE_SERVER_HTTP}/add_new_attraction`, {
            plan_id: planData.plan_id,
            attraction_id: selectedAttraction.attraction_id,
            attraction_name: selectedAttraction.name,
            attraction_description: selectedAttraction.description,
            tag: selectedAttraction.tag,
            start_time: startTimeSelects || defaultStartTime,
            end_time: endTimeSelects,
            period: selectedAttraction.period,
            date: dates[currentSelectDay],
            image_url: selectedAttraction.image_url,
            province: selectedAttraction.province,
            district: selectedAttraction.district,
            adult_price: selectedAttraction.adult_price || null,
            kid_price: selectedAttraction.kid_price || null,
            adult_amount: 1,
        })
            .then(res => {
                console.log(res);
                // Set display modal State to false
                DisplayModalState(false);
            })
            .catch(err => console.log(err));
    }

    const handleTimeChange = (time, timeString) => {
        const endTime = addHoursToTime(timeString, selectedAttraction.period);
        setStartTimeSelects(timeString);
        setEndTimeSelects(endTime);
        const newArray = [...newOrderPlanDetail];
        // Convert "start_time" to minutes since midnight for easy comparison
        newArray.forEach(attraction => {
            if (attraction.start_time) {
                const [hours, minutes] = attraction.start_time.split(':').map(Number);
                attraction.start_minutes = hours * 60 + minutes;
            }
            else {
                const [hours, minutes] = timeString.split(':').map(Number);
                attraction.start_minutes = hours * 60 + minutes;
            }
        });
        // Sort the array based on "start_minutes"
        newArray.sort((a, b) => a.start_minutes - b.start_minutes);
        // Remove the temporary "start_minutes" property
        newArray.forEach(attraction => delete attraction.start_minutes);
        setNewOrderPlanDetail(newArray);
    };

    const disabledTime = () => {
        // Disable hours after 6 PM
        return {
            disabledHours: () => [...disabledHours],
            disabledMinutes: () => [],
            disabledSeconds: () => [],
        };
    };

    return (
        <div>
            {planData && dates &&
                <div className="justify-center items-center flex overflow-x-hidden fixed inset-0 z-50 outline-none focus:outline-none bg-black bg-opacity-50">

                    <div className="relative rounded-xl h-[80%] mx-auto my-auto bg-white overflow-scroll">
                        <div className="grid grid-cols-8 ml-4 mt-4">
                            <button className="col-span-1 my-auto bg-slate-100 rounded-full w-8 h-8" onClick={() => DisplayModalState(false)}>
                                <IoChevronBackSharp className="mx-auto text-slate-800" />
                            </button>
                            <div className="col-span-7 ml-2 my-auto">
                                <p className="text-xl font-semibold mr-10">{planData.plan_name}</p>
                                <p className="text-md mt-1 text-slate-600">{dates[0].day} กันยายน - {dates[dates.length - 1].day} กันยายน</p>
                            </div>
                        </div>

                        <div className="flex px-1 mt-4 mx-auto justify-center mb-1 text-center">
                            {newOrderPlanDetail &&
                                dates.map((date, index) => (
                                    <div
                                        key={index}
                                        className={`w-fit border-b-4 py-1 px-2
                                        ${currentSelectDay === index ? "border-[#51b3ce] text-slate-800" : "border-slate-200 text-slate-500"}`}
                                        onClick={() => switchDay(index, date, newOrderPlanDetail)}>
                                        <p>วัน {index + 1}</p>
                                        <p className="text-sm">{date.day} {monthNames[date.month - 1]} {date.year + 543}</p>
                                    </div>
                                ))
                            }
                        </div>

                        <HeaderModal selectedAttraction={selectedAttraction}
                            handleTimeChange={handleTimeChange}
                            defaultStartTime={defaultStartTime}
                            disabledTime={disabledTime}
                            endTimeSelects={endTimeSelects} />

                        <PlanTimeline selectedAttraction={selectedAttraction}
                            newOrderPlanDetail={newOrderPlanDetail}
                            dates={dates}
                            currentSelectDay={currentSelectDay}
                            startTimeSelects={startTimeSelects}
                            endTimeSelects={endTimeSelects}
                            defaultStartTime={defaultStartTime} />

                        <div className="bottom-0 mb-4 mt-4 flex justify-center">
                            <button className="rounded-lg px-4 py-2 text-red-700 border-[1px] border-red-700" onClick={() => DisplayModalState(false)}>
                                <p className="my-auto">ยกเลิก</p>
                            </button>
                            <button className="ml-4 rounded-lg px-4 py-2 bg-blue-700 text-white" onClick={() => InsertToDatabase()}>
                                <p className="my-auto">ยืนยัน</p>
                            </button>
                        </div>

                    </div>
                </div>
            }

            {/** เพิ่มเงื่อนไขสำหรับ user ที่ยังไม่สร้าง plan */}
            {noPlanCreated &&
                <div className="justify-center items-center flex overflow-x-hidden fixed inset-0 z-50 outline-none focus:outline-none bg-black bg-opacity-50">
                    <div className="relative rounded-xl h-[20%] mx-auto my-auto bg-white overflow-scroll">
                        <div className='w-full h-full'>
                            <div className='flex justify-center'>
                                <p className='px-8 pt-6 mx-auto my-auto text-xl font-semibold'>คุณยังไม่ได้สร้างแผนการท่องเที่ยว</p>
                            </div>

                            <div className='flex justify-center'>
                                <p className='px-12 pt-2 mx-auto my-auto text-lg'>สร้างแผนการท่องเที่ยวได้ตามใจคุณ</p>
                            </div>

                            <div className='flex justify-center gap-2 pb-6 pt-2' >
                                <button className="mt-4 px-4 py-2 rounded-lg bg-white border border-[#51b3ce]" onClick={() => DisplayModalState(false)}>
                                    <p className="text-[#51b3ce]">ยกเลิก</p>
                                </button>
                                <button className="mt-4 px-4 py-2 rounded-lg bg-[#51b3ce]" onClick={() => navigate('/planner')}>
                                    <p className="text-white">สร้าง</p>
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            }

        </div>

        // <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-black bg-opacity-50">
        //     <div className="relative rounded-xl h-[80%] mx-auto my-auto bg-white">
        //         <div className="grid grid-cols-8 ml-4 mt-4">
        //             <button className="col-span-1 my-auto bg-slate-100 rounded-full w-8 h-8" onClick={() => DisplayModalState()}>
        //                 <IoChevronBackSharp className="mx-auto text-slate-800" />
        //             </button>
        //             <div className="col-span-7 ml-2 my-auto">
        //                 <p className="text-xl font-semibold mr-10">เที่ยววันหยุดจังหวัดสตูล</p>
        //                 <p className="text-md mt-1 text-slate-600">10 กันยายน - 12 กันยายน</p>
        //             </div>
        //         </div>
        //         <div className="flex px-1 mt-4 mx-auto justify-center mb-1 text-center">
        //             <div className="w-fit border-b-4 py-1 px-2 border-[#51b3ce] text-slate-800">
        //                 <p>วัน 1</p>
        //                 <p className="text-sm">10 ก.ย. 2566</p>
        //             </div>
        //             <div className="w-fit border-b-4 py-1 px-2 border-slate-200 text-slate-500">
        //                 <p>วัน 2</p>
        //                 <p className="text-sm">11 ก.ย. 2566</p>
        //             </div>
        //             <div className="w-fit border-b-4 py-1 px-2 border-slate-200 text-slate-500">
        //                 <p>วัน 3</p>
        //                 <p className="text-sm">12 ก.ย. 2566</p>
        //             </div>
        //         </div>
        //         <div className="">
        //             <div className="grid grid-cols-12 text-center py-2 mt-1">
        //                 <div className="col-span-4 text-left ml-4 flex justify-between">
        //                     <p>8:00 น.</p>
        //                     <div className="ml-3 relative mr-3">
        //                         <div className="mt-1 rounded-full bg-slate-200 p-1 mx-auto">
        //                             <MdOutlineTempleBuddhist className="border-[1px] text-blue-600" />
        //                         </div>
        //                         <div className="h-[80%] mt-1 border-l-2 absolute flex justify-center left-[0.7rem] w-full border-dotted
        //                                 border-blue-400"></div>
        //                     </div>
        //                 </div>
        //                 <div className="col-span-2">
        //                     <img src="https://ak-d.tripcdn.com/images/1i6302215cij6g8xc3131_W_400_0_R5_Q90.jpg?proc=source/trip"
        //                         className="rounded-xl shadow-md w-full h-[3.9rem]" />
        //                 </div>
        //                 <div className="col-span-6 text-left ml-3">
        //                     <p className="text-xl text-bold">สะพานข้ามกาลเวลา</p>
        //                     <p className="text-slate-400 text-sm">มรดกโลก, อุทยานธรณีสตูล</p>
        //                 </div>
        //             </div>

        // <div className="grid grid-cols-12 text-center py-2 mt-1">
        //     <div className="col-span-4 text-left ml-4 flex justify-between">
        //         <p>9:30 น.</p>
        //         <div className="ml-3 relative mr-3">
        //             <div className="mt-1 rounded-full bg-slate-200 p-1 mx-auto">
        //                 <IoWaterOutline className="border-[1px] text-blue-600" />
        //             </div>
        //             <div className="h-[80%] mt-1 border-l-2 absolute flex justify-center left-[0.7rem] w-full border-dotted
        //                     border-blue-400"></div>
        //         </div>
        //     </div>
        //     <div className="col-span-2">
        //         <img src="https://tatapi.tourismthailand.org/tatfs/Image/CustomPOI/Picture/P03013059_1.jpeg"
        //             className="rounded-xl shadow-md w-full h-[3.9rem]" />
        //     </div>
        //     <div className="col-span-6 text-left ml-3">
        //         <p className="text-xl text-bold">น้ำตกวังสายทอง</p>
        //         <p className="text-slate-400 text-sm">ล่องแก่งชมธรรมชาติ</p>
        //     </div>
        // </div>

        //             <div className="grid grid-cols-12 text-center py-2 mt-1">
        //                 <div className="col-span-4 text-left ml-4 flex justify-between">
        //                     <p>12:00 น.</p>
        //                     <div className="ml-3 relative mr-3">
        //                         <div className="mt-1 rounded-full bg-slate-200 p-1 mx-auto">
        //                             <IoFastFoodOutline className="border-[1px] text-blue-600" />
        //                         </div>
        //                         <div className="h-[80%] mt-1 border-l-2 absolute flex justify-center left-[0.7rem] w-full border-dotted
        //                                 border-blue-400"></div>
        //                     </div>
        //                 </div>
        //                 <div className="col-span-2">
        //                     <img src="https://cdn-icons-png.flaticon.com/512/2276/2276931.png"
        //                         className="rounded-xl shadow-md w-full h-[3.9rem] bg-slate-100 p-1" />
        //                 </div>
        //                 <div className="col-span-6 text-left ml-3">
        //                     <p className="text-xl text-bold">อาหารเที่ยง</p>
        //                     <p className="text-slate-400 text-sm">รับประทานอาหารทะเล</p>
        //                 </div>
        //             </div>

        //             <Draggable>
        //                 <div className="grid grid-cols-12 text-center py-2 bg-blue-600">
        //                     <div className="col-span-4 text-left ml-4 flex justify-between">
        //                         <p className="text-white">14:00 น.</p>
        //                         <div className="ml-3 relative mr-3">
        //                             <div className="mt-1 rounded-full bg-slate-200 p-1 mx-auto">
        //                                 <MdOutlineBakeryDining className="border-[1px] text-blue-600" />
        //                             </div>
        //                             <div className="h-[80%] mt-1 border-l-2 absolute flex justify-center left-[0.7rem] w-full border-dotted
        //                                     border-blue-400"></div>
        //                         </div>
        //                     </div>
        //                     <div className="col-span-2">
        //                         <img src="https://pbs.twimg.com/media/CgyhH5yXEAA2hxG.jpg"
        //                             className="rounded-xl shadow-md w-full h-[3.9rem]" />
        //                     </div>
        //                     <div className="col-span-6 text-left ml-2">
        //                         <p className="text-xl text-bold text-white">ทำขนม</p>
        //                         <p className="text-sm text-white">เรียนรู้การทำขนมบุหงาปูดะ</p>
        //                     </div>
        //                 </div>
        //             </Draggable>

        //             <div className="grid grid-cols-12 text-center py-2 ">
        //                 <div className="col-span-4 text-left ml-4 flex justify-between">
        //                     <p>17:30 น.</p>
        //                     <div className="ml-3 relative mr-3">
        //                         <div className="mt-1 rounded-full bg-slate-200 p-1 mx-auto">
        //                             <BsSun className="border-[1px] text-blue-600" />
        //                         </div>
        //                     </div>
        //                 </div>
        //                 <div className="col-span-2">
        //                     <img src="https://www.paiduaykan.com/travel/wp-content/uploads/2022/03/3-DSC00758.jpg"
        //                         className="rounded-xl shadow-md w-full h-[3.9rem]" />
        //                 </div>
        //                 <div className="col-span-6 text-left ml-2">
        //                     <p className="text-xl text-bold">หาดปากบารา</p>
        //                     <p className="text-slate-400 text-sm">จุดชมวิวพระอาทิตย์ตก</p>
        //                 </div>
        //             </div>

        //         </div>

        //         <div className="mb-4 mt-4 flex justify-center">
        //             <button className="rounded-lg px-4 py-2 text-red-700 border-[1px] border-red-700" onClick={() => DisplayModalState()}>
        //                 <p className="my-auto">ยกเลิก</p>
        //             </button>
        //             <button className="ml-4 rounded-lg px-4 py-2 bg-blue-700 text-white">
        //                 <p className="my-auto">ยืนยัน</p>
        //             </button>
        //         </div>

        //     </div>
        // </div>
    )
}

export default ModalPlan