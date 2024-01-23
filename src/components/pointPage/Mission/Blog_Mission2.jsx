import { MdOutlineMessage } from "react-icons/md";
import { RiCopperCoinFill } from "react-icons/ri";

const ARListDataExp = [
  {
    title: "บอกเล่าประสบการณ์เที่ยวดอยอินทนนท์",
    userName: "Sirikorn Junphen",
    userProfile: "https://www.spica-siam.com/wp-content/uploads/2017/12/user-demo.png",
    url: "https://i.ibb.co/p2wh9cq/image.png",
  },
  {
    title: "เรื่องเล่าผ่านรีวิวบางเเสน",
    userName: "อัมพร ไพรวรรณ",
    userProfile: "https://www.spica-siam.com/wp-content/uploads/2017/12/user-demo.png",
    url: "https://i.ibb.co/K7VBmhM/image.png",
  },
  {
    title: "คำเตือน+ประสบการณ์ไปเยาราช",
    userName: "อัมพร ไพรวรรณ",
    userProfile: "https://www.spica-siam.com/wp-content/uploads/2017/12/user-demo.png",
    url: "https://i.ibb.co/9rqcRCf/image.png",
  },
  {
    title: "พิพิธภัณฑ์ปราสาทสัจธรรม",
    userName: "อัมพร ไพรวรรณ",
    userProfile: "https://www.spica-siam.com/wp-content/uploads/2017/12/user-demo.png",
    url: "https://i.ibb.co/ZxFKJcJ/image.png",
  },
  {
    title: "สุดยอดประสบการณ์ถ้ำมรกต",
    userName: "อัมพร ไพรวรรณ",
    userProfile: "https://www.spica-siam.com/wp-content/uploads/2017/12/user-demo.png",
    url: "https://i.ibb.co/ykWc8Kg/image.png",
  },
];

const Blog_Mission2 = ({ title }) => {
  return (
    <div className="w-full h-full pb-2">
      <h2 className="ml-4">{title}</h2>
      <div className="carousel carousel-center space-x-3 h-[250px] mt-1">
        <div className="carousel-item relative border-[1px] rounded-lg drop-shadow-sm w-[300px] ml-4
        bg-white">
          <div className="m-auto flex flex-col items-center justify-start h-full">
            <img 
              src="https://i.ibb.co/Qfhp72w/Untitled-1.png" 
              className="rounded-tr-lg rounded-tl-lg "
            />
            {/* <MdOutlineMessage className="text-[4.5rem] text-blue-600 mx-auto" /> */}
            <div className="mt-2 text-center">
              <p className="text-md text-slate-600">ไปเที่ยวมาเป็นไงบ้าง ช่วยเล่าหน่อย</p>
              <div className="flex items-center justify-center">
                <RiCopperCoinFill className="my-auto text-xl text-orange-300 drop-shadow-md shadow-black mr-1" />
                <p className="text-xl text-center font-bold text-slate-800">รับ 20 คะแนน</p>
              </div>
            </div>
            <button className="bg-[#3c83b0] border-2 tracking-wide w-fit mx-auto px-3 border-[#3c83b0]
              py-1 text-white mt-2 rounded-xl text-xl">เริ่มเขียน!</button>
          </div>
        </div>
        {ARListDataExp.map((item, index) => (
          <div className="carousel-item relative border-[1px] rounded-lg drop-shadow-sm">
            <div className="w-full absolute px-4 pb-2 pt-2 bg-white rounded-b-lg flex-col bottom-0 items-center">
              <h2 className="text-black text-m pb-2">{item.title}</h2>
              <div className="flex items-center">
                <img
                  src={item.userProfile}
                  className="w-7 h-7 rounded-full my-auto mr-2"
                />
                <p className="text-sm text-[#383838]">{item.userName}</p>
              </div>
            </div>
            <img
              src={item.url}
              className="w-[300px] rounded-lg "
            />
          </div>
        ))}
      </div>
    </div>
  )
}
export default Blog_Mission2