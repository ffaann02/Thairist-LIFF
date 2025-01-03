import { useState, useEffect } from "react";
import { IoStarSharp } from "react-icons/io5";
import { FaCheckSquare } from "react-icons/fa";
import { MdOutlineReviews } from "react-icons/md";
import axios from "axios";
import { useUser } from "../../../UserContext";

const CarousalListDataReview = [
    {
        title: "เต็นท์ ใน เกาะช้าง ไทย",
        score: "5.0",
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-40166553/original/b0325aa2-8763-44f8-bc48-f6798b0e1c24.jpeg?im_w=1440",
    },
    {
        title: "ฟาร์มสเตย์ ใน ตำบลบ้านปง ไทย",
        score: "5.0",
        url: "https://a0.muscache.com/im/pictures/7108f74d-8fe6-4792-b246-0047ec731085.jpg?im_w=1440",
    },
    {
        title: "บ้านเล็ก ใน สันกําแพง ไทย",
        score: "4.98",
        url: "https://a0.muscache.com/im/pictures/5ca16c57-c2c7-4164-851a-b5f75962c17e.jpg?im_w=1200",
    },
    {
        title: "บ้านทั้งหลัง ใน เชียงใหม่ ไทย",
        score: "4.75",
        url: "https://a0.muscache.com/im/pictures/f4e2b39f-904c-42ec-8267-247ff0afc4ae.jpg?im_w=1440",
    },
    {
        title: "วิลล่าทั้งหลัง ใน สำราญราษฎร์ ไทย",
        score: "4.90",
        url: "https://a0.muscache.com/im/pictures/e1f81771-fb86-4f3e-a0b5-d8893aa228fd.jpg?im_w=1200",
    },
];

const checkAlreadyReview = (userReview, carousalList) => {
    let alreadyReviewIds = [];
    // Iterate over ARHistory
    userReview.forEach(review => {
        // Get the id from the ARHistory item
        const attraction_id = review.attraction_id;

        // Check if the id exists in AR_List
        const match = carousalList.find(item => item.attraction_id === attraction_id);

        // If a match is found, add the ar_id to the matchingIds array
        if (match) {
            alreadyReviewIds.push(attraction_id);
        }
    });
    return alreadyReviewIds;
}

const Review_Mission3 = ({ title }) => {

    const { userProfile, setUser } = useUser();

    const [reviewed, setReviewed] = useState(false);
    const [carousalList, setCarousalList] = useState([]);
    const [userReview, setUserReview] = useState([]);
    const [userAlreadyReview, setUserAlreadyReview] = useState([]);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_SERVER_HTTP}/fetch_attraction_review`)
            .then(res => {
                setCarousalList(res.data);
                const initReviewArray = Array(res.data.length).fill(false);
                setReviewed(initReviewArray);
            })
            .catch(error => console.log(error));
    }, []);

    useEffect(() => {
        if (userProfile) {
            const user_id = userProfile.userId;
            axios.get(`${import.meta.env.VITE_SERVER_HTTP}/fetch_user_review?user_id=${user_id}`)
                .then(res => {
                    setUserReview(res.data);
                }).catch(error => {
                    console.log(error);
                })
        }
    }, [userProfile]);

    useEffect(() => {
        if (userReview.length > 0) {
            const result = checkAlreadyReview(userReview, carousalList);
            setUserAlreadyReview(result);
        }
    }, [userReview])



    return (
        <div className="w-full h-full pb-2">
            <h2 className="ml-4">{title}</h2>
            <div className="carousel carousel-center space-x-3 h-[200px] mt-1">
                {carousalList.map((item, index) => (
                    <div className="ml-4 carousel-item relative border-[1px] rounded-lg drop-shadow-sm">
                        {(userAlreadyReview && userAlreadyReview.includes(item.attraction_id))
                            ? <button disabled={true} className="absolute p-2 bg-white top-1.5 left-1.5 flex rounded-lg border-2 border-green-600">
                                <FaCheckSquare className="text-green-600 text-xl mr-1 my-auto" />
                                <p className="my-auto">รีวิวแล้ว</p>
                            </button>
                            : <button className="absolute p-2 bg-white top-1.5 left-1.5 flex rounded-lg border-2 border-blue-600" >
                                <MdOutlineReviews className="text-blue-600 text-2xl mr-1 my-auto" />
                                <p className="my-auto">เขียนรีวิว</p>
                            </button >}
                        <div className="w-full absolute px-4 pb-2 pt-6 bg-gradient-to-t from-[rgba(0,0,0,0.7)] via-[rgba(0,0,0,0.4)] to-transparent rounded-b-lg flex bottom-0">
                            <p className="text-m text-white flex-1">{item.title}</p>
                            <div className="flex items-center">
                                <IoStarSharp className="my-auto text-xl text-yellow-200 mr-1" />
                                <p className="text-m text-white">{item.score}</p>
                            </div>
                        </div>
                        <img
                            src={item.url}
                            className="w-[300px] rounded-lg"
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}
export default Review_Mission3