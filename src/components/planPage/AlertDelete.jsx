import React from 'react'

const AlertDelete = ({ detail, handleCancle, handleDelete }) => {

    return (
        <div className="justify-center items-center flex overflow-x-hidden fixed inset-0 z-50 outline-none focus:outline-none bg-black bg-opacity-50">
            <div className="relative rounded-xl min-h-[20%] mx-auto my-auto bg-white overflow-scroll">
                <div className='w-full h-full'>
                    <div className='flex justify-center'>
                        <p className='px-8 pt-6 mx-auto my-auto text-xl font-semibold'>คุณแน่ใจหรือไม่</p>
                    </div>

                    <div className='flex justify-center'>
                        <p className='px-12 pt-2 mx-auto my-auto text-lg'>คุณต้องการลบ {detail.attraction_name} ออกจากแผนการท่องเที่ยวใช่ไหม</p>
                    </div>

                    <div className='py-2'>
                        <div className='flex justify-center gap-2 pb-6 pt-2' >
                            <button className="mt-4 px-4 py-2 rounded-lg bg-white border border-[#51b3ce]" onClick={handleCancle}>
                                <p className="text-[#51b3ce]">ยกเลิก</p>
                            </button>
                            <button className="mt-4 px-4 py-2 rounded-lg bg-[#51b3ce]" onClick={handleDelete}>
                                <p className="text-white">ลบ</p>
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default AlertDelete;