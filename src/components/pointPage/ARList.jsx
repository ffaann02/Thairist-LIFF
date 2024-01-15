import { PiHandsPrayingFill } from "react-icons/pi";

const ARList = (props) => {
    return (
        <div className="w-full h-full pl-4 pb-2">
            <h2 className="">{props.title}</h2>
            <div className="carousel carousel-center space-x-3 h-[200px] mt-1">
                <div className="carousel-item relative border-[1px] rounded-lg drop-shadow-sm">
                    <div className="w-full absolute px-4 pb-2 pt-6 bg-gradient-to-t from-[#51b3ce] via-[#51b3ce] to-transparent rounded-b-lg flex bottom-0">
                        <PiHandsPrayingFill className="my-auto text-xl text-yellow-200 mr-1" />
                        <p className="text-xl text-white">10 สถานที่ทำบุญกลางปี</p>
                    </div>
                    <img
                        src="https://www.govivigo.com/content/upload/images/Thailand%20Travel_North/Thailand_Travel_North_Doi-Inthanon-National-Park_Chiang-Mai_1.jpg"
                        className="w-[300px] rounded-lg"
                    />
                </div>
                <div className="carousel-item">
                    <img src="https://image.makewebeasy.net/makeweb/m_1920x0/FJ8KH0VZs/GL/ppo1_1.jpg" className="rounded-box" />
                </div>
                <div className="carousel-item">
                    <img src="https://daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.jpg" className="rounded-box" />
                </div>
                <div className="carousel-item">
                    <img src="https://daisyui.com/images/stock/photo-1494253109108-2e30c049369b.jpg" className="rounded-box" />
                </div>
                <div className="carousel-item">
                    <img src="https://daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.jpg" className="rounded-box" />
                </div>
                <div className="carousel-item">
                    <img src="https://daisyui.com/images/stock/photo-1559181567-c3190ca9959b.jpg" className="rounded-box" />
                </div>
                <div className="carousel-item">
                    <img src="https://daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.jpg" className="rounded-box" />
                </div>
            </div>
        </div>
    )
}
export default ARList