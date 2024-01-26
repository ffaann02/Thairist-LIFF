import React from 'react'
import { TimePicker } from 'antd';

const HeaderModal = ({ selectedAttraction, handleTimeChange, defaultStartTime, disabledTime, endTimeSelects }) => {
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
                    <p className="text-sm">ระยะเวลาที่ใช้: {selectedAttraction.period} ชั่วโมง</p>
                    <p className="text-sm">แท็ก: {selectedAttraction.tag}</p>
                </div>
            </div>
            <div className='w-full pt-4'>
                <div className='border-t-2'></div>
            </div>
        </div>
    )
}

export default HeaderModal