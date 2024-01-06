import React, { useState } from "react"
import { AiTwotoneEdit } from "react-icons/ai"
import kongProfile from "/kong.jpeg"
import latif from "/latif.jpeg"
import { useUser } from "../../UserContext";
import OverlapHeroButton from "./OverlapHeroButton";

const Home = () => {
    const { userProfile, setUser } = useUser();
    const [notes,setNotes] = useState([1,2,3,4,5,6,7]);
    const [currentTrips, setCurrentTrips] = useState([
        {
            id: 1,
            name: "สะพานข้ามกาลเวลา",
            time: "8:00 น. | 10 กันยายน",
            imageUrl: "https://ak-d.tripcdn.com/images/1i6302215cij6g8xc3131_W_400_0_R5_Q90.jpg?proc=source/trip",
        },
        {
            id: 2,
            name: "น้ำตกวังสายทอง",
            time: "9:30 น. | 10 กันยายน",
            imageUrl: "https://files.thailandtourismdirectory.go.th/assets/upload/2017/11/02/2017110227f237e6b7f96587b6202ff3607ad88a153922.JPG",
        },
        {
            id: 2,
            name: "น้ำตกวังสายทอง",
            time: "8:30 น.",
            imageUrl: "https://files.thailandtourismdirectory.go.th/assets/upload/2017/11/02/2017110227f237e6b7f96587b6202ff3607ad88a153922.JPG",
        },

    ]);
    return (
        <div className="w-full h-full mt-4">
            <div className="w-full min-h-[20vh] bg-blue-200">
            </div>
            <OverlapHeroButton/>
        </div>
    )
}
export default Home