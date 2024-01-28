import { Link } from "react-router-dom"
const MenuHeroButton = () => {
    return (
        <div className="w-full -mt-10 pt-16 p-10 pb-8 bg-white shadow-md">
            <div className="w-full h-full grid grid-cols-3 text-center gap-x-2 gap-y-3">
                <Link to="/planner">
                    <div>
                        <div className="p-2 border-[0.5px] w-fit mx-auto border-slate-400 rounded-xl">
                            <img src="https://cdn-icons-png.flaticon.com/512/1257/1257385.png" className="w-10 mx-auto flex" />
                        </div>
                        <p className="mt-1">วางแผนเที่ยว</p>
                    </div>
                </Link>
                <Link to="/activity">
                    <div>
                        <div className="p-2 border-[0.5px] w-fit mx-auto border-slate-400 rounded-xl">
                            <img src="https://cdn-icons-png.flaticon.com/512/7705/7705218.png" className="w-10 mx-auto flex" />
                        </div>
                        <p className="mt-1">ค้นหาสถานที่</p>
                    </div>
                </Link>
                <Link to="/points">
                    <div>
                        <div className="p-2 border-[0.5px] w-fit mx-auto border-slate-400 rounded-xl">
                            <img src="https://cdn-icons-png.flaticon.com/512/8754/8754417.png" className="w-10 mx-auto flex" />
                        </div>
                        <p className="mt-1">แลกแต้ม</p>
                    </div>
                </Link>
                <Link to="/history">
                    <div>
                        <div className="p-2 border-[0.5px] w-fit mx-auto border-slate-400 rounded-xl">
                            <img src="https://cdn-icons-png.flaticon.com/512/4450/4450309.png" className="w-10 mx-auto flex" />
                        </div>
                        <p className="mt-1">ประวัติคุณ</p>
                    </div>
                </Link>
                <Link to="/help">
                    <div>
                        <div className="p-2 border-[0.5px] w-fit mx-auto border-slate-400 rounded-xl">
                            <img src="https://cdn-icons-png.flaticon.com/512/10439/10439810.png" className="w-10 mx-auto flex" />
                        </div>
                        <p className="mt-1">ช่วยเหลือ</p>
                    </div>
                </Link>
                <Link to="/document">
                    <div>
                        <div className="p-2 border-[0.5px] w-fit mx-auto border-slate-400 rounded-xl">
                            <img src="https://cdn-icons-png.flaticon.com/512/3073/3073412.png" className="w-10 mx-auto flex" />
                        </div>
                        <p className="mt-1">ขอเอกสาร</p>
                    </div>
                </Link>
            </div>
        </div>
    )
}
export default MenuHeroButton