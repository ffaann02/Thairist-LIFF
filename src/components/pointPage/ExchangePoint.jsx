import { PiHandsPrayingFill } from "react-icons/pi";


const ExcPointFoodData = [
    {
        title: "",
        url:"",
    }
];

export const ExcPointFood = (props) => {
    return (
        <div className="w-full h-full pl-4 pb-2">
            <h2 className="">{props.title}</h2>
            <div className="carousel carousel-center space-x-3 h-[200px] mt-1">
                {ExcPointFoodData.map((item, index)=>(

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