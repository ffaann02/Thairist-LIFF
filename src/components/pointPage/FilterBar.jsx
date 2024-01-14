import { useState } from "react"

export const FilterBar = ({section,setSection}) => {

    const setIndex=(index)=>{
        setServiceIndex(index);
    }

    return (
        <div className="w-full px-6">
            <div className="flex justify-between text-lg mt-4 font-bold" id="FilterBar">
                <button className={`${section === 0 ? "text-black" : "text-slate-400"}`}
                    onClick={()=>{setSection(0)}}>สะสมคะแนน</button>
                <button className={`${section === 1 ? "text-black" : "text-slate-400"}`}
                    onClick={()=>{setSection(1)}}>แลกคะแนน</button>
                <button className={`${section === 2 ? "text-black" : "text-slate-400"}`}
                    onClick={()=>{setSection(2)}}>ประวัติของคุณ</button>
            </div>
        </div>
    )
}