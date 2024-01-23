
const PointData =[
    {
        title: "ได้รับคะเเนน",
        PointNum: "+200",
        time: "12:00",
        content:"รีวิวสถานที่ท่องเที่ยว"
    },
    {
        title: "เเลกรางวัล",
        PointNum: "-160",
        time: "11:00",
        content:"รับส่วนลดอาหาร 100-"
    },
    {
        title: "ได้รับคะเเนน",
        PointNum: "+200",
        time: "10:00",
        content:"สำเร็จภารกิจความลับผ่านโลก 3 มิติ"
    },
];

const ExcHistory = ({ title }) =>{
    
    return(
        <div className="join join-vertical w-full">
            {PointData.map((item, index) => (
            <div className="bg-white collapse collapse-arrow join-item border border-base-300 mb-2">
                <input type="radio" name="my-accordion-4" /> 
                    <div className="absolute w-full flex items-center ">
                        <p className=" top-0 py-2 px-4 text-base font-bold ">{item.title}</p>
                        <p style={{ color: item.PointNum < 0 ? '#FF0000' : '#51b3ce' }}
                        className="absolute right-0 p-3 text-sm font-bold my-auto ">{item.PointNum}</p>
                    </div>
                    <div className="w-full flex collapse-title text-xl mt-4 font-medium items-center ">
                        <p className="text-sm text-slate-400 font-light">{item.time} AM</p>
                    </div>
                    <div className="collapse-content bg-white">
                        <hr/>
                        <div className="flex items-center">
                            <p className="text-base mt-3 font-light text-slate-500">รายการ:</p>
                            <p className="absolute text-base mt-3 font-light right-0 px-3">{item.content}</p>
                        </div>
                    </div>
            </div>
            ))}
        </div>

    )
}
export default ExcHistory