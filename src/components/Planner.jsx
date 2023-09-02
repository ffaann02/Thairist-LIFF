import {AiFillCaretLeft,AiFillCaretRight} from "react-icons/ai"
const Planner = () => {
    return (
        <div className="w-full h-full">
            <div className="w-full h-full max-w-sm bg-slate-50 mx-auto min-h-screen">
                <div className="relative">
                    <AiFillCaretLeft className="absolute text-5xl text-white top-[27.5%] text-opacity-50 cursor-pointer"/>
                    <AiFillCaretRight className="absolute text-5xl text-white top-[27.5%] text-opacity-50 right-0 cursor-pointer"/>
                    <div className="absolute bottom-0 text-white tracking-wider pl-3 pr-2 bg-green-400 w-full bg-opacity-50 
                    py-2 grid grid-cols-2">
                        <div>
                            <p className="text-2xl">น้ำตกวังสายทอง</p>
                            <p className="text-sm">อำเภอละงู, จังหวัดสตูล</p>
                        </div>
                        <div className="border-l-[1px]">
                            <p className="ml-1.5 mt-1 text-sm">ประเภท</p>
                            <div className="flex ml-1">
                                <div className="bg-white h-fit w-fit py-1 px-2 rounded-3xl">
                                    <p className="text-black text-sm">ธรรมชาติ</p>
                                </div>
                                <div className="bg-white h-fit w-fit py-1 px-2 rounded-3xl ml-2">
                                    <p className="text-black text-sm">ผจญภัย</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <img src="https://thailandtourismdirectory.go.th/assets/upload/2017/11/02/2017110227f237e6b7f96587b6202ff3607ad88a153922.JPG"
                        className="max-w-sm max-h-sm" />
                </div>
                <div className="drop-shadow-sm">

                </div>
                <div className="text-center mt-4">
                    <p className="mb-2">แผนการเที่ยวของคุณ</p>
                    
                    <div>
                        <div className="grid grid-cols-12 text-center py-2">
                            <div className="col-span-3 text-left ml-4">
                                <p>8.00 น.</p>
                            </div>
                            <div className="col-span-2">
                                <img src="https://ak-d.tripcdn.com/images/1i6302215cij6g8xc3131_W_400_0_R5_Q90.jpg?proc=source/trip"
                                className="rounded-xl drop-shadow-md"/>
                            </div>
                            <div className="col-span-7 text-left ml-2">
                                <p className="text-xl text-bold">สะพานข้ามกาลเวลา</p>
                                <p className="text-slate-400 text-sm">มรดกโลก, อุทยานธรณีสตูล</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-12 text-center py-2 ">
                            <div className="col-span-3 text-left ml-4">
                                <p>9.30 น.</p>
                            </div>
                            <div className="col-span-2">
                                <img src="https://www.paiduaykan.com/travel/wp-content/uploads/2022/03/3-DSC00758.jpg"
                                className="rounded-xl drop-shadow-md w-full h-[3.9rem]"/>
                            </div>
                            <div className="col-span-7 text-left ml-2">
                                <p className="text-xl text-bold">หาดปากบารา</p>
                                <p className="text-slate-400 text-sm">จุดชมวิวพระอาทิตย์ตก</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Planner