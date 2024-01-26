import React from 'react'

const PlanTimeline = ({ selectedAttraction, newOrderPlanDetail, dates, currentSelectDay, startTimeSelects, endTimeSelects, defaultStartTime }) => {
    return (
        <div>
            <div className='w-full flex justify-center pt-2'>
                <p className='text-lg'>แผนการเที่ยวของคุณ</p>
            </div>
            {newOrderPlanDetail &&
                newOrderPlanDetail.map((detail, index) => (
                    (detail.formated_date.day === dates[currentSelectDay].day &&
                        detail.formated_date.month === dates[currentSelectDay].month &&
                        detail.formated_date.year === dates[currentSelectDay].year &&
                        !detail.isSelectedAttraction)
                        ? (<div key={index} className="grid grid-cols-12 text-center py-2 mt-1">
                            <div className="col-span-4 text-left ml-4 flex justify-between">
                                <div className='h-full text-black my-auto'>
                                    <p className="top-0">{detail.start_time} น.</p>
                                    <p className="bottom-0">{detail.end_time} น.</p>
                                </div>
                                <div className="ml-3 relative mr-3">
                                    <div className="mt-1 rounded-full bg-slate-200 p-2 mx-auto">
                                    </div>
                                    <div className="h-[80%] mt-1 border-l-2 justify-self-center absolute mx-auto w-full border-dotted
                                                 border-blue-400"></div>
                                </div>
                            </div>
                            <div className="col-span-2">
                                <img src={detail.image_url}
                                    className="rounded-xl shadow-md w-full h-[3.9rem]" />
                            </div>
                            <div className="col-span-6 text-left ml-3">
                                <p className="text-xl text-bold">{detail.attraction_name}</p>
                                <p className="text-slate-400 text-sm">{detail.tag}</p>
                            </div>
                        </div>)
                        : (detail.formated_date.day === dates[currentSelectDay].day &&
                            detail.formated_date.month === dates[currentSelectDay].month &&
                            detail.formated_date.year === dates[currentSelectDay].year &&
                            detail.isSelectedAttraction === true)
                            ? <div key={index} className="grid grid-cols-12 text-center py-2 bg-blue-600">
                                <div className="col-span-4 text-left ml-4 flex justify-between">
                                    {(startTimeSelects && endTimeSelects) ?
                                        <div className='h-full text-white my-auto'>

                                            <p className="top-0">{startTimeSelects}</p>
                                            <p className="bottom-0">{endTimeSelects}</p>
                                        </div>
                                        :
                                        <div className='h-full text-white my-auto'>

                                            <p className="top-0">{defaultStartTime}</p>
                                            <p className="bottom-0">{endTimeSelects}</p>
                                        </div>}

                                    <div className="ml-3 relative mr-3">
                                        <div className="mt-1 rounded-full bg-slate-200 p-2 mx-auto">
                                        </div>
                                        <div className="h-[80%] mt-1 border-l-2 justify-self-center absolute mx-auto w-full border-dotted
                                                                    border-blue-400"></div>
                                    </div>
                                </div>
                                <div className="col-span-2">
                                    <img src={selectedAttraction.image_url}
                                        className="rounded-xl shadow-md w-full h-[3.9rem]" />
                                </div>
                                <div className="col-span-6 text-left ml-2">
                                    <p className="text-xl text-bold text-white">{selectedAttraction.name}</p>
                                    <p className="text-sm text-white">{selectedAttraction.tag}</p>
                                </div>
                            </div>
                            : null
                ))
            }
        </div>
    )
}

export default PlanTimeline