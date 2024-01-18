import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useUser } from "../../UserContext";
import { IoChevronBackSharp, IoWaterOutline, IoFastFoodOutline } from "react-icons/io5"
import { MdOutlineTempleBuddhist, MdOutlineBakeryDining } from "react-icons/md"
import { BsSun } from "react-icons/bs"
import { useNavigate } from "react-router-dom"
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { TimePicker } from 'antd';

const ModalPlan = ({ displayModalPlan, selectedAttraction }) => {

    const { userProfile, setUser } = useUser();

    const navagate = useNavigate();

    const [planData, setPlanData] = useState();
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

    useEffect(() => {
        if (userProfile) {
            console.log(`user_id: ${userProfile.userId}`);
            axios.get(`${import.meta.env.VITE_SERVER_HTTP}/check_plan_exist?owner_id=${userProfile.userId}`)
                .then(res => {
                    if (res.data.empty) {
                        console.log("Plan is empty");
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
            // addHoursToTime(selectedAttraction.open_time, selectedAttraction.period);
            axios.get(`${import.meta.env.VITE_SERVER_HTTP}/fetch_plan_detail?plan_id=${planData.plan_id}`)
                .then(res => {
                    if (res.data.empty) {
                        console.log("No plan detail");
                    }
                    else {
                        setPlanDetailExist(res.data.result);
                        setNewOrderPlanDetail(res.data.result);
                    }
                })
        }
    }, [planData])

    useEffect(() => {
        if(planData && planDetailExist){
            switchDay(0, planData.result[0]);
            console.log(planDetailExist);
            // Sort newOrderPlan by time
            sortByStartTime(planDetailExist);
        }
    }, [planDetailExist])

    const DisplayModalState = () => {
        displayModalPlan(false, 0);
    }

    const dateFormat = (date) => {
        setDates(date);
        setCurrentSelectDay(0);
    }

    const sortByStartTime = (attractions) => {
        const newArray = [...attractions];
        console.log(newArray);
        // Convert "start_time" to minutes since midnight for easy comparison
        newArray.forEach(attraction => {
            const [hours, minutes] = attraction.start_time.split(':').map(Number);
            attraction.start_minutes = hours * 60 + minutes;
        });
    
        // Sort the array based on "start_minutes"
        newArray.sort((a, b) => a.start_minutes - b.start_minutes);
    
        // Remove the temporary "start_minutes" property
        newArray.forEach(attraction => delete attraction.start_minutes);
    
        console.log(newArray);
        return attractions;
    }
    

    const addHoursToTime = (baseTime, hoursToAdd) => {
        console.log(hoursToAdd);
        // Parse the base time string into hours and minutes
        const [baseHours, baseMinutes] = baseTime.split(':').map(Number);

        // Calculate the total minutes for the base time
        const totalBaseMinutes = baseHours * 60 + baseMinutes;

        // Calculate the total minutes for the new time after adding hours
        const totalNewMinutes = totalBaseMinutes + hoursToAdd * 60;

        // Calculate the hours and minutes for the new time
        const newHours = Math.floor(totalNewMinutes / 60);
        const newMinutes = totalNewMinutes % 60;

        // Format the result as HH.MM
        const formattedResult = `${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}`;
        return formattedResult;
    }

    // update to db
    const InsertToDatabase = () => {
        axios.post(`${import.meta.env.VITE_SERVER_HTTP}/add_new_attraction`, {
            plan_id: planData.plan_id,
            attraction_name: selectedAttraction.name,
            attraction_description: selectedAttraction.description,
            tag: selectedAttraction.tag,
            start_time: startTimeSelects,
            end_time: endTimeSelects,
            date: dates[currentSelectDay],
            image_url: selectedAttraction.image_url
        })
            .then(res => {
                console.log(res);
                navagate('/planner');
                // navigate to plan page
            })
            .catch(err => console.log(err));
    }

    const handleTimeChange = (time, timeString) => {
        setStartTimeSelects(timeString);
        const endTime = addHoursToTime(timeString, selectedAttraction.period);
        setEndTimeSelects(endTime);
    };

    const arrayRange = (start, stop, step) =>
        Array.from(
            { length: (stop - start) / step + 1 },
            (value, index) => start + index * step
        );

    const calculateOverlapTime = (specific_day) => {
        let disable_hour_array = [];
        planDetailExist.map((detail) => {
            if ((detail.formated_date.day === specific_day.day &&
                detail.formated_date.month === specific_day.month &&
                detail.formated_date.year === specific_day.year)) {
                const start_time = detail.start_time.split(':');
                const start_hour = parseInt(start_time[0]);
                const end_time = detail.end_time.split(':');
                const end_hour = parseInt(end_time[0]);
                // Create new array and unions with previous array
                const hour_array = [...Array(end_hour - start_hour)].map((_, index) => start_hour + index);
                disable_hour_array = [...new Set([...disable_hour_array, ...hour_array])];
            }
        })
        setDisabledHours(disable_hour_array);
    }

    const disabledTime = (current, type) => {
        // Disable hours after 6 PM
        return {
            disabledHours: () => [...disabledHours],
            disabledMinutes: () => [],
            disabledSeconds: () => [],
        };
    };

    const switchDay = (indexDay, specific_day) => {
        setCurrentSelectDay(indexDay);
        calculateOverlapTime(specific_day);
    }

    return (
        <div>
            {planData && dates &&
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-black bg-opacity-50">

                    <div className="relative rounded-xl h-[80%] mx-auto my-auto bg-white">
                        <div className="grid grid-cols-8 ml-4 mt-4">
                            <button className="col-span-1 my-auto bg-slate-100 rounded-full w-8 h-8" onClick={() => DisplayModalState()}>
                                <IoChevronBackSharp className="mx-auto text-slate-800" />
                            </button>
                            <div className="col-span-7 ml-2 my-auto">
                                <p className="text-xl font-semibold mr-10">{planData.plan_id} (*แก้เป็นชื่อ)</p>
                                <p className="text-md mt-1 text-slate-600">{dates[0].day} กันยายน - {dates[dates.length - 1].day} กันยายน</p>
                            </div>
                        </div>

                        <div className="flex px-1 mt-4 mx-auto justify-center mb-1 text-center">
                            {dates.map((date, index) => (
                                <div
                                    key={index}
                                    className={`w-fit border-b-4 py-1 px-2
                                    ${currentSelectDay === index ? "border-[#51b3ce] text-slate-800" : "border-slate-200 text-slate-500"}`}
                                    onClick={() => switchDay(index, date)}>
                                    <p>วัน {index + 1}</p>
                                    <p className="text-sm">{date.day} {monthNames[date.month - 1]} {date.year + 543}</p>
                                </div>
                            ))}
                        </div>

                        <div className="">

                            <div className='flex justify-items-center pt-6'>
                                <img src={selectedAttraction.image_url}
                                    className="mx-auto w-36 h-full shadow-md" />
                            </div>
                            <div className="grid grid-cols-12 py-2 pt-4">
                                <div className="col-span-4 text-left pl-6">
                                    <p className='text-sm'>เริ่ม</p>
                                    <TimePicker
                                        onChange={handleTimeChange}
                                        defaultValue={dayjs('00:00', 'HH:mm')}
                                        minuteStep={15}
                                        placeholder="เลือกเวลา"
                                        format={'HH:mm'}
                                        size="small"
                                        disabledTime={disabledTime} />
                                    <p className='text-sm pt-2'>สิ้นสุด</p>
                                    <TimePicker
                                        disabled={true}
                                        placeholder={endTimeSelects}
                                        format={'HH:mm'}
                                        size="small" />
                                </div>
                                <div className="col-span-8 text-left pt-4 pl-6">
                                    <p className="text-xl text-bold">{selectedAttraction.name}</p>
                                    <p className="text-sm">ระยะเวลาที่ใช้: {selectedAttraction.period} ชั่วโมง</p>
                                    <p className="text-sm">{selectedAttraction.tag}</p>
                                </div>
                            </div>

                            <div className='w-full pt-4'>
                                <div className='border-t-2'></div>
                            </div>

                            <div className='w-full flex justify-center pt-2'>
                                <p className='text-lg'>แผนการเที่ยวของคุณ</p>
                            </div>

                            {planDetailExist &&
                                planDetailExist.map((detail, index) => (

                                    (detail.formated_date.day === dates[currentSelectDay].day &&
                                        detail.formated_date.month === dates[currentSelectDay].month &&
                                        detail.formated_date.year === dates[currentSelectDay].year)
                                        ?
                                        <div key={index} className="grid grid-cols-12 text-center py-2 mt-1">
                                            <div className="col-span-4 text-left ml-4 flex justify-between">
                                                <div className='h-full text-black my-auto'>
                                                    <p className="top-0">{detail.start_time} น.</p>
                                                    <p className="bottom-0">{detail.end_time} น.</p>
                                                </div>
                                                <div className="ml-3 relative mr-3">
                                                    <div className="mt-1 rounded-full bg-slate-200 p-2 mx-auto">
                                                    </div>
                                                    <div className="h-[80%] mt-1 border-l-2 justify-self-center absolute mx-auto w-full border-dotted
                                                     border-blue-400"></div>
                                                </div>
                                            </div>
                                            <div className="col-span-2">
                                                <img src={detail.image_url}
                                                    className="rounded-xl shadow-md w-full h-[3.9rem]" />
                                            </div>
                                            <div className="col-span-6 text-left ml-3">
                                                <p className="text-xl text-bold">{detail.attraction_name}</p>
                                                <p className="text-slate-400 text-sm">{detail.tag}</p>
                                            </div>
                                        </div>
                                        : null
                                ))
                            }

                            <div className="grid grid-cols-12 text-center py-2 bg-blue-600">
                                <div className="col-span-4 text-left ml-4 flex justify-between">
                                    {(startTimeSelects && endTimeSelects) ?
                                        <div className='h-full text-white my-auto'>

                                            <p className="top-0">{startTimeSelects}</p>
                                            <p className="bottom-0">{endTimeSelects}</p>
                                        </div>
                                        :
                                        <div className='h-full text-white my-auto'>
                                        </div>}

                                    <div className="ml-3 relative mr-3">
                                        <div className="mt-1 rounded-full bg-slate-200 p-2 mx-auto">
                                        </div>
                                        <div className="h-[80%] mt-1 border-l-2 justify-self-center absolute mx-auto w-full border-dotted
                                                        border-blue-400"></div>
                                    </div>
                                </div>
                                <div className="col-span-2">
                                    <img src={selectedAttraction.image_url}
                                        className="rounded-xl shadow-md w-full h-[3.9rem]" />
                                </div>
                                <div className="col-span-6 text-left ml-2">
                                    <p className="text-xl text-bold text-white">{selectedAttraction.name}</p>
                                    <p className="text-sm text-white">{selectedAttraction.tag}</p>
                                </div>
                            </div>

                        </div>

                        <div className="mb-4 mt-4 flex justify-center">
                            <button className="rounded-lg px-4 py-2 text-red-700 border-[1px] border-red-700" onClick={() => DisplayModalState()}>
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