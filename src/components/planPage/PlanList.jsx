import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { IoIosMore } from "react-icons/io";
import AlertDelete from './AlertDelete';
import IconTag from '../activityPage/IconTag';

const PlanList = ({ index, detail, refetch }) => {

    const [displayAlertDelete, setDisplayAlertDelete] = useState(false);

    const handleCancle = () => {
        setDisplayAlertDelete(false);
    }

    const handleDelete = () => {
        axios.put(`${import.meta.env.VITE_SERVER_HTTP}/delete_plan_detail`, {
            row_id: detail.id
        })
            .then(res => {
                setDisplayAlertDelete(false);
                console.log(res);
                refetch();
            })
            .catch(err => console.log(err));
    }

    return (
        <div key={index} className="grid grid-cols-12 text-center py-2 mt-1">
            <div className="col-span-2 text-left ml-4 flex justify-between">
                <div className='h-full text-black text-sm my-auto'>
                    <p className="top-0 text-xs">{detail.start_time} น.</p>
                    <p className="bottom-0 text-xs">{detail.end_time} น.</p>
                </div>
            </div>
            <div className="col-span-1 text-left flex justify-center">
                <div className="">
                    <div className="mt-1 rounded-full bg-slate-200 p-1 flex justify-center">
                        <IconTag attractionTag={detail.tag} />
                    </div>
                    <div className="pt-1 flex items-center justify-center h-full">
                        <div className="h-full border-l-2 border-dotted border-blue-400"></div>
                    </div>
                </div>
            </div>
            <div className="col-span-3 px-1">
                <img src={detail.image_url}
                    className="rounded-lg shadow-md w-full h-[3.9rem]" />
            </div>
            <div className="col-span-5 text-left pl-2">
                <p className="text-lg text-bold">{detail.attraction_name}</p>
                <p className="text-slate-400 text-xs">{detail.tag}</p>
            </div>
            <div className='col-span-1 mt-2 text-left'>
                <div className="dropdown dropdown-end">
                    <IoIosMore tabIndex={0} role="button" />
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li><a>รายละเอียด</a></li>
                        <li onClick={() => setDisplayAlertDelete(true)}><a>ลบ</a></li>
                    </ul>
                </div>
            </div>

            {displayAlertDelete === true &&
                <AlertDelete
                    detail={detail}
                    handleCancle={handleCancle}
                    handleDelete={handleDelete}
                />
            }
        </div>
    )
}

export default PlanList