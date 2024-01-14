import React, { useState } from "react"
import { AiTwotoneEdit } from "react-icons/ai"
import kongProfile from "/kong.jpeg"
import latif from "/latif.jpeg"
import { useUser } from "../../UserContext";
import OverlapHeroButton from "./OverlapHeroButton";
import MenuHeroButton from "./MenuHeroButton";
import CarouselHero from "./CarouselHero";
import HomeCoverImage from "/Head.png"
const Home = () => {
    const { userProfile, setUser } = useUser();
    const [notes, setNotes] = useState([1, 2, 3, 4, 5, 6, 7]);
    return (
        <div className="w-full h-full">
            <div className="w-full min-h-[25vh] bg-cover pt-10">
                <img src={HomeCoverImage}/>
            </div>
            <OverlapHeroButton />
            <MenuHeroButton />
            <CarouselHero/>
        </div>
    )
}
export default Home