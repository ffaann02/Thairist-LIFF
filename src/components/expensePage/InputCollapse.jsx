import React, {useEffect, useState} from 'react'
import { AiFillPlusCircle } from "react-icons/ai"

const InputCollapse = ({ planDate, InsertUserExpense, userExpense }) => {

    const monthNames = ["ม.ค.", "ก.พ.", "มี.ย.", "เม.ย.", "พ.ค.", "มิ.ย.",
        "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."
    ];

    const categoryChoices = ["ค่าเดินทาง", "ค่าอาหาร", "ค่าที่พัก", "ค่าบัตรเข้าชมสถานที่ท่องเที่ยว"];

    const [categorySelected, setCategorySelected] = useState(categoryChoices[0]);
    const [tempDetail, setTempDetail] = useState("");
    const [tempPrice, setTempPrice] = useState("");
    const [dateSelected, setDateSelected] = useState(`${planDate[0].day}/${planDate[0].month}/${planDate[0].year}`);

    useEffect(() => {
        setCategorySelected(categoryChoices[0]);
        setTempDetail("");
        setTempPrice("");
        setDateSelected(`${planDate[0].day}/${planDate[0].month}/${planDate[0].year}`);
    }, [userExpense])

    const handleSaveButton = () => {
        InsertUserExpense(categorySelected, tempDetail, tempPrice, dateSelected);
    }

    function closeCollapse() {
        const details = document.querySelector('.collapse');
        details.open = false;
    }

    return (
        <div className='pt-4'>
            <details className="w-full px-2 collapse bg-white">
                <summary className="collapse-title text-lg">
                    <div className='flex justify-between'>
                        <span className='my-auto'>บันทึกค่าใช้จ่ายเพิ่มเติม</span>
                        <AiFillPlusCircle className='my-auto text-blue-400' />
                    </div>
                </summary>
                <div className="collapse-content">
                    <div className=''>
                        <span>หมวดหมู่</span>
                        <select className="select select-bordered w-full"
                                value={categorySelected || ''}
                                onChange={(e) => {setCategorySelected(e.target.value)}}>
                            {categoryChoices.map((choice, index) => (
                                <option key={index} value={choice}>{choice}</option>
                            ))}
                        </select>
                        <span className='mt-8'>รายละเอียด</span>
                        <input type="text"
                            placeholder="สิ่งที่คุณต้องการบันทึก เช่น เติมน้ำมัน"
                            value={tempDetail}
                            className="input input-bordered w-full max-w-xs text-sm" 
                            onChange={(e) => setTempDetail(e.target.value)}/>
                        <span className='mt-8'>ราคา</span>
                        <input type="number"
                            placeholder="ราคาของสินค้า"
                            value={tempPrice || ''}
                            className="input input-bordered w-full max-w-xs text-sm" 
                            onChange={(e) => setTempPrice(e.target.value)}/>
                        <span>วัน/เดือน/ปี</span>
                        <select className="select select-bordered w-full" 
                            value={dateSelected || ''} 
                            onChange={(e) => setDateSelected(e.target.value)}>
                            {planDate.map((choice, index) => (
                                <option key={index} value={`${choice.day}/${choice.month}/${choice.year}`}>
                                    {choice.day} {monthNames[choice.month - 1]} {choice.year + 543}</option>
                            ))}
                        </select>
                    </div>
                    <div className='w-full flex justify-center gap-4 pt-2'>
                        <button className="mt-4 px-4 py-1 rounded-lg text-sm bg-white border border-[#51b3ce]" onClick={() => closeCollapse()}>
                            <span className="text-[#51b3ce]">ยกเลิก</span>
                        </button>
                        <button className="mt-4 px-4 py-1 rounded-lg text-sm bg-[#51b3ce]" onClick={() => handleSaveButton()}>
                            <span className="text-white" >บันทึก</span>
                        </button>
                    </div>
                </div>
            </details>
        </div>
    )
}

export default InputCollapse