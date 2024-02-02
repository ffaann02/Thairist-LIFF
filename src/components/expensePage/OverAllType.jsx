import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { splitByDay, calculateUserExpense } from './expenseUtils'

const OverAllType = ({ planID, planName, planDate, totalMainExpense, MainExpenseEachDay }) => {

    const [userExpense, setUserExpense] = useState([]);
    const [totalUserExpense, setTotalUserExpense] = useState();
    const [userExpenseEachDay, setUserExpenseEachDay] = useState();

    const monthNames = ["ม.ค.", "ก.พ.", "มี.ย.", "เม.ย.", "พ.ค.", "มิ.ย.",
        "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."
    ];

    const fetchUserExpense = () => {
        axios.get(`${import.meta.env.VITE_SERVER_HTTP}/fetch_user_expense?plan_id=${planID}`)
            .then(res => {
                if (res.data.length > 0) {
                    setUserExpense(res.data);
                }
                else {
                    setUserExpense([]);
                }
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        if (planID) {
            fetchUserExpense();
        }
    }, [planID]);

    useEffect(() => {
        if (userExpense.length > 0) {
            const splitDayData = splitByDay(userExpense, planDate);
            const [totalExpense, expenseEachDay] = calculateUserExpense(splitDayData);
            setTotalUserExpense(totalExpense);
            setUserExpenseEachDay(expenseEachDay);
        }
    }, [userExpense])


    return (
        <div className='w-full h-full px-8 pt-2'>
            <div className='bg-[#51b3ce] text-white px-4 py-4 rounded-t-xl'>
                <p className='text-lg mb-1'>สรุปรายจ่ายของ{planName}</p>
                <div className='flex justify-between'>
                    <p>แผนการท่องเที่ยวหลัก</p>
                    <p>{totalMainExpense} บาท</p>
                </div>
                <div className='flex justify-between'>
                    <p>เพิ่มเติม</p>
                    {totalUserExpense && 
                        <p>{totalUserExpense} บาท</p>
                    }
                </div>
            </div>
            {planDate.map((date, index) => (
                    <div key={index} className='pt-4 pb-4 border mb-1'>
                        <p className='bg-[#a3dff0] w-fit ml-2 px-3 py-2 rounded-2xl text-blue-900 font-bold'>
                            {date.day} {monthNames[date.month - 1]} {date.year + 543}
                        </p>
                        <div className='px-4 pt-2'>
                            <div className='border-l-[3px] border-[#51b3ce] px-3'>
                                <div className='flex justify-between'>
                                    <p className=''>แผนการท่องเที่ยวหลัก</p>
                                    <span>{MainExpenseEachDay[index]} บาท</span>
                                </div>
                                <div className='flex justify-between'>
                                    <p className=''>เพิ่มเติม</p>
                                    {userExpenseEachDay && 
                                        <span>{userExpenseEachDay[index]} บาท</span>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    )
}

export default OverAllType