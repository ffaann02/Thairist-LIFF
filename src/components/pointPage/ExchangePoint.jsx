import { PiHandsPrayingFill } from "react-icons/pi";
import { RiCopperCoinFill } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";



const ExcPointFoodData = [
    {
        title: "ส่วนลดอาหาร 100-",
        shopname: "นพซีฟู้ด",
        totalcoin: "700",
        discountfrom: "",
        url:"https://i.ibb.co/VTGh29P/Seafood.png",
    },
    {
        title: "สิทธิพืเศษซื้อขนมหวาน 1 แถม 1",
        shopname: "KhanomThaiShop",
        totalcoin: "300",
        discountfrom: "800",
        url:"https://i.ibb.co/kSBhWph/image.png",
    },
    {
        title: "ส่วนลดเครื่องดื่ม 20-",
        shopname: "สมุนไพรน้ำหอม",
        totalcoin: "200",
        discountfrom: "600",
        url:"https://i.ibb.co/2FRshhV/image.png",
    },
];

const ExcPointDrinkData = [
    {
        title: "แลกเหรียญ 250 เพื่อส่วนลดค่าโดยสาร",
        shopname: "FactTaxoTour",
        totalcoin: "250",
        discountfrom: "500",
        url:"https://i.ibb.co/jLnwTgn/823.png",
    },
    {
        title: "แลกเหรียญ 500 เพื่อรับส่วนลดที่ร่วมรายการ",
        shopname: "KhongFhakShop",
        totalcoin: "500",
        discountfrom: "1000",
        url:"https://i.ibb.co/VWrmJYh/2.png",
    },
];

export const ExcPointDrink = (props) => {
    return (
        <div className="w-full h-full pl-4 pb-2">
            <h2 className="">{props.title}</h2>
            <div className="carousel carousel-center space-x-3 h-[220px] mt-1">
                {ExcPointDrinkData.map((item, index)=>(
                    <div className="carousel-item relative border-[1px] rounded-lg drop-shadow-sm flex-col">
                    <div className="w-full absolute px-4 pb-2 pt-2 bg-white rounded-b-lg flex-col bottom-0 items-center">
                        <p className="text-m text-black font-bold">{item.shopname}</p>
                        <p className="text-sm text-[#383838]">{item.title}</p>
                        <div className="flex items-center">
                            <RiCopperCoinFill className="my-auto text-m text-orange-300 drop-shadow-md shadow-black mr-1" />
                            <p className="text-m text-black">{item.totalcoin}</p>
                            <p className="text-m text-black ml-2 text-[#aaaaaa]" style={{textDecorationLine: "line-through"}}>{item.discountfrom}</p>
                            <IoIosArrowForward className="absolute bottom-1 transform -translate-y-1/2 right-4 my-auto text-lg text-orange-300 drop-shadow-md shadow-black mr-1" />
                        </div>
                    </div>
                    <img
                        src={item.url}
                        className="w-[300px] rounded-tl-lg rounded-tr-lg"
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}
export const ExcPointFood = (props) => {
    return (
        <div className="w-full h-full pl-4 pb-2">
            <h2 className="">{props.title}</h2>
            <div className="carousel carousel-center space-x-3 h-[230px] mt-1">
                {ExcPointFoodData.map((item, index)=>(
                    <div className="carousel-item relative border-[1px] rounded-lg drop-shadow-sm flex-col">
                    <div className="w-full absolute px-4 pb-2 pt-2 bg-white rounded-b-lg flex-col bottom-0 items-center">
                        <p className="text-m text-black font-bold">ร้าน: {item.shopname}</p>
                        <p className="text-sm text-[#383838]">{item.title}</p>
                        <div className="flex items-center">
                            <RiCopperCoinFill className="my-auto text-m text-orange-300 drop-shadow-md shadow-black mr-1" />
                            <p className="text-m text-black">{item.totalcoin}</p>
                            <p className="text-m text-black ml-2 text-[#aaaaaa]" style={{textDecorationLine: "line-through"}}>{item.discountfrom}</p>
                            <IoIosArrowForward className="absolute bottom-1 transform -translate-y-1/2 right-4 my-auto text-lg text-orange-300 drop-shadow-md shadow-black mr-1" />
                        </div>
                    </div>
                    <img
                        src={item.url}
                        className="w-[300px] rounded-tl-lg rounded-tr-lg"
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}