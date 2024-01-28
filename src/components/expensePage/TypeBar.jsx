import React from 'react'

const TypeBar = ({section,setSection}) => {

    const typeList = ["ตามแผนการเที่ยว","เพิ่มเติม"];

    return (
        <div className="w-full px-6">
            <div className="flex gap-6 text-lg mt-4 font-bold" id="FilterBar">
                {typeList.map((filter, index) => (
                    <button key={index} className={`${section === index ? "text-black" : "text-slate-400"}`}
                        onClick={() => { setSection(index) }} id={`${section === index && "selected"}`}>{filter}</button>
                ))}
            </div>
        </div>
    )
}

export default TypeBar