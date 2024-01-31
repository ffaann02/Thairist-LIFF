import { useEffect, useState } from "react"
import CoverPoint from "./CoverPoint";
import { FilterBar } from "./FilterBar";
import DetailsPoint from "./DetailsPoint";
import { useUser } from "../../UserContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import { getFireStoreDatabyUserID } from "../../FirebaseFunction"

const Point = () => {

    const { userProfile, setUser } = useUser();

    const [points, setPoints] = useState(100);
    const [section, setSection] = useState(0);
    const [province, setProvince] = useState("กรุงเทพมหานคร");

    const fetchPoint = async (userID) => {
        try {
            const firebaseUserData = await getFireStoreDatabyUserID(userID);
            setPoints(firebaseUserData.arPoint);
        } catch (error) {
            console.log("Error fetching");
        }
    }

    useEffect(() => {
        if (userProfile) {
            fetchPoint(userProfile.userId);
        }
    }, [userProfile])

    return (
        <div className="w-full h-full min-h-screen flex flex-col">
            <CoverPoint points={points} />
            <FilterBar section={section} setSection={setSection} />
            <DetailsPoint section={section} province={province} setProvince={setProvince} />
        </div>
    )
}
export default Point