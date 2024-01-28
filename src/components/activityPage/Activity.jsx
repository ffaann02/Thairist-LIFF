import Flicking from "@egjs/react-flicking"
import { AutoPlay } from "@egjs/flicking-plugins"
import { useState, useEffect } from "react"
import "@egjs/react-flicking/dist/flicking.css";
import "@egjs/react-flicking/dist/flicking-inline.css";
import axios from "axios";
import LargeCard from "./LargeCard";
import ModalPlan from "./ModalPlan";
import ModalReadmore from "./ModalReadmore";
import SearchBox from "./SearchBox";
import { useUser } from "../../UserContext";

const Workshop = () => {

    const [attractions, setAttractions] = useState();
    const [selectedCard, setSelectedCard] = useState();
    const { userProfile } = useUser();
    useEffect(() => {
        setAttractions(attractions)
        axios.get(`${import.meta.env.VITE_SERVER_HTTP}/fetch_tourist_attraction`)
            .then(res => {
                console.log(res.data);
                setAttractions(res.data);
            })
            .catch(err => console.log(err));
    }, [])

    const [panels, setPanels] = useState
        ([
            {
                id: 0,
                img: "https://www.wonderfulpackage.com/uploads/moxie/Article/thai/7colors-coral-lipe/7colors-coral-lipe1.jpg",
                name: "ปะการังเจ็ดสี หลีเป๊ะ"
            },
            {
                id: 1,
                img: "https://4.bp.blogspot.com/-LYLYZROdMvM/XAi-8uDg3BI/AAAAAAAAFAs/vvHJD1eWgUExik_R6uMQh8ortn5vsKSewCLcBGAs/s1600/26868637_1868291719908317_5576795105760641024_n.jpg",
                name: "ขนมผูกรัก"
            },
            {
                id: 2,
                img: "https://s.isanook.com/tr/0/ui/282/1411979/40532700_1867583929989555_5005885615867166720_n_1535906985.jpg",
                name: "ปราสาทหินพันยอด"
            },
            {
                id: 3,
                img: "https://files.thailandtourismdirectory.go.th/assets/upload/2017/11/06/2017110691b3b612250732c72f42036881ef400b114059.jpg",
                name: "คฤหาสน์กูเด็น"
            }
        ]);

    const [isDisplayModalPlan, setIsDisplayModalPlan] = useState(false)
    const [isDisplayReadmore, setIsDisplayReadmore] = useState(false);
    const handleModalPlanState = (newState, index) => {
        setIsDisplayModalPlan(newState);
        setSelectedCard(index);
    }

    const handleModalReadmoreState = (newState, index) => {
        console.log("hello:" + index);
        setIsDisplayReadmore(newState);
        setSelectedCard(index);
    }

    return (
        <>
            {userProfile && <div className="w-full h-full pt-6 bg-slate-50 ">
                <div className="w-full h-full max-w-4xl mx-auto min-h-screen">
                    {isDisplayModalPlan &&
                        <ModalPlan
                            displayModalPlan={handleModalPlanState}
                            selectedAttraction={attractions[selectedCard]}
                        />
                    }
                    {isDisplayReadmore &&
                        <ModalReadmore
                            displayModalReadmore={handleModalReadmoreState}
                            selectedAttraction={attractions[selectedCard]}
                        />
                    }
                    <SearchBox userProfile={userProfile} attractions={attractions} setAttractions={setAttractions} />
                    <>
                        <p className="px-4 mt-4">ผลลัพธ์การค้นหา</p>
                        {attractions &&
                            <div className="gap-x-2 gap-4 px-3">
                                {attractions.map((place, index) => (
                                    <LargeCard
                                        key={index}
                                        id={index}
                                        data={place}
                                        displayModalPlan={handleModalPlanState}
                                        displayModalReadmore={handleModalReadmoreState}
                                    />
                                ))}
                            </div>
                        }

                        <div className="ml-8 mt-8 mb-2 text-lg font-semibold">
                            <p>กิจกรรมยอดนิยม</p>
                        </div>

                        <div className="w-full h-full mt-2">
                            <Flicking renderOnlyVisible={true}>
                                {panels.map((trip) =>
                                (
                                    <div className="-ml-24 h-40 w-[90%] rounded-xl pr-28 relative" key={trip.id}>
                                        <img src={trip.img}
                                            className="rounded-xl h-full w-full" />
                                        <div className="w-full absolute bottom-0 pr-28">
                                            <div className="w-full bg-blue-400 bg-opacity-50 py-1 px-2 rounded-b-xl">
                                                <p className="text-white text-lg tracking-widest">{trip.name}</p>
                                                <p className="text-white text-sm tracking-widest">{trip.time}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </Flicking>
                        </div>
                    </>
                </div>
            </div>}
        </>
    )
}

export default Workshop;

