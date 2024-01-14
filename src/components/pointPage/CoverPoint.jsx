import { RiCopperCoinFill } from "react-icons/ri";

const Cover = (props) => {
  return (
    <div>
      <div className="px-6 pt-4 pb-6 bg-[#51b3ce] text-white">
        <div className="flex justify-between">
          <p className="text-xl">คะแนนสะสม</p>
          <p className="underline underline-offset-2 text-sm mt-1">ดูรายละเอียด</p>
        </div>
        <div className="mt-6 px-4 py-2 bg-white rounded-lg bg-opacity-20">
          <div className="flex">
            <div className=" bg-cyan-400 w-fit h-fit p-0.5 my-auto rounded-xl mr-2 bg-opacity-100 border-2">
              <RiCopperCoinFill className="text-3xl my-auto text-orange-300 drop-shadow-md shadow-white"/>
            </div>
            <p className="text-4xl font-semibold">{props.points}</p>
            <p className="mb-0.5 mt-auto ml-1">คะแนน</p>
          </div>
          <p className="text-sm mt-3">ใช้แลกสิทธิประโยชน์มากมาย</p>
        </div>
      </div>
    </div>
  )
}
export default Cover