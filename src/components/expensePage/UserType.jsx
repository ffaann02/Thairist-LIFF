import React, { useState, useEffect } from 'react'
import axios from 'axios'
import InputCollapse from './InputCollapse'
import HistoryCollapse from './HistoryCollapse'
import { splitByDay, initArrayState } from './expenseUtils'

const UserType = ({ userID, planID, planDate }) => {

    const [userExpense, setUserExpense] = useState([]);
    const [sortedUserExpense, setSortedUserExpense] = useState();

    const [enableEdit, setEnableEdit] = useState();

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
            setSortedUserExpense(splitDayData);
            const enableEditState = initArrayState(splitDayData);
            setEnableEdit(enableEditState);
        }
    }, [userExpense])

    const InsertUserExpense = (category, detail, price, date) => {
        const addUserExpense = {
            plan_id: planID,
            user_id: userID,
            category: category,
            detail: detail,
            price: price,
            date: date
        }
        axios.post(`${import.meta.env.VITE_SERVER_HTTP}/add_user_expense`, {
            addUserExpense: addUserExpense,
        })
            .then(res => {
                console.log(res);
                fetchUserExpense();
            })
            .catch(err => console.log(err));
    }

    const UpdateUserExpense = (id, category, detail, price, date) => {
        const updateUserExpense = {
            id: id,
            category: category,
            detail: detail,
            price: price,
            date: date
        }
        console.log(updateUserExpense);
        axios.put(`${import.meta.env.VITE_SERVER_HTTP}/update_user_expense`, {
            updateUserExpense: updateUserExpense,
        })
            .then(res => {
                console.log(res);
                fetchUserExpense();
            })
            .catch(err => console.log(err));
    }

    return (
        <div className='w-full pt-4 px-6'>
            <div className='w-full px-2 py-2 bg-white rounded-xl border'>
                <span className='font-bold'>คำแนะนำ:</span>
                <span className='ml-2'>คุณสามารถจดบันทึกค่าใช้จ่ายเพิ่มเติม นอกเหนือจากค่าใช้จ่ายตามแผนการท่องเที่ยวหลักของคุณได้</span>
            </div>

            <HistoryCollapse planDate={planDate}
                userExpense={userExpense}
                sortedUserExpense={sortedUserExpense}
                enableEdit={enableEdit}
                UpdateUserExpense={UpdateUserExpense} />

            <InputCollapse planDate={planDate}
                InsertUserExpense={InsertUserExpense}
                userExpense={userExpense} />

        </div>
    )
}

export default UserType