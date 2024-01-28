import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import axios from "axios";
import { AiFillCaretLeft, AiFillCaretRight, AiFillPlusCircle } from "react-icons/ai"
import { MdOutlineTempleBuddhist } from "react-icons/md"
import { IoWaterOutline, IoFastFoodOutline } from "react-icons/io5"
import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';
import { Calendar } from '@hassanmojab/react-modern-calendar-datepicker';
import { useUser } from "../../UserContext";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import PlanCalendar from "./PlanCalendar";
import PlanList from "./PlanList";
import BannerPlan from "./BannerPlan";
import { checkName, generatedPlanID, changeTimeLineByDrag, sortByStartTime} from "./utils";

const Planner = () => {

    const { userProfile, setUser } = useUser();

    const navigate = useNavigate();

    const currentDate = new Date();
    const minimumCalendar = {
        year: currentDate.getFullYear(),
        month: currentDate.getMonth() + 1,
        day: currentDate.getDate()
      };

    const [isPlanExist, setIsPlanExist] = useState(false);
    const [planID, setPlanID] = useState();

    const [tempSelectedDays, setTempSelectedDays] = useState([]);
    const [selectedDays, setSelectedDays] = useState([]);
    const [isSelectDaysClicked, setIsSelectDaysClicked] = useState(false);
    const [currentSelectDay, setCurrentSelectDay] = useState(null);
    const [planName, setPlanName] = useState("");
    const [tempPlanName, setTempPlanName] = useState("");

    const [planDetailExist, setPlanDetailExist] = useState();
    const [newOrderPlanDetail, setNewOrderPlanDetail] = useState();

    const monthNames = ["ม.ค.", "ก.พ.", "มี.ย.", "เม.ย.", "พ.ค.", "มิ.ย.",
        "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."
    ];

    const [isDraggingEnabled, setIsDraggingEnabled] = useState(false);
    const [editedPlanData, setEditedPlanData] = useState([]);

    useEffect(() => {
        if (userProfile) {
            console.log(`user_id: ${userProfile.userId}`);
            axios.get(`${import.meta.env.VITE_SERVER_HTTP}/check_plan_exist?owner_id=${userProfile.userId}`)
                .then(res => {
                    if (res.data.empty) {
                        setIsPlanExist(false);
                        setPlanName("");
                        setSelectedDays([]);
                        setTempSelectedDays([]);
                        setIsSelectDaysClicked(false);
                        setPlanID();
                    }
                    else {
                        const days = res.data.result;
                        setIsPlanExist(true);
                        setPlanName(res.data.plan_name);
                        setSelectedDays(days);
                        setTempSelectedDays(days);
                        setIsSelectDaysClicked(true);
                        setPlanID(res.data.plan_id);
                    }
                })
                .catch(err => console.log(err));
        }
    }, [userProfile])

    useEffect(() => {
        if (userProfile && planID && isPlanExist === true) {
            console.log(planID);
            axios.get(`${import.meta.env.VITE_SERVER_HTTP}/fetch_plan_detail?plan_id=${planID}`)
                .then(res => {
                    if (res.data.empty) {
                        setPlanDetailExist();
                        if (currentSelectDay === null) {
                            setCurrentSelectDay(0);
                        }
                    }
                    else {
                        if (currentSelectDay === null) {
                            setCurrentSelectDay(0);
                        } 
                        setPlanDetailExist(res.data.result);
                        sortByStartTime(res.data.result, setNewOrderPlanDetail, true, selectedDays);
                    }
                })
                .catch(err => console.log(err));
        }
    }, [isPlanExist, planID])

    const fetchPlanDetail = () => {
        axios.get(`${import.meta.env.VITE_SERVER_HTTP}/fetch_plan_detail?plan_id=${planID}`)
                .then(res => {
                    if (res.data.empty) {
                        setPlanDetailExist();
                        if (currentSelectDay === null) {
                            setCurrentSelectDay(0);
                        }
                    }
                    else {
                        if (currentSelectDay === null) {
                            setCurrentSelectDay(0);
                        } 
                        setPlanDetailExist(res.data.result);
                        sortByStartTime(res.data.result, setNewOrderPlanDetail, false, selectedDays, selectedDays[currentSelectDay]);
                    }
                })
                .catch(err => console.log(err));
    }

    // useEffect(() => {
    //     console.log(editedPlanData);
    // }, [editedPlanData])

    const displayCalendar = () => {
        document.getElementById('my_modal_4').showModal();
    }

    const handleSelectedDays = () => {
        if (currentSelectDay === null) {
            setCurrentSelectDay(0);
        }
        const currentPlanName = checkName(planName, tempPlanName);
        if (isPlanExist === false) {
            const planId = generatedPlanID();
            setPlanID(planId);
            console.log(planId);
            // Post to database
            axios.post(`${import.meta.env.VITE_SERVER_HTTP}/create_new_plan`, {
                plan_id: planId,
                owner_id: userProfile.userId,
                dates: tempSelectedDays,
                plan_name: currentPlanName
            })
                .then(res => {
                    console.log(res);
                })
                .catch(err => console.log(err));
        }
        setSelectedDays(tempSelectedDays);
        setIsSelectDaysClicked(true);
        setIsPlanExist(true);
        // Update to database
        axios.put(`${import.meta.env.VITE_SERVER_HTTP}/update_plan_date`, {
            plan_id: planID,
            owner_id: userProfile.userId,
            dates: tempSelectedDays,
            plan_name: currentPlanName
        })
            .then(res => {
                console.log(res);
            })
            .catch(err => console.log(err));
    }

    const handleInputName = (e) => {
        setTempPlanName(e.target.value);
    }

    const handleAddActivity = () => {
        navigate('/activity');
    }

    const switchDay = (indexDay, date) => {
        console.log(date);
        setCurrentSelectDay(indexDay);
        sortByStartTime(planDetailExist, setNewOrderPlanDetail, false, selectedDays, date);
    }

    const handleDragDrop = (result) => {
        console.log(result);
        const { source, destination, type } = result;
        if (!destination) return;
        if (source.droppableId === destination.droppableId &&
            source.index === destination.index)
            return;
        if (type === 'group') {
            const datachangedTime = changeTimeLineByDrag(source.index, destination.index, newOrderPlanDetail, editedPlanData, setEditedPlanData);
            return setNewOrderPlanDetail(datachangedTime);
        }
    }

    const handleDragStart = () => {
        // good times for mobile
        if (window.navigator.vibrate) {
            window.navigator.vibrate(100);
        }
    };

    const handleCancleEditButton = () => {
        setIsDraggingEnabled(false);
        // refetch to re-order list
        fetchPlanDetail();
    }

    const handleDeleteButton = () => {
        fetchPlanDetail();
    }

    const handleSaveButton = () => {
        setIsDraggingEnabled(false);
        // Update to database
        axios.put(`${import.meta.env.VITE_SERVER_HTTP}/edit_plan_timeline`, {
            editData: editedPlanData,
        })
            .then(res => {
                console.log(res);
            })
            .catch(err => console.log(err));
    }

    return (
        <div className="w-full h-full pt-12">
            <div className="w-full h-full max-w-4xl bg-slate-50 mx-auto min-h-screen">

                <PlanCalendar planName={planName}
                              handleInputName={handleInputName}
                              selectedDays={selectedDays}
                              tempSelectedDays={tempSelectedDays}
                              setTempSelectedDays={setTempSelectedDays}
                              handleSelectedDays={handleSelectedDays}
                              minimumCalendar={minimumCalendar}/>

                {isPlanExist === false && selectedDays.length === 0 || isSelectDaysClicked === false
                    ?
                    <div className="pt-3w-full h-full min-h-screen text-center flex">
                        <div className="m-auto mt-[80%]">
                            <p className="text-xl font-semibold">คุณยังไม่ได้วางแผนการท่องเที่ยว</p>
                            <button className="mt-4 p-2 px-4 text-lg rounded-lg bg-[#51b3ce]" onClick={displayCalendar}>
                                <p className="my-auto text-white">สร้างแผนการท่องเที่ยว</p>
                            </button>
                        </div>
                    </div>
                    :
                    <div>
                        {newOrderPlanDetail && 
                        <div className="w-full">
                                <BannerPlan data={newOrderPlanDetail}/>
                        </div>}

                        <div className="text-center pt-3">
                            <p className="mb-2 ">แผนการเที่ยวของคุณ</p>
                            <DragDropContext onDragEnd={handleDragDrop} onDragStart={() => handleDragStart()}>
                                <div className="">
                                    <div className="flex px-1 mx-auto justify-center mb-1">
                                        {selectedDays.map((date, index) => (
                                            <div className={`w-fit border-b-4 py-1 px-2 
                                                ${currentSelectDay === index ? "border-[#51b3ce] text-slate-800" : "border-slate-200 text-slate-500"}`}
                                                key={index} onClick={() => switchDay(index, date)}>
                                                <p>วัน {index + 1}</p>
                                                <p>{date.day} {monthNames[date.month - 1]} {date.year + 543}</p>
                                            </div>
                                        ))}
                                        <div className="w-fit py-1 px-4 flex">
                                            <AiFillPlusCircle className="my-auto text-xl text-blue-600" onClick={displayCalendar} />
                                        </div>
                                    </div>

                                    {isDraggingEnabled &&
                                        <div>
                                            <p>กดค้างและลากแผนการเที่ยวที่คุณต้องการเปลี่ยนเวลา</p>
                                        </div>
                                    }

                                    <Droppable droppableId='ROOT' type='group'>
                                        {(provided) => (
                                            <div {...provided.droppableProps} ref={provided.innerRef}>
                                                {newOrderPlanDetail
                                                    ?
                                                    <div>
                                                        {newOrderPlanDetail.map((detail, index) => (
                                                            <Draggable
                                                                draggableId={index.toString()}
                                                                key={index}
                                                                index={index}
                                                                isDragDisabled={!isDraggingEnabled}>
                                                                {(provided) => (
                                                                    <div {...provided.dragHandleProps}
                                                                        {...provided.draggableProps}
                                                                        ref={provided.innerRef}>
                                                                        {(detail.formated_date.day === selectedDays[currentSelectDay].day &&
                                                                            detail.formated_date.month === selectedDays[currentSelectDay].month &&
                                                                            detail.formated_date.year === selectedDays[currentSelectDay].year)
                                                                            ?
                                                                            <PlanList
                                                                                key={index}
                                                                                index={index}
                                                                                detail={detail}
                                                                                refetch={handleDeleteButton}/>
                                                                            : null}
                                                                    </div>
                                                                )}
                                                            </Draggable>
                                                        ))}
                                                    </div>
                                                    : <div>
                                                        <p className="font-semibold ">คุณยังไม่มีสถานที่หรือกิจกรรมใด ๆ ในแผนการท่องเที่ยว</p>
                                                        <p className="text-slate-600">คลิกปุ่มข้างล่างเพื่อเพิ่มได้เลย</p>
                                                    </div>}
                                            </div>
                                        )}
                                    </Droppable>

                                    {(isDraggingEnabled && planDetailExist)
                                        ? <div>
                                            <button className="ml-2 mt-4 px-4 py-2 rounded-lg  bg-white border border-[#51b3ce]" onClick={() => handleCancleEditButton()}>
                                                <p className="text-[#51b3ce]">ยกเลิก</p>
                                            </button>
                                            <button className="ml-2 mt-4 px-4 py-2 rounded-lg bg-[#51b3ce]" onClick={() => handleSaveButton()}>
                                                <p className="text-white">บันทึก</p>
                                            </button>
                                        </div>
                                        : <button className="ml-2 mt-4 px-4 py-2 rounded-lg bg-white border border-[#51b3ce]" onClick={() => setIsDraggingEnabled(true)}>
                                            <p className="text-[#51b3ce]">แก้ไข</p>
                                        </button>
                                    }

                                    {!isDraggingEnabled &&
                                        <button className="ml-2 mt-4 px-4 py-2 rounded-lg bg-[#51b3ce]" onClick={() => handleAddActivity()}>
                                            <p className="text-white">เพิ่มสถานที่หรือกิจกรรม</p>
                                        </button>
                                    }

                                </div>
                            </DragDropContext>
                        </div>
                    </div>}
            </div>
        </div>
    )
}
export default Planner