import React, { useState } from 'react'
import { HiPlus, HiMinus } from "react-icons/hi";

const DayList = ({ day, month, year, indexDay, sortedData, expenseEachList, expenseEachDay, adultAmount, kidAmount, isUseTicket, handleAmountChange, enableEdit, enableEditChange, handleCustomPriceChange }) => {

    const [tempAdultAmount, setTempAdultAmount] = useState(adultAmount);
    const [tempKidAmount, setTempkidAmount] = useState(kidAmount);
    const [tempCustomPrice, setTempCustomPrice] = useState("");

    const handleSaveAmount = (nestedIndex) => {
        const dataID = sortedData[nestedIndex].id;
        const prevAdultState = [...tempAdultAmount];
        const prevKidState = [...tempKidAmount];
        handleAmountChange(indexDay, nestedIndex, prevAdultState[nestedIndex], prevKidState[nestedIndex], dataID);
    }

    const handleSaveCustomPrice = (nestedIndex) => {
        const dataID = sortedData[nestedIndex].id;
        handleCustomPriceChange(indexDay, nestedIndex, tempCustomPrice[nestedIndex], dataID);
    }

    const handleTempAdult = (nestedIndex, operation) => {
        const prevState = [...tempAdultAmount];
        if (operation === 'plus') {
            prevState[nestedIndex] += 1;
        }
        else if (operation === 'minus') {
            prevState[nestedIndex] -= 1;
        }
        setTempAdultAmount(prevState);
    }

    const handleTempKid = (nestedIndex, operation) => {
        const prevState = [...tempKidAmount];
        if (operation === 'plus') {
            prevState[nestedIndex] += 1;
        }
        else if (operation === 'minus') {
            prevState[nestedIndex] -= 1;
        }
        setTempkidAmount(prevState);
    }

    const handleTempCustomPrice = (e, nestedIndex) => {
        const prevState = [...tempCustomPrice];
        prevState[nestedIndex] = e.target.value;
        setTempCustomPrice(prevState);
    }

    return (
        <details className="collapse collapse-arrow bg-base-200">
            <summary className="collapse-title text-xl font-medium">{day} {month} {year}</summary>
            <div className="collapse-content">
                {sortedData.map((data, index) => (
                    <div key={index} className='bg-white p-3 rounded-lg m-2'>
                        <div className='w-full flex justify-between text-lg font-medium'>
                            <p className='left-0'>{data.attraction_name}</p>
                            <p className=' mr-4 text-[#51b3ce]'>{expenseEachList[index]}</p>
                        </div>
                        <details className='pt-1 w-full collapse collapse-arrow flex justify-between'>
                            <summary className="collapse-title min-h-0 p-0 text-md my-auto">{data.start_time} น.</summary>
                            <div className="collapse-content px-0 w-full text-left">
                                <div className='w-full mt-4 boder border-t-2'>
                                    <p className='mt-4 text-sm text-black'>รายละเอียดเพิ่มเติม</p>
                                    <p className='mt-2 text-sm text-slate-600'>หมวดหมู่: xxx</p>
                                    {isUseTicket[index] === true &&
                                        <div className='flex mt-2'>
                                            <p className='text-sm text-slate-600'>ค่าเข้าชม:</p>
                                            <p className='ml-2 text-sm text-slate-600'>ผู้ใหญ่ {data.adult_price} บาท</p>
                                            <p className='ml-2 text-sm text-slate-600'>เด็ก {data.kid_price} บาท</p>
                                        </div>
                                    }

                                    {isUseTicket[index] === true &&
                                        <div className=''>
                                            <p className='mt-4 text-sm text-black'>จำนวนบัตรเข้าชมของคุณ</p>
                                            <div className='flex mt-2'>
                                                <p className='text-sm text-slate-600'>ผู้ใหญ่: {adultAmount[index]} คน</p>
                                                <p className='ml-4 text-sm text-slate-600'>เด็ก: {kidAmount[index]} คน</p>
                                                {enableEdit[index] === false &&
                                                    <p className='ml-4 text-sm text-slate-600 underline' onClick={() => enableEditChange(indexDay, index, true)}>แก้ไข</p>
                                                }
                                            </div>

                                            {enableEdit[index] === true &&
                                                <div className='pt-2'>
                                                    <div className='grid grid-cols-6 align-middle mt-2'>
                                                        <p className='col-span-1 my-auto text-sm text-black'>ผู้ใหญ่</p>
                                                        <button className='ml-4' disabled={tempAdultAmount[index] <= 0} onClick={() => handleTempAdult(index, 'minus')}>
                                                            <HiMinus className='my-auto text-xl border-[2px] border-slate-600 round-xl' />
                                                        </button>
                                                        <span className='px-4'>{tempAdultAmount[index]}</span>
                                                        <button className='' onClick={() => handleTempAdult(index, 'plus')}>
                                                            <HiPlus className='my-auto text-xl border-[2px] border-slate-600 round-xl' />
                                                        </button>
                                                        <p className='my-auto text-sm text-black'>คน</p>
                                                    </div>
                                                    <div className='grid grid-cols-6 align-middle mt-2'>
                                                        <p className='col-span-1 my-auto text-sm text-black'>เด็ก</p>
                                                        <button className='ml-4' disabled={tempKidAmount[index] <= 0} onClick={() => handleTempKid(index, 'minus')}>
                                                            <HiMinus className='my-auto text-xl border-[2px] border-slate-600 round-xl' />
                                                        </button>
                                                        <span className='px-4'>{tempKidAmount[index]}</span>
                                                        <button className='' onClick={() => handleTempKid(index, 'plus')}>
                                                            <HiPlus className='my-auto text-xl border-[2px] border-slate-600 round-xl' />
                                                        </button>
                                                        <p className='my-auto text-sm text-black'>คน</p>
                                                    </div>
                                                    <div className='w-full flex justify-center gap-4 pt-2'>
                                                        <button className="mt-4 px-4 py-2 rounded-lg  bg-white border border-[#51b3ce]"
                                                            onClick={() => enableEditChange(indexDay, index, false)}>
                                                            <p className="text-[#51b3ce]">ยกเลิก</p>
                                                        </button>
                                                        <button className="mt-4 px-4 py-2 rounded-lg bg-[#51b3ce]"
                                                            onClick={() => handleSaveAmount(index)}>
                                                            <p className="text-white">บันทึก</p>
                                                        </button>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    }

                                    {isUseTicket[index] === false &&
                                        <div className=''>
                                            <div className='inline-flex mt-4'>
                                                <p className='text-sm text-black'>ราคา {expenseEachList[index]} บาท</p>
                                                {enableEdit[index] === false &&
                                                    <p className='ml-4 text-sm text-slate-600 underline' onClick={() => enableEditChange(indexDay, index, true)}>แก้ไข</p>
                                                }
                                            </div>
                                            {enableEdit[index] === true &&
                                                <div>
                                                    <div className='w-full pt-1'>
                                                        <input type="number"
                                                            placeholder={expenseEachList[index]}
                                                            value={tempCustomPrice[index] || ''}
                                                            className="input input-bordered h-auto rounded-md"
                                                            onChange={(e) => handleTempCustomPrice(e, index)} />

                                                    </div>
                                                    <div className='w-full flex justify-center gap-4 pt-2'>
                                                        <button className="mt-4 px-4 py-2 rounded-lg  bg-white border border-[#51b3ce]"
                                                            onClick={() => enableEditChange(indexDay, index, false)}>
                                                            <p className="text-[#51b3ce]">ยกเลิก</p>
                                                        </button>
                                                        <button className="mt-4 px-4 py-2 rounded-lg bg-[#51b3ce]"
                                                            onClick={() => handleSaveCustomPrice(index)}>
                                                            <p className="text-white">บันทึก</p>
                                                        </button>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    }

                                </div>
                            </div>
                        </details>
                    </div>
                ))}
                <div className='w-full'>
                    <p className='text-right text-xl px-2'>รวมทั้งวัน {expenseEachDay} บาท</p>
                </div>
            </div>
        </details>
    )
}

export default DayList;