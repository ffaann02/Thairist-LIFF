import { useState } from "react"
import CoverPoint from "./CoverPoint";
import { FilterBar } from "./FilterBar";
import DetailsPoint from "./DetailsPoint";
const Point = () => {
    const [points, setPoints] = useState(100);
    const [section,setSection] = useState(0);
    const [province, setProvince] = useState("กรุงเทพมหานคร");
    return (
        <div className="w-full h-full min-h-screen flex flex-col">
            <CoverPoint points={points}/>
            <FilterBar section={section} setSection={setSection}/>
            <DetailsPoint section={section} province={province} setProvince={setProvince}/>
        </div>
    )
}
export default Point