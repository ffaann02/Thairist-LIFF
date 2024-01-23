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
import PlanList from "./PlanList";
import LargePicture from "./LargePicture";
import { generatedPlanID, addHoursToTime, checkName } from "./utils";

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
                        sortByStartTime(res.data.result, false, selectedDays[currentSelectDay]);
                    }
                })
                .catch(err => console.log(err));
    }

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
                        sortByStartTime(res.data.result, true);
                    }
                })
                .catch(err => console.log(err));
        }
    }, [isPlanExist, planID])

    useEffect(() => {
        console.log(editedPlanData);
    }, [editedPlanData])

    const displayDate = () => {
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

    const sortByStartTime = (attractions, callFirstTime, currentDay) => {
        const newArray = [...attractions];
        console.log(newArray);
        const dataDay = newArray.filter(detail => {
            if (callFirstTime === true) {
                return (
                    detail.formated_date.day === selectedDays[0].day &&
                    detail.formated_date.month === selectedDays[0].month &&
                    detail.formated_date.year === selectedDays[0].year
                );
            }
            else {
                return (
                    detail.formated_date.day === currentDay.day &&
                    detail.formated_date.month === currentDay.month &&
                    detail.formated_date.year === currentDay.year
                );
            }
        });
        if (dataDay) {
            // Convert "start_time" to minutes since midnight for easy comparison
            dataDay.forEach(attraction => {
                const [hours, minutes] = attraction.start_time.split(':').map(Number);
                attraction.start_minutes = hours * 60 + minutes;
            });
            // Sort the array based on "start_minutes"
            dataDay.sort((a, b) => a.start_minutes - b.start_minutes);
            // Remove the temporary "start_minutes" property
            dataDay.forEach(attraction => delete attraction.start_minutes);
            console.log(dataDay);
            setNewOrderPlanDetail(dataDay);
        }
    }

    const changeTimeLineByDrag = (sourceIndex, destinationIndex, data) => {
        console.log(data);
        // Calculate endtime
        const source_startTime = data[sourceIndex].start_time;
        const source_period = data[sourceIndex].period;
        const destination_startTime = data[destinationIndex].start_time;
        const destination_period = data[destinationIndex].period;
        const source_endTime = addHoursToTime(source_startTime, destination_period);
        const destination_endTime = addHoursToTime(destination_startTime, source_period);
        // Swap startTime and change endTime
        data[sourceIndex].start_time = destination_startTime;
        data[sourceIndex].end_time = destination_endTime;
        data[destinationIndex].start_time = source_startTime
        data[destinationIndex].end_time = source_endTime;
        // Convert "start_time" to minutes since midnight for easy comparison
        data.forEach(attraction => {
            const [hours, minutes] = attraction.start_time.split(':').map(Number);
            attraction.start_minutes = hours * 60 + minutes;
        });
        // Sort the array based on "start_minutes"
        data.sort((a, b) => a.start_minutes - b.start_minutes);
        // Remove the temporary "start_minutes" property
        data.forEach(attraction => delete attraction.start_minutes);
        addToState(data);
        return data;
    }

    const switchDay = (indexDay, date) => {
        console.log(date);
        setCurrentSelectDay(indexDay);
        sortByStartTime(planDetailExist, false, date);
    }

    const handleDragDrop = (result) => {
        console.log(result);
        const { source, destination, type } = result;
        if (!destination) return;
        if (source.droppableId === destination.droppableId &&
            source.index === destination.index)
            return;
        if (type === 'group') {
            const datachangedTime = changeTimeLineByDrag(source.index, destination.index, newOrderPlanDetail);
            return setNewOrderPlanDetail(datachangedTime);
        }
    }

    const handleDragStart = () => {
        // good times for mobile
        if (window.navigator.vibrate) {
            window.navigator.vibrate(100);
        }
    };

    const addToState = (newDataArray) => {
        newDataArray.forEach(newData => {
            // Check if the newData's id already exists in the state
            const existingItem = editedPlanData.find(item => item.id === newData.id);
            if (!existingItem) {
                // If not a duplicate, add the newData to the state
                setEditedPlanData(prevState => [...prevState, newData]);
            }
            else {
                // If duplicate, check for changes in start_time and end_time
                if (existingItem.start_time !== newData.start_time ||
                    existingItem.end_time !== newData.end_time) {
                    // If the times are different, update the state with the new data
                    setEditedPlanData(prevState =>
                        prevState.map(item =>
                            item.id === newData.id ? { ...item, ...newData } : item
                        )
                    );
                }
            }
        });
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
                        {newOrderPlanDetail && 
                        <div className="w-full">
                                <LargePicture 
                                    data={planDetailExist}/>
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
                                            <AiFillPlusCircle className="my-auto text-xl text-blue-600" onClick={displayDate} />
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

                <dialog id="my_modal_4" className="modal">
                    <div className="modal-box w-11/12 max-w-5xl">
                        <div className="w-full flex">
                            <h3 className="mx-auto font-bold text-lg">สร้างแผนการท่องเที่ยว</h3>
                        </div>

                        <div className="w-full mt-4 mb-4 justify-items-center border border-slate-400">
                            <input type="text"
                                placeholder={planName}
                                onChange={handleInputName}
                                className="w-full px-4 py-2 bg-white" />
                        </div>

                        <Calendar
                            value={tempSelectedDays}
                            onChange={setTempSelectedDays}
                            shouldHighlightWeekends
                            minimumDate={minimumCalendar}
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