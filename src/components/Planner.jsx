import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import axios from "axios";
import { AiFillCaretLeft, AiFillCaretRight, AiFillPlusCircle } from "react-icons/ai"
import { MdOutlineTempleBuddhist } from "react-icons/md"
import { IoWaterOutline, IoFastFoodOutline } from "react-icons/io5"
import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';
import { Calendar } from '@hassanmojab/react-modern-calendar-datepicker';
import { useUser } from "../UserContext";

const Planner = () => {

    const { userProfile, setUser } = useUser();

    const navigate = useNavigate();

    const [isPlanExist, setIsPlanExist] = useState(false);
    const [planID, setPlanID] = useState();

    const [tempSelectedDays, setTempSelectedDays] = useState([]);
    const [selectedDays, setSelectedDays] = useState([]);
    const [isSelectDaysClicked, setIsSelectDaysClicked] = useState(false);
    const [currentSelectDay, setCurrentSelectDay] = useState(null);

    const [isActivitiyExist, setIsActivitiesExist] = useState(false);

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
    }, [userProfile])

    useEffect(() => {
        if (userProfile && isPlanExist === true) {
            axios.get(`http://localhost:3200/fetch_plan_detail?plan_id=${planID}`)
                .then(res => {
                    if (res.data.empty) {
                        setIsActivitiesExist(false);
                        console.log(res.data.message);
                    }
                    else {
                        console.log(res.data.message);
                        setIsActivitiesExist(true);
                    }
                })
                .catch(err => console.log(err));
        }
    }, [isPlanExist])

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

    const handleAddActivity = () => {
        navigate('/activity');
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
                                    {isActivitiyExist === false &&
                                        <div>
                                            <p className="font-semibold ">คุณยังไม่มีสถานที่หรือกิจกรรมใด ๆ ในแผนการท่องเที่ยว</p>
                                            <p className="text-slate-600">คลิกปุ่มข้างล่างเพื่อเพิ่มได้เลย</p>
                                        </div>
                                    }
                                    <button className="mt-4 px-4 py-2 rounded-lg bg-[#51b3ce]" onClick={() => handleAddActivity()}>
                                        <p className="text-white">เพิ่มสถานที่หรือกิจกรรม</p>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>}

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
                                <button className="btn" onClick={() => setTempSelectedDays(selectedDays)}>ยกเลิก</button>
                            </form>
                            <form method="dialog">
                                <button className="btn bg-[#51b3ce] text-white" onClick={() => handleSelectedDays()}>
                                    เลือก
                                </button>
                            </form>
                        </div>
                    </div>
                </dialog>

            </div>
        </div>
    )
}
export default Planner