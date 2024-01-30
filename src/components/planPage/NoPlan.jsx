import React from 'react'

const NoPlan = ({displayCalendar}) => {
    return (
        <div className="pt-3w-full h-full min-h-screen text-center flex">
            <div className="m-auto mt-[20%] justify-center items-center">
                <img className="w-64 h-64 m-6" src='https://i.ibb.co/LZzS88s/Empty-plan.png'/>
                <p className="text-xl font-semibold">คุณยังไม่ได้วางแผนการท่องเที่ยว?</p>
                <p className="text-m text-slate-400">สร้างประสบการณ์การท่องเที่ยวด้วยกัน</p>
                <button className="mt-4 p-2 px-4 text-lg rounded-lg bg-[#00AEEF]" onClick={displayCalendar}>
                    <p className="my-auto text-white">เริ่มสร้างแผนการท่องเที่ยว !</p>
                </button>
            </div>
        </div>
    )
}

export default NoPlan