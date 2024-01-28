import React, { useState, useEffect } from 'react'
import { TimePicker } from 'antd';
import { HiPlus, HiMinus } from "react-icons/hi";

const HeaderModal = ({ selectedAttraction, handleTimeChange, defaultStartTime, disabledTime, endTimeSelects, setTicketAmount }) => {

    const [tempAdultAmount, setTempAdultAmount] = useState(1);
    const [tempKidAmount, setTempKidAmount] = useState(0);

    const handleTempTicketAmount = (operation, setState) => {
        if (operation === 'plus') {
            setState(prevState => prevState += 1);
        }
        else if (operation === 'minus') {
            setState(prevState => prevState -= 1);
        }
    }

    useEffect(() => {
        setTicketAmount([tempAdultAmount, tempKidAmount]);
    }, [tempAdultAmount, tempKidAmount])

    return (
        <div>
            <div className='flex justify-items-center pt-6'>
                <img src={selectedAttraction.image_url}
                    className="mx-auto w-36 h-full shadow-md" />
            </div>
            <div className="grid grid-cols-12 py-2 pt-4">
                {defaultStartTime &&
                    <div className="col-span-4 text-left pl-6">
                        <p className='text-sm'>เริ่ม</p>
                        <TimePicker
                            onChange={handleTimeChange}
                            // defaultValue={dayjs(defaultStartTime, 'HH:mm')}
                            placeholder={defaultStartTime}
                            minuteStep={15}
                            format={'HH:mm'}
                            size="small"
                            disabledTime={disabledTime} />
                        <p className='text-sm pt-2'>สิ้นสุด</p>
                        <TimePicker
                            disabled={true}
                            placeholder={endTimeSelects}
                            format={'HH:mm'}
                            size="small" />
                    </div>
                }
                <div className="col-span-8 text-left pt-4 pl-6">
                    <p className="text-xl text-bold">{selectedAttraction.name}</p>
                    <p className="text-sm">ระยะเวลา: {selectedAttraction.period} ชั่วโมง</p>
                    <p className="text-sm">แท็ก: {selectedAttraction.tag}</p>
                    {(selectedAttraction.adult_price && selectedAttraction.kid_price) &&
                        <div>
                            <div className='flex gap-2'>
                                <p>ราคา:</p>
                                <p>ผู้ใหญ่ {selectedAttraction.adult_price}</p>
                                <p>เด็ก {selectedAttraction.adult_price}</p>
                            </div>
                            <div className='pt-2'>
                                <div className='grid grid-cols-6 align-middle mt-2'>
                                    <p className='col-span-1 my-auto text-sm text-black'>ผู้ใหญ่</p>
                                    <button className='ml-4' disabled={tempAdultAmount <= 0} onClick={() => handleTempTicketAmount('minus', setTempAdultAmount)}>
                                        <HiMinus className='my-auto text-xl border-[2px] border-slate-600 round-xl' />
                                    </button>
                                    <span className='px-4'>{tempAdultAmount}</span>
                                    <button className='' onClick={() => handleTempTicketAmount('plus', setTempAdultAmount)}>
                                        <HiPlus className='my-auto text-xl border-[2px] border-slate-600 round-xl' />
                                    </button>
                                    <p className='my-auto text-sm text-black'>คน</p>
                                </div>
                                <div className='grid grid-cols-6 align-middle mt-2'>
                                    <p className='col-span-1 my-auto text-sm text-black'>เด็ก</p>
                                    <button className='ml-4' disabled={tempKidAmount <= 0} onClick={() => handleTempTicketAmount('minus', setTempKidAmount)}>
                                        <HiMinus className='my-auto text-xl border-[2px] border-slate-600 round-xl' />
                                    </button>
                                    <span className='px-4'>{tempKidAmount}</span>
                                    <button className='' onClick={() => handleTempTicketAmount('plus', setTempKidAmount)}>
                                        <HiPlus className='my-auto text-xl border-[2px] border-slate-600 round-xl' />
                                    </button>
                                    <p className='my-auto text-sm text-black'>คน</p>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
            <div className='w-full pt-4'>
                <div className='border-t-2'></div>
            </div>
        </div>
    )
}

export default HeaderModal