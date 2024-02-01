
import { useState, useEffect } from "react"
import axios from "axios";

import { ARList, ARListExp, ARListReview } from "./Mission/MissionDoneExample"
import { ExcPointFood, ExcPointDrink } from "./ExchangePoint"
import { MdChevronRight, MdOutlineLocationOn } from "react-icons/md";
import ExcHistory from "./HistoryPoint";
import AR_Mission1 from "./Mission/AR_Mission1";
import Blog_Mission2 from "./Mission/Blog_Mission2";
import Review_Mission3 from "./Mission/Review_Mission3";
import { useUser } from "../../UserContext";


const DetailsPoint = ({ section, province }) => {

  const {userProfile, setUser} = useUser();

  // AR Mission 1 Data from MySQL
  const [ListData3D, setListData3D] = useState();
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_SERVER_HTTP}/fetch_AR_Province`, {
      params: { province: province }
    })
      .then(res => {
        console.log(res.data);
        setListData3D(res.data);
        return
      })
      .catch(err => console.log(err))
  }, [])

  // AR_History Data from MySQL
  const [AR_History, setAR_History] = useState();
  useEffect(() => {
    if(userProfile){
      console.log(userProfile);
      axios.get(`${import.meta.env.VITE_SERVER_HTTP}/fetch_AR_History_userId`, {
        params: { user_id: userProfile.userId }
      })
        .then(res => {
          setAR_History(res.data);
          return
        })
        .catch(err => console.log(err))
    }
  }, [userProfile])

  //--------------------------------
  
  // exchangepoint_history 1 Data from MySQL
  const [historydata,sethistorydata] = useState();
  useEffect(()=>{
    axios.get(`${import.meta.env.VITE_SERVER_HTTP}/fetch_exchangepoint_history`)
    .then(res =>{
      console.log(res.data);
      sethistorydata(res.data);
      return
    })
    .catch(err => console.log(err))
  },[])
  //--------------------------------

  //set To real month
    const [defaultMonth, setDefaultMonth] = useState('');
  
      useEffect(() => {
      // Get the current month in Thai
      const currentMonth = new Date().toLocaleDateString('th-TH', { month: 'short' });
  
      // Set the default month
      setDefaultMonth(currentMonth);
    }, []);
  //----------------------------------

  //Set to real year
  const [defaultYear, setDefaultYear] = useState('');

  useEffect(() => {
    // Get the current year
    const currentYear = new Date().getFullYear();

    // Set the default year
    setDefaultYear(currentYear);
  }, []);
  //----------------------------------

  return (
    <div className="bg-slate-50 rounded-t-3xl border-2 flex-grow mt-4">
      <div className="w-full border-b-2 bg-white border-slate-200 pl-6 pr-2 py-2 rounded-t-3xl flex justify-between">
        {/* Render only in section 0 and 1 */}
        {(section === 0 || section === 1) && 
        <div className="flex w-full">

          <div>
            <p className="text-sm leading-tight text-slate-500">ตำแหน่ง</p>
            <p className="text-xl leading-tight font-semibold">{province}</p>
          </div>
          <div className="my-auto ml-auto mr-2 flex justify-end text-blue-600">
            <button className="flex">แก้ไข</button>
            <MdChevronRight className="my-auto text-2xl" />
          </div>
        </div>
        }
        {/* Render only in section 2 */}
        {(section === 2) && 
        <div className="flex w-full">
          <div >
            <div className="flex" style={{borderBottom: '2px solid #51b3ce', width: '100%' }} >              
              <select className="select w-full max-w-xs rounded-none font-bold" defaultValue={defaultMonth} >
                <option className="text-slate-500" disabled>เดือน</option>
                <option value="ม.ค.">ม.ค.</option>
                <option value="ก.พ.">ก.พ.</option>
                <option value="มี.ค.">มี.ค.</option>
                <option value="เม.ย.">เม.ย.</option>
                <option value="พ.ค.">พ.ค.</option>
                <option value="มิ.ย.">มิ.ย.</option>
                <option value="ก.ค.">ก.ค.</option>
                <option value="ส.ค.">ส.ค.</option>
                <option value="ก.ย.">ก.ย.</option>
                <option value="ต.ค.">ต.ค.</option>
                <option value="พ.ย.">พ.ย.</option>
                <option value="ธ.ค.">ธ.ค.</option>
            </select>
            <select className="select w-full max-w-xs rounded-none font-bold" defaultValue={defaultYear}>
                <option className="text-slate-500" disabled>ปี</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
            </select>
            </div>
          </div>
          <div className="my-auto ml-auto mr-2 flex justify-end text-black-600 font-bold">
            <button className="flex">รายการย้อนหลัง</button>
          </div>

        </div>
        }
      </div>

      {section === 0 && <div className="flex flex-col gap-y-2 mt-4">
        <AR_Mission1 title={"ภารกิจค้นหาความลับผ่านโลก 3 มิติ"} ARListData3D = {ListData3D} AR_History={AR_History}/>
        <Blog_Mission2 title={"กิจกรรมแบ่งปันประสบการณ์ รับคะแนนเพิ่ม"}/>
        <Review_Mission3 title={"รีวิวสถานที่ท่องเที่ยวรับ 3 คะแนน"}/>
      </div>}   
      {section===1 && <div className="flex flex-col gap-y-2 mt-4">
        <ExcPointFood title={"สิทธิพิเศษเเนะนำเเลกคะเเนนกับร้านอาหารพื้นเมือง"} />
        <ExcPointDrink title={"สิทธิพิเศษช่วยเรื่องการเดินทาง"} />
        <Review_Mission3 title={"รีวิวสถานที่ท่องเที่ยว"} />
      </div>}

      {section===2 && <div className="flex flex-col gap-y-2">
        <ExcHistory title={"กิจกรรมค้นหาความลับผ่านโลก 3 มิติ"} excpoint_historydata = {historydata}/>
        {/* <ARListExp title={"แบ่งปันประสบการณ์ รับ Point เพิ่ม"} />
        <Review_Mission3 title={"รีวิวสถานที่ท่องเที่ยว"} /> */}


        </div>}
      </div>
  )
}
export default DetailsPoint