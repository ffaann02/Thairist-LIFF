import React, { useEffect, useState } from 'react'

const HistoryCollapse = ({ planDate, userExpense, sortedUserExpense, enableEdit, UpdateUserExpense }) => {

    const monthNames = ["ม.ค.", "ก.พ.", "มี.ย.", "เม.ย.", "พ.ค.", "มิ.ย.",
        "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."
    ];

    const [tempEnableEdit, setTempEnableEdit] = useState(enableEdit);

    const categoryChoices = ["ค่าเดินทาง", "ค่าอาหาร", "ค่าที่พัก"];
    const [categorySelected, setCategorySelected] = useState();
    const [tempDetail, setTempDetail] = useState("");
    const [tempPrice, setTempPrice] = useState("");
    const [dateSelected, setDateSelected] = useState();

    const handleEnableEdit = (indexDay, nestedIndex, state) => {
        // set init value
        if(state === true){
            const previousData = sortedUserExpense[indexDay][nestedIndex];
            setCategorySelected(previousData.category);
            setTempDetail(previousData.detail);
            setTempPrice(previousData.price);
            setDateSelected(`${previousData.formated_date.day}/${previousData.formated_date.month}/${previousData.formated_date.year}`);
        }        
        const duplicateState = [...enableEdit];
        duplicateState[indexDay][nestedIndex] = state;
        setTempEnableEdit(duplicateState);
    }

    const handleSaveButton = (id, indexDay, nestedIndex) => {
        UpdateUserExpense(id, categorySelected, tempDetail, tempPrice, dateSelected);
        const duplicateState = [...enableEdit];
        duplicateState[indexDay][nestedIndex] = false;
        setTempEnableEdit(duplicateState);
    }

    return (
        <div className='pt-4'>
            {planDate && sortedUserExpense &&
                <div>
                    {planDate.map((date, dateIndex) => (
                        <details key={dateIndex} className="collapse collapse-arrow bg-base-200">
                            <summary className="collapse-title text-xl font-medium">{date.day} {monthNames[date.month - 1]} {date.year + 543}</summary>
                            <div className="collapse-content">
                                {sortedUserExpense[dateIndex].length > 0
                                    ? <div>
                                        {sortedUserExpense[dateIndex].map((expense, index) => (
                                            <div key={index}>
                                                <div className='flex justify-between pt-2'>
                                                    <div>
                                                        <p className='font-bold'>{expense.detail}</p>
                                                        <span className='text-sm'>หมวดหมู่: {expense.category}</span>
                                                        <span className='pl-2 underline text-sm text-slate-400'
                                                            onClick={() => handleEnableEdit(dateIndex, index, true)}>แก้ไข</span>

                                                    </div>
                                                    <p className='text-[#51b3ce] font-bold'>{expense.price}</p>
                                                </div>

                                                {/* Render Edit mode */}
                                                {tempEnableEdit && tempEnableEdit[dateIndex][index] === true &&
                                                    <div>
                                                        <div className='pt-4 text-sm'>
                                                            <span>หมวดหมู่</span>
                                                            <select className="select select-bordered w-full"
                                                                value={categorySelected || expense.category}
                                                                onChange={(e) => { setCategorySelected(e.target.value) }}>
                                                                {categoryChoices.map((choice, index) => (
                                                                    <option key={index} value={choice}>{choice}</option>
                                                                ))}
                                                            </select>

                                                            <span className='mt-8'>รายละเอียด</span>
                                                            <input type="text"
                                                                placeholder={expense.detail}
                                                                value={tempDetail || ""}
                                                                className="input input-bordered w-full max-w-xs text-sm"
                                                                onChange={(e) => setTempDetail(e.target.value)} />

                                                            <span className='mt-8'>ราคา</span>
                                                            <input type="number"
                                                                placeholder={expense.price}
                                                                value={tempPrice || ""}
                                                                className="input input-bordered w-full max-w-xs text-sm"
                                                                onChange={(e) => setTempPrice(e.target.value)} />

                                                            <span>วัน/เดือน/ปี</span>
                                                            <select className="select select-bordered w-full"
                                                                value={dateSelected || ""}
                                                                onChange={(e) => setDateSelected(e.target.value)}>
                                                                {planDate.map((choice, index) => (
                                                                    <option key={index} value={`${choice.day}/${choice.month}/${choice.year}`}>
                                                                        {choice.day} {monthNames[choice.month - 1]} {choice.year + 543}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                        <div className='w-full flex justify-center gap-4 pt-2'>
                                                            <button className="mt-4 px-4 py-1 rounded-lg text-sm bg-white border border-[#51b3ce]"
                                                                onClick={() => handleEnableEdit(dateIndex, index, false)}>
                                                                <span className="text-[#51b3ce]">ยกเลิก</span>
                                                            </button>
                                                            <button className="mt-4 px-4 py-1 rounded-lg text-sm bg-[#51b3ce]"
                                                                onClick={() => { handleSaveButton(expense.id, dateIndex, index) }}>
                                                                <span className="text-white">บันทึก</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                }

                                            </div>
                                        ))}
                                    </div>
                                    : <div>
                                        <p className='font-bold'>ไม่มีบันทึกของวันนี้</p>
                                    </div>
                                }
                            </div>
                        </details>
                    ))}
                </div>
            }
        </div>
    )
}

export default HistoryCollapse