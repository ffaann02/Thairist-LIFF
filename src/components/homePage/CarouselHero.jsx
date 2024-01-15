import { PiHandsPrayingFill } from "react-icons/pi";

const Carouselitem = [
    {
        title: "10 สถานที่ทำบุญกลางปี",
        url: "https://www.govivigo.com/content/upload/images/Thailand%20Travel_North/Thailand_Travel_North_Doi-Inthanon-National-Park_Chiang-Mai_1.jpg",
    },
    {
        title: "10 เกาะน่าเที่ยวเมืองไทย",
        url: "https://sv1.picz.in.th/images/2024/01/09/d74HoBJ.jpeg",
    },
    {
        title: "10 สุดยอดสถานที่ท่องเที่ยวทางธรรมชาติไทย",
        url: "https://image.makewebeasy.net/makeweb/m_1920x0/FJ8KH0VZs/GL/ppo1_1.jpg",
    },
    {
        title: "10 สถานที่ท่องเที่ยวไทย ติดอันดับโลก",
        url: "https://sv1.picz.in.th/images/2024/01/09/d74uGXg.jpeg",
    },
    {
        title: "10 อันดับแหล่งท่องเที่ยวยอดนิยมในเมืองไทยแห่งปี",
        url: "https://sv1.picz.in.th/images/2024/01/09/d74HOTy.jpeg",
    },
    {
        title: "10 สถานที่ทำบุญกลางปี",
        url: "https://daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.jpg",
    },
];

const CarouselHero = () => {
    return (
        <div className="w-full h-full bg-white mt-4 pl-4 pt-3 py-6 shadow-md border-[1px]">
            <h2 className="">เที่ยวที่ไหนดี ?</h2>
            <div className="carousel carousel-center space-x-4 h-[200px] mt-1">
                {Carouselitem.map((item, index)=>(
                    <div className="carousel-item relative border-[1px] rounded-box drop-shadow-sm">
                    <div className="w-full absolute px-4 pb-2 pt-6 bg-gradient-to-t from-[#51b3ce] via-[#51b3ce] to-transparent rounded-b-box flex bottom-0">
                        <PiHandsPrayingFill className="my-auto text-xl text-yellow-200 mr-1" />
                        <p className="text-xl text-white">{item.title}</p>
                    </div>
                    <img
                        src={item.url}
                        className="w-[300px] rounded-box"
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}
export default CarouselHero