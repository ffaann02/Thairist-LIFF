import { GiIsland } from "react-icons/gi";
import { IoFastFoodSharp } from "react-icons/io5";
import { MdBakeryDining } from "react-icons/md";

const IconTag = ({attractionTag}) => {
    const tags = attractionTag.split(',');

    const tagIcons = {
        ทะเล: <GiIsland />,
        ร้านอาหาร: <IoFastFoodSharp />,
        ทำขนม: <MdBakeryDining />
    }

    return (
        <div>
            {tags.map((tag, index) => (
                <div key={index}>
                    {tagIcons[tag.trim()]}
                </div>
            ))}
        </div>
    )
}

export default IconTag;