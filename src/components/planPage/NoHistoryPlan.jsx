const NoHistoryPlan = () => {
    return (
        <div>
            <div className="pt-3w-full h-full min-h-screen text-center flex">
                <div className="m-auto mt-[40%] justify-center items-center">
                    <img className="w-52 h-52 my-6 mx-auto" src='https://i.ibb.co/rZcBG8y/No-Last-Trip.png' />
                    <p className="text-xl font-semibold">คุณยังไม่เคยได้วางแผนการท่องเที่ยว</p>
                    <p className="text-m text-slate-400 my-2 mx-10 wrap-true">แผนการเที่ยวในอดีตของคุณจะปรากฏเมื่อแผนการท่องเที่ยวที่คุณสร้างไว้จบลง</p>
                </div>
            </div>
        </div>
    )
}

export default NoHistoryPlan