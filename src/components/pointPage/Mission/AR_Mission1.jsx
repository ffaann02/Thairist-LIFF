const ARListData3D = [
  {
    title: "ค้นหารูปภาพพระอิศวร",
    point: 10,
    url: "https://static.thairath.co.th/media/Dtbezn3nNUxytg04anEu1ycMhwXHejY3kIQajz6uOvJ4jF.webp",
    ar_url: "https://pngimg.com/d/mario_PNG125.png",
    coordinate:[0,0], // lat,long
    location:"เสาชิงชา",
    province:"กรุงเทพมหานคร"
  },
  {
    title: "ค้นหารูปภาพพระอิศวร",
    url: "https://static.thairath.co.th/media/Dtbezn3nNUxytg04anEu1ycMhwXHejY3kIQajz6uOvJ4jF.webp",
    ar_url: "https://pngimg.com/d/mario_PNG125.png"
  },
];
const AR_Mission1 = ({ title , ARListData3D }) => {
  
  return (
    <div className="w-full h-full pb-2">
      <h2 className="ml-4">{title}</h2>
      <div className="carousel carousel-center space-x-3 h-[220px] mt-1">
        {ARListData3D && 
        ARListData3D.map((mission, index) => (
            <div className="carousel-item relative border-[1px] rounded-lg drop-shadow-sm ml-4"key={index}>
              <div className="absolute top-1 left-2 bg-white py-1 px-2 rounded-lg border-2 font-bold text-sm">
                <p>{mission.point} คะแนน</p>
              </div>
                <div className="w-full absolute z-20 px-4 pt-5 rounded-b-lg flex-col bottom-0 items-center text-white
                bg-gradient-to-t from-[rgba(0,0,0,1)] via-[rgba(0,0,0,0.6)] to-transparent">
                  <div className="mb-2">
                    <h2 className="text-lg">{mission.title}</h2>
                    <p className="text-sm">{mission.location}</p>
                  </div>
                </div>
              <img src={mission.ar_url} className="absolute z-10 w-32 right-4 top-4" style={{ filter: 'brightness(20%)' }} />
              <img
              src={mission.url}
              className="w-[300px] rounded-lg"
              />
            </div>
            ))
          }
      </div>
    </div>
  )
}
export default AR_Mission1