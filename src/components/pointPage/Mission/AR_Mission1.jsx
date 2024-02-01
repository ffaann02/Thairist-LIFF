import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useUser } from "../../../UserContext";
import { FaCheckSquare } from "react-icons/fa";

const ARListData3D = [
  {
    title: "ค้นหารูปภาพพระอิศวร",
    point: 10,
    url: "https://static.thairath.co.th/media/Dtbezn3nNUxytg04anEu1ycMhwXHejY3kIQajz6uOvJ4jF.webp",
    ar_url: "https://pngimg.com/d/mario_PNG125.png",
    coordinate: [0, 0], // lat,long
    location: "เสาชิงชา",
    province: "กรุงเทพมหานคร"
  },
  {
    title: "ค้นหารูปภาพพระอิศวร",
    url: "https://static.thairath.co.th/media/Dtbezn3nNUxytg04anEu1ycMhwXHejY3kIQajz6uOvJ4jF.webp",
    ar_url: "https://pngimg.com/d/mario_PNG125.png"
  },
];

const checkARHistory = (AR_History, ARListData3D) => {
  let matchingIds = [];
  // Iterate over ARHistory
  AR_History.forEach(historyItem => {
    // Get the id from the ARHistory item
    const historyId = historyItem.ar_id;

    // Check if the id exists in AR_List
    const match = ARListData3D.find(arItem => arItem.id === historyId);

    // If a match is found, add the ar_id to the matchingIds array
    if (match) {
      matchingIds.push(historyId);
    }
  });
  return matchingIds;
}

const disabledLink = (e, arHistoryMatched, missionID) => {
  if(arHistoryMatched && arHistoryMatched.includes(missionID)){
    e.preventDefault();
  }
}


const AR_Mission1 = ({ title, ARListData3D, AR_History }) => {
  const { userProfile } = useUser();
  const [coordinate, setCoordinate] = useState([0, 0]);
  const [province, setProvince] = useState('กรุงเทพมหานคร');
  const [location, setLocation] = useState('เสาชิงช้า');
  const [arUrl, setArUrl] = useState('https://pngimg.com/d/mario_PNG125.png');


  const [arHistoryMatched, setArHistoryMatched] = useState();

  useEffect(() => {
    if (AR_History && ARListData3D) {
      const matchingIds = checkARHistory(AR_History, ARListData3D);
      setArHistoryMatched(matchingIds);
      console.log(matchingIds);
    }
  }, [AR_History, ARListData3D])

  return (

    <div className="w-full h-full pb-2">
      <h2 className="ml-4">{title}</h2>
      <div className="carousel carousel-center space-x-3 h-[220px] mt-1">
        {ARListData3D && userProfile &&
          ARListData3D.map((mission, index) => (
            <Link to={`https://liff.line.me/2000611383-Pqqw005D/?userId=${userProfile.userId}&id=${mission.id}&lat=${mission.coordinate_lat}
            &long=${mission.coordinate_long}&province=${mission.province}&location=${mission.location}&ar_url=${mission.ar_url}&userId=${userProfile.userId}`}
              className="carousel-item relative border-[1px] rounded-lg drop-shadow-sm ml-4" key={index} onClick={(e) => disabledLink(e, arHistoryMatched, mission.id)}>
              {/* <div className="carousel-item relative border-[1px] rounded-lg drop-shadow-sm ml-4" key={index}> */}
              <div className="absolute top-1 left-2 bg-white py-1 px-2 rounded-lg border-2 font-bold text-sm">
                <p>{mission.point} คะแนน</p>
              </div>

              {arHistoryMatched && arHistoryMatched.includes(mission.id) && (
                <button disabled={true} className="absolute p-2 bg-white top-1.5 left-1.5 flex rounded-lg border-2 border-green-600">
                  <FaCheckSquare className="text-green-600 text-xl mr-1 my-auto" />
                  <p className="my-auto">ค้นหาสำเร็จ</p>
                </button>
              )}

              <div className="w-full absolute z-20 px-4 pt-5 rounded-b-lg flex-col bottom-0 items-center text-white
                bg-gradient-to-t from-[rgba(0,0,0,1)] via-[rgba(0,0,0,0.6)] to-transparent">
                <div className="mb-2">
                  <h2 className="text-lg">{mission.title}</h2>
                  <p className="text-sm">{mission.location}</p>
                </div>
              </div>
              {arHistoryMatched && arHistoryMatched.includes(mission.id) 
              ? <img src={mission.ar_url} className="absolute z-10 w-32 right-4 top-4" />
              : <img src={mission.ar_url} className="absolute z-10 w-32 right-4 top-4" style={{ filter: 'brightness(20%)' }} />}
              <img
                src={mission.url}
                className="w-[300px] rounded-lg"
              />
              {/* </div> */}
            </Link>
          ))
        }
      </div>
    </div>
  )
}
export default AR_Mission1