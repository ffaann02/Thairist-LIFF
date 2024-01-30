import React from 'react'

const PlanBar = ({section,setSection}) => {

    const typeList = ["ปัจจุบัน","อดีต"];

    return (
        <div className="w-full px-6">
            <div className="flex gap-6 text-lg mt-4 font-bold">
                {typeList.map((filter, index) => (
                    <button key={index} className={`${section === index ? "text-black" : "text-slate-400"}`}
                        onClick={() => { setSection(index) }} id={`${section === index && "selected"}`}>{filter}</button>
                ))}
            </div>
        </div>
    )
}

export default PlanBar