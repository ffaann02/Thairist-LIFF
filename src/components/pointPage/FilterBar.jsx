import { useState } from "react"

export const FilterBar = ({section,setSection}) => {
    const filterList = ["สะสมคะแนน","แลกคะแนน","ประวัติของคุณ"]

    return (
        <div className="w-full px-6">
            <div className="flex justify-between text-lg mt-4 font-bold" id="FilterBar">
                {filterList.map((filter,index)=>(
                    <button className={`${section === index ? "text-black" : "text-slate-400"}`}
                    onClick={()=>{setSection(index)}} id={`${section === index && "selected"}`}>{filter}</button>
                ))}
            </div>
        </div>
    )
}