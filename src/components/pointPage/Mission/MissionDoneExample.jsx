import { PiHandsPrayingFill } from "react-icons/pi";
import { IoStarSharp } from "react-icons/io5";

const ARListData3D = [
    {
        title: "10 สถานที่ทำบุญกลางปี",
        url: "https://www.govivigo.com/content/upload/images/Thailand%20Travel_North/Thailand_Travel_North_Doi-Inthanon-National-Park_Chiang-Mai_1.jpg",
    },
];
const ARListDataExp = [
    {
        title: "บอกเล่าประสบการณ์เที่ยวดอยอินทนนท์",
        userName: "Sirikorn Junphen",
        userProfile: "https://www.spica-siam.com/wp-content/uploads/2017/12/user-demo.png",
        url: "https://i.ibb.co/p2wh9cq/image.png",
    },
    {
        title: "เรื่องเล่าผ่านรีวิวบางเเสน",
        userName: "อัมพร ไพรวรรณ",
        userProfile: "https://www.spica-siam.com/wp-content/uploads/2017/12/user-demo.png",
        url: "https://i.ibb.co/K7VBmhM/image.png",
    },
    {
        title: "คำเตือน+ประสบการณ์ไปเยาราช",
        userName: "อัมพร ไพรวรรณ",
        userProfile: "https://www.spica-siam.com/wp-content/uploads/2017/12/user-demo.png",
        url: "https://i.ibb.co/9rqcRCf/image.png",
    },
    {
        title: "พิพิธภัณฑ์ปราสาทสัจธรรม",
        userName: "อัมพร ไพรวรรณ",
        userProfile: "https://www.spica-siam.com/wp-content/uploads/2017/12/user-demo.png",
        url: "https://i.ibb.co/ZxFKJcJ/image.png",
    },
    {
        title: "สุดยอดประสบการณ์ถ้ำมรกต",
        userName: "อัมพร ไพรวรรณ",
        userProfile: "https://www.spica-siam.com/wp-content/uploads/2017/12/user-demo.png",
        url: "https://i.ibb.co/ykWc8Kg/image.png",
    },
];

const ARListDataReview = [
    {
        title: "เต็นท์ ใน เกาะช้าง ไทย",
        score: "5.0",
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-40166553/original/b0325aa2-8763-44f8-bc48-f6798b0e1c24.jpeg?im_w=1440",
    },
    {
        title: "ฟาร์มสเตย์ ใน ตำบลบ้านปง ไทย",
        score: "5.0",
        url: "https://a0.muscache.com/im/pictures/7108f74d-8fe6-4792-b246-0047ec731085.jpg?im_w=1440",
    },
    {
        title: "บ้านเล็ก ใน สันกําแพง ไทย",
        score: "4.98",
        url: "https://a0.muscache.com/im/pictures/5ca16c57-c2c7-4164-851a-b5f75962c17e.jpg?im_w=1200",
    },
    {
        title: "บ้านทั้งหลัง ใน เชียงใหม่ ไทย",
        score: "4.75",
        url: "https://a0.muscache.com/im/pictures/f4e2b39f-904c-42ec-8267-247ff0afc4ae.jpg?im_w=1440",
    },
    {
        title: "วิลล่าทั้งหลัง ใน สำราญราษฎร์ ไทย",
        score: "4.90",
        url: "https://a0.muscache.com/im/pictures/e1f81771-fb86-4f3e-a0b5-d8893aa228fd.jpg?im_w=1200",
    },
];

export const ARList = ({title}) => {
    return (
        <div className="w-full h-full pl-4 pb-2">
            <h2 className="">{title}</h2>
            <div className="carousel carousel-center space-x-3 h-[200px] mt-1">
                {ARListData3D.map((item, index)=>(

                    <div className="carousel-item relative border-[1px] rounded-lg drop-shadow-sm">
                    <div className="w-full absolute px-4 pb-2 pt-6 bg-gradient-to-t from-[#51b3ce] via-[#51b3ce] to-transparent rounded-b-lg flex bottom-0">
                        <PiHandsPrayingFill className="my-auto text-xl text-yellow-200 mr-1" />
                        <p className="text-xl text-white">{item.title}</p>
                    </div>
                    <img
                        src={item.url}
                        className="w-[300px] rounded-lg"
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export const ARListExp = (props) => {
    return (
        <div className="w-full h-full pl-4 pb-2">
            <h2 className="">{props.title}</h2>
            <div className="carousel carousel-center space-x-3 h-[250px] mt-1">
                {ARListDataExp.map((item, index)=>(

                    <div className="carousel-item relative border-[1px] rounded-lg drop-shadow-sm">
                    <div className="w-full absolute px-4 pb-2 pt-2 bg-white rounded-b-lg flex-col bottom-0 items-center">
                        <h2 className="text-black text-m pb-2">{item.title}</h2>
                        <div className="flex items-center">
                            <img
                            src = {item.userProfile}
                            className="w-7 h-7 rounded-full my-auto mr-2"
                            />
                            <p className="text-sm text-[#383838]">{item.userName}</p>
                        </div>
                    </div>
                    <img
                        src={item.url}
                        className="w-[300px] rounded-lg "
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export const ARListReview = (props) => {
    return (
        <div className="w-full h-full pl-4 pb-2">
            <h2 className="">{props.title}</h2>
            <div className="carousel carousel-center space-x-3 h-[200px] mt-1">
                {ARListDataReview.map((item, index)=>(

                    <div className="carousel-item relative border-[1px] rounded-lg drop-shadow-sm">
                        <div className="w-full absolute px-4 pb-2 pt-6 bg-gradient-to-t from-[rgba(0,0,0,0.7)] via-[rgba(0,0,0,0.4)] to-transparent rounded-b-lg flex bottom-0">
                            <p className="text-m text-white flex-1">{item.title}</p>
                            <div className="flex items-center">
                                <IoStarSharp className="my-auto text-xl text-yellow-200 mr-1" />
                                <p className="text-m text-white">{item.score}</p>
                            </div>
                        </div>
                    <img
                        src={item.url}
                        className="w-[300px] rounded-lg"
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

// export default ARList