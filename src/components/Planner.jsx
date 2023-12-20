import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import axios from "axios";
import { AiFillCaretLeft, AiFillCaretRight, AiFillPlusCircle } from "react-icons/ai"
import { MdOutlineTempleBuddhist } from "react-icons/md"
import { IoWaterOutline, IoFastFoodOutline } from "react-icons/io5"
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import { Calendar } from "react-modern-calendar-datepicker";

const Planner = ({ userProfile }) => {
    const navigate = useNavigate();
    const [isPlanExist, setIsPlanExist] = useState(false);
    const [planID, setPlanID] = useState();
    const [tempSelectedDays, setTempSelectedDays] = useState([]);
    const [selectedDays, setSelectedDays] = useState([]);
    const [isSelectDaysClicked, setIsSelectDaysClicked] = useState(false);
    const [currentSelectDay, setCurrentSelectDay] = useState(null);

    const monthNames = ["ม.ค.", "ก.พ.", "มี.ย.", "เม.ย.", "พ.ค.", "มิ.ย.",
        "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."
    ];

    useEffect(() => {
        if (userProfile) {
            console.log(`user_id: ${userProfile.userId}`);
            axios.get(`http://localhost:3200/check_plan_exist?owner_id=${userProfile.userId}`)
                .then(res => {
                    if (res.data.empty) {
                        console.log("Plan is Empty");
                        setIsPlanExist(false);
                        setSelectedDays([]);
                        setTempSelectedDays([]);
                        setIsSelectDaysClicked(false);
                        setPlanID();
                    }
                    else {
                        console.log("Already have plan");
                        const days = res.data.result;
                        console.log(days);
                        setIsPlanExist(true);
                        setSelectedDays(days);
                        setTempSelectedDays(days);
                        setIsSelectDaysClicked(true);
                        setPlanID(res.data.plan_id);
                        if (currentSelectDay === null) {
                            setCurrentSelectDay(0);
                        }
                    }
                })
                .catch(err => console.log(err));
        }
    }, [])

    // useEffect(() => {
    //     if(userProfile){

    //     }
    // }, [isPlanExist])

    const generatedPlanID = () => {
        // Generate random characters
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        const randomChars = Array.from({ length: 3 }, () => characters[Math.floor(Math.random() * characters.length)]);
        // Generate random numbers
        const randomNumber = Math.floor(1000 + Math.random() * 9000);
        // Combine characters and numbers to create the unique ID
        const uniqueId = `${randomChars.join('')}${randomNumber}`;
        return uniqueId;
    }

    const displayDate = () => {
        document.getElementById('my_modal_4').showModal();
    }

    const handleSelectedDays = () => {
        console.log(isPlanExist);
        if (isPlanExist === false) {
            const planId = generatedPlanID();
            setPlanID(planId);
            console.log(planId);
            // Post to database
            axios.post(`http://localhost:3200/create_new_plan`, {
                plan_id: planId,
                owner_id: userProfile.userId,
                dates: tempSelectedDays
            })
                .then(res => {
                    console.log(res);
                })
                .catch(err => console.log(err));
        }
        setSelectedDays(tempSelectedDays);
        setIsSelectDaysClicked(true);
        setIsPlanExist(true);
        if (currentSelectDay === null) {
            setCurrentSelectDay(0);
        }
        // Update to database
        axios.put(`http://localhost:3200/update_plan`, {
            plan_id: planID,
            owner_id: userProfile.userId,
            dates: tempSelectedDays
        })
            .then(res => {
                console.log(res);
            })
            .catch(err => console.log(err));
    }

    return (
        <div className="w-full h-full">
            <div className="w-full h-full max-w-4xl bg-slate-50 mx-auto min-h-screen">

                {isPlanExist === false && selectedDays.length === 0 || isSelectDaysClicked === false
                    ?
                    <div className="pt-3w-full h-full min-h-screen text-center flex">
                        <div className="m-auto mt-[80%]">
                            <p className="text-xl font-semibold">คุณยังไม่ได้วางแผนการท่องเที่ยว</p>
                            <button className="mt-4 p-2 px-4 text-lg rounded-lg bg-[#51b3ce]" onClick={displayDate}>
                                <p className="my-auto text-white">สร้างแผนการท่องเที่ยว</p>
                            </button>
                        </div>
                    </div>
                    :
                    <div>
                        <div className="text-center pt-3">
                            <p className="mb-2 ">แผนการเที่ยวของคุณ</p>
                            <div className="">
                                <div className="flex px-1 mx-auto justify-center mb-1">
                                    {selectedDays.map((date, index) => (
                                        <div className={`w-fit border-b-4 py-1 px-2 
                                        ${currentSelectDay === index ? "border-[#51b3ce] text-slate-800" : "border-slate-200 text-slate-500"}`}
                                            key={index} onClick={() => setCurrentSelectDay(index)}>
                                            <p>วัน {index + 1}</p>
                                            <p>{date.day} {monthNames[date.month - 1]} {date.year + 543}</p>
                                        </div>
                                    ))}
                                    <div className="w-fit py-1 px-4 flex">
                                        <AiFillPlusCircle className="my-auto text-xl text-blue-600" onClick={displayDate} />
                                    </div>
                                </div>
                                <div className="pt-4">

                                    <p>จัดการแผนท่องเที่ยว</p>
                                </div>
                            </div>
                        </div>
                    </div>}

                {/* You can open the modal using document.getElementById('ID').showModal() method */}
                <dialog id="my_modal_4" className="modal">
                    <div className="modal-box w-11/12 max-w-5xl">
                        <div className="w-full flex">
                            <h3 className="mx-auto font-bold text-lg">เลือกวันท่องเที่ยวที่คุณต้องการ</h3>
                        </div>

                        <Calendar
                            value={tempSelectedDays}
                            onChange={setTempSelectedDays}
                            shouldHighlightWeekends
                        />

                        <div className="modal-action">
                            <form method="dialog">
                                {/* if there is a button, it will close the modal */}
                                <button className="btn" onClick={() => setTempSelectedDays(selectedDays)}>ยกเลิก</button>
                            </form>
                            <form method="dialog">
                                {/* if there is a button, it will close the modal */}
                                <button className="btn bg-[#51b3ce] text-white" onClick={() => handleSelectedDays()}>
                                    เลือก
                                </button>
                            </form>

                        </div>
                    </div>
                </dialog>


                {/* <div className="relative h-[40vh]">
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
                    <img src="https://thailandtourismdirectory.go.th/assets/upload/2017/11/02/2017110227f237e6b7f96587b6202ff3607ad88a153922.JPG"
                        className="w-full h-[40vh]" />
                </div> */}

                {/* <div className="text-center mt-3">
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
                                    <img src="https://thailandtourismdirectory.go.th/assets/upload/2017/11/02/2017110227f237e6b7f96587b6202ff3607ad88a153922.JPG"
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
                                    <img src="https://thailandtourismdirectory.go.th/assets/upload/2017/11/02/2017110227f237e6b7f96587b6202ff3607ad88a153922.JPG"
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
                </div> */}
            </div>
        </div>
    )
}
export default Planner