import React from 'react'
import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';
import { Calendar } from '@hassanmojab/react-modern-calendar-datepicker';

const PlanCalendar = ({planName, handleInputName, selectedDays ,tempSelectedDays, setTempSelectedDays, handleSelectedDays, minimumCalendar}) => {
    return (
        <div>
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
    )
}

export default PlanCalendar