import React from 'react'

const PlanList = ({ index, detail }) => {

    return (
        <div key={index} className="grid grid-cols-12 text-center py-2 mt-1">
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
        </div>
    )
}

export default PlanList