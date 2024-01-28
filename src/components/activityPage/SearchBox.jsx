import { useEffect, useState } from "react"
import Logo from "/logo2.png"
import { MdClose } from "react-icons/md";
import provinces from "../../data/thai_provinces.json"
import axios from "axios";
const travelTags = [
    'ภูเขา',
    'ทะเล',
    'เมืองโบราณ',
    'น้ำตก',
    'เกาะ',
    'ป่าไม้',
    'วัด',
    'สวนสาธารณะ',
    'ตลาด',
    'อุทยาน'
];

const SearchBox = ({ userProfile, attractions, setAttractions }) => {
    const [choice, setChoice] = useState(1);
    const [selectedProvince, setSelectedProvince] = useState(null);
    const [selectedChoices, setSelectedChoices] = useState([]);

    const handleChoiceToggle = (choice) => {
        if (selectedChoices.includes(choice)) {
            setSelectedChoices(selectedChoices.filter((c) => c !== choice));
        } else {
            setSelectedChoices([...selectedChoices, choice]);
        }
    };

    const isChoiceSelected = (choice) => selectedChoices.includes(choice);

    const handleProvinceChange = (event) => {
        console.log(event)
        setSelectedProvince(event.target.value);
    };

    const handleRemoveChoice = (index) => {
        const newChoices = [...selectedChoices];
        newChoices.splice(index, 1);
        setSelectedChoices(newChoices);
    };

    const handleSearch = () => {
        setAttractions(attractions)
        axios.get(`${import.meta.env.VITE_SERVER_HTTP}/fetch_tourist_attraction_province`,
            {
                params: {
                    province: selectedProvince
                }
            })
            .then(res => {
                console.log(res.data);
                setAttractions(res.data);
            })
            .catch(err => console.log(err));
    }

    const [toggleFilter, setToggleFilter] = useState(false);
    const [placeType, setPlaceType] = useState(1);
    return (
        <div className='px-5 mx-auto mt-4 pt-6 pb-2 bg-[#51b3ce] rounded-b-2xl'>
            <div className="mb-1 text-white">
                <p className="font-bold">สวัสดี {userProfile.displayName}</p>
                <p className="text-xl font-bold tracking-wide">เที่ยวที่ไหนดีนะ ?</p>
            </div>
            <div className="relative flex items-center w-full h-12 rounded-lg shadow-md bg-white overflow-hidden border-[1px] border-[#10000]">
                <div className="grid place-items-center h-full w-12 text-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                <input
                    className="peer h-full w-full outline-none text-md text-gray-600 pr-2"
                    type="text"
                    id="search"
                    placeholder="สถานที่ท่องเที่ยวไทย" />
                <button className="bg-blue-400 px-2 py-1 absolute right-2 rounded-md text-white"
                    onClick={handleSearch}>ค้นหา</button>
            </div>
            <div className="drawer mt-4 flex flex-col">
                <input id="filter_drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content w-fit">
                    {/* Page content here */}
                    <label htmlFor="filter_drawer" className="drawer-button rounded-lg bg-slate-100 border-2 text-[0.9rem] px-3 py-2 text-slate-500"
                        onClick={() => { setToggleFilter(true) }}>เครื่องมือค้นหา</label>
                </div>

                <div className="mt-2 flex carousel w-full gap-x-1">
                    {selectedProvince &&
                        <div className="relative carousel-item px-2 py-1 mt-2 text-sm bg-blue-200 rounded-2xl text-blue-600 border-2 border-blue-500">
                            <p>จ. {selectedProvince}</p>
                            <div className="absolute -right-1 -top-1.5 bg-white rounded-full p-0.5"
                                onClick={() => { }}>
                                <MdClose className="text-red-600 text-xs"
                                    onClick={() => { setSelectedProvince("") }} />
                            </div>
                        </div>}
                    {selectedChoices.map((tag, index) => (
                        <div className="relative carousel-item px-2 py-1 mt-2 text-sm bg-blue-200 rounded-2xl text-blue-600 border-2 border-blue-500">
                            <p>{tag}</p>
                            <div className="absolute -right-1 -top-1.5 bg-white rounded-full p-0.5">
                                <MdClose className="text-red-600 text-xs"
                                    onClick={() => { handleRemoveChoice(index) }} />
                            </div>
                        </div>
                    ))}
                </div>
                <div className="drawer-side z-[500]">
                    <label htmlFor="filter_drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                    <div className="menu min-h-full bg-white text-base-content p-0 w-[90%]">
                        <div className="p-4 pl-3 drop-shadow-md bg-white flex justify-between">
                            <div className="flex">
                                <button>
                                    <label htmlFor="filter_drawer" className="drawer-button">
                                        <MdClose className="text-2xl my-auto mr-6 text-slate-600" />
                                    </label>
                                    <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                                </button>
                                <p className="text-xl font-semibold">
                                    คัดกรองการค้นหา
                                </p>
                            </div>
                            <button>
                                <label htmlFor="filter_drawer" className="drawer-button">
                                    <p className="text-lg text-blue-600">
                                        ตกลง
                                    </p>
                                </label>
                                <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                            </button>
                        </div>
                        <div className="px-3">
                            <div className="mt-4 border-b-[1px] pb-4">
                                <p className="text-[1rem] text-slate-500 mb-1">ประเภทสถานที่</p>
                                <div className="flex gap-x-1">
                                    <button className={`rounded-2xl pl-3 pr-2 py-2 flex font-semibold ${placeType === 1 ?
                                        "bg-blue-50 text-blue-500 border-blue-500 border-2" : "bg-slate-100 text-slate-400 border-slate-400 border-2"}`}
                                        onClick={() => { setPlaceType(1) }}>
                                        <div className="my-auto flex">
                                            <p className="mr-1">ทั้งหมด</p>
                                        </div>
                                    </button>
                                    <button className={`rounded-2xl pl-3 pr-2 py-2 flex font-semibold ${placeType === 2 ?
                                        "bg-blue-50 text-blue-500 border-blue-500 border-2" : "bg-slate-100 text-slate-400 border-slate-400 border-2"}`}
                                        onClick={() => { setPlaceType(2) }}>
                                        <div className="my-auto flex">
                                            <p className="mr-1">ท่องเที่ยว</p>
                                        </div>
                                    </button>
                                    <button className={`rounded-2xl pl-3 pr-2 py-2 flex font-semibold ${placeType === 3 ?
                                        "bg-blue-50 text-blue-500 border-blue-500 border-2" : "bg-slate-100 text-slate-400 border-slate-400 border-2"}`}
                                        onClick={() => { setPlaceType(3) }}>
                                        <div className="my-auto flex">
                                            <p className="mr-1">กิจกรรม</p>
                                        </div>
                                    </button>
                                    <button className={`rounded-2xl pl-3 pr-2 py-2 flex font-semibold ${placeType === 4 ?
                                        "bg-blue-50 text-blue-500 border-blue-500 border-2" : "bg-slate-100 text-slate-400 border-slate-400 border-2"}`}
                                        onClick={() => { setPlaceType(4) }}>
                                        <div className="my-auto flex">
                                            <p className="mr-1">ร้านอาหาร</p>
                                        </div>
                                    </button>
                                </div>
                            </div>
                            <div className="mt-4 border-b-[1px] pb-4">
                                <p className="text-[1rem] text-slate-500 mb-1">ค้นหาสถานที่จาก</p>
                                <div className="flex gap-x-2">
                                    <button className={`rounded-2xl pl-3 pr-2 py-2 flex font-semibold ${choice === 1 ?
                                        "bg-blue-50 text-blue-500 border-blue-500 border-2" : "bg-slate-100 text-slate-400 border-slate-400 border-2"}`}
                                        onClick={() => { setChoice(1) }}>
                                        <div className="my-auto flex">
                                            <p className="mr-1">สถานที่จาก</p>
                                            <img src={Logo} className="w-10 my-auto" /></div>
                                    </button>
                                    <button className={`rounded-2xl pl-3 pr-2 py-2 flex font-semibold ${choice === 2 ?
                                        "bg-blue-50 text-blue-500 border-blue-500 border-2" : "bg-slate-100 text-slate-400 border-slate-400 border-2"}`}
                                        onClick={() => { setChoice(2) }}>
                                        <div className="my-auto flex">
                                            <p className="mr-1">สถานที่จาก</p>
                                            <div className="flex">
                                                <img src="https://brandlogos.net/wp-content/uploads/2020/03/google_maps-logo_brandlogos.net_u3ev8-512x726.png"
                                                    className="w-3 my-auto" />
                                                <p className="text-xs my-auto ml-1">Google Maps</p>
                                            </div>
                                        </div>
                                    </button>
                                </div>
                            </div>
                            <div className="mt-4 border-b-[1px] pb-4 text-slate-500">
                                <p className="text-[1rem] mb-1">ท่องเที่ยวภายใน</p>
                                <div className="mt-1">
                                    <p>จังหวัด</p>
                                    <div className="flex gap-x-2 text-slate-600">
                                        <select
                                            id="provinceSelect"
                                            value={selectedProvince}
                                            onChange={handleProvinceChange}
                                            className="border-2 p-2 rounded-lg border-slate-300"
                                        >
                                            <option value="">
                                                ทั้งหมด
                                            </option>
                                            {provinces.map((province) => (
                                                <option key={province.id} value={province.name_th}>
                                                    {province.name_th}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 border-b-[1px] pb-4 text-slate-500">
                                <p className="text-[1rem] mb-1">สิ่งที่คุณสนใจ</p>
                                <div className="mt-2 gap-2 flex flex-wrap">
                                    {travelTags.map((tag) => (
                                        <button
                                            key={tag}
                                            className={`p-2 rounded-2xl ${isChoiceSelected(tag)
                                                ? 'bg-blue-100 text-blue-600 border-2 border-blue-400'
                                                : 'bg-slate-200 text-slate-500 border-2'
                                                }`}
                                            onClick={() => handleChoiceToggle(tag)}>
                                            {tag}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SearchBox