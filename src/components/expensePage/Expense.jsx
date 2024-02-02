import React, { useState, useEffect } from 'react'
import { useUser } from "../../UserContext";
import axios from 'axios';
import { sortByTime, calculateExpense } from './expenseUtils';
import TypeBar from './TypeBar';
import PlanType from './PlanType';
import UserType from './UserType';
import TitleBack from '../TitleBack';
import HeaderExpense from './HeaderExpense';
import OverAllType from './OverAllType';

const Expense = () => {

    const { userProfile, setUser } = useUser();

    const [section, setSection] = useState(0);

    const [planID, setPlanID] = useState();
    const [planName, setPlanName] = useState();
    const [planDate, setPlanDate] = useState([]);
    const [planDetail, setPlanDetail] = useState();

    const [sortedPlanList, setSortedPlanList] = useState();
    const [expenseEachDay, setExpenseEachDay] = useState();
    const [expenseTotal, setExpenseTotal] = useState();
    const [expenseEachList, setExpenseEachList] = useState();
    const [adultAmount, setAdultAmount] = useState();
    const [kidAmount, setKidAmount] = useState();
    const [isUseTicket, setIsUseTicked] = useState();
    const [enableEdit, setEnableEdit] = useState();

    const [userTotalExpense, setUserTotalExpense] = useState(0);

    const monthNames = ["ม.ค.", "ก.พ.", "มี.ย.", "เม.ย.", "พ.ค.", "มิ.ย.",
        "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."
    ];

    useEffect(() => {
        if (userProfile) {
            axios.get(`${import.meta.env.VITE_SERVER_HTTP}/check_plan_exist?owner_id=${userProfile.userId}`)
                .then(res => {
                    if (res.data.empty) {
                        setPlanID();
                        setPlanDate([]);
                    }
                    else {
                        setPlanID(res.data.plan_id);
                        setPlanName(res.data.plan_name);
                        setPlanDate(res.data.result);
                    }
                })
                .catch(err => console.log(err));
        }
    }, [userProfile])

    useEffect(() => {
        if (planID) {
            axios.get(`${import.meta.env.VITE_SERVER_HTTP}/fetch_plan_detail?plan_id=${planID}`)
                .then(res => {
                    setPlanDetail(res.data.result);
                })
                .catch(err => { console.log(err) });
        }
    }, [planID])

    useEffect(() => {
        if (planDetail && planDate) {
            sortByTime(planDetail, planDate, setSortedPlanList);
        }
    }, [planDetail, planDate]);

    useEffect(() => {
        if (sortedPlanList) {
            calculateExpense(sortedPlanList, setExpenseEachList, setExpenseEachDay, setExpenseTotal, setAdultAmount, setKidAmount, setIsUseTicked, setEnableEdit);
        }
    }, [sortedPlanList])

    const reFetch = () => {
        axios.get(`${import.meta.env.VITE_SERVER_HTTP}/fetch_plan_detail?plan_id=${planID}`)
            .then(res => {
                setPlanDetail(res.data.result);
            })
            .catch(err => { console.log(err) });
    }

    const handleEdit = (indexDay, nestedIndex, value) => {
        const duplicateState = [...enableEdit];
        duplicateState[indexDay][nestedIndex] = value;
        setEnableEdit(duplicateState);
    }

    const handleAmountChange = (indexDay, nestedIndex, adultValue, kidValue, dataID) => {
        const dupStateAdult = [...adultAmount];
        dupStateAdult[indexDay][nestedIndex] = adultValue;
        const dupStateKid = [...kidAmount];
        dupStateKid[indexDay][nestedIndex] = kidValue;
        const updateAmount = {
            id: dataID,
            adult_amount: adultValue,
            kid_amount: kidValue,
        }
        axios.put(`${import.meta.env.VITE_SERVER_HTTP}/update_plan_ticket_amount`, {
            updateAmount: updateAmount,
        })
            .then(res => {
                setAdultAmount(dupStateAdult);
                setKidAmount(dupStateKid);
                reFetch();
            })
            .catch(err => console.log(err));
    }

    const handleCustomPriceChange = (indexDay, nestedIndex, customPrice, dataID) => {
        const dupStateCustomPrice = [...expenseEachList];
        dupStateCustomPrice[indexDay][nestedIndex] = customPrice;
        const updateCustomPrice = {
            id: dataID,
            custom_price: customPrice,
        }
        axios.put(`${import.meta.env.VITE_SERVER_HTTP}/update_custom_price`, {
            updateCustomPrice: updateCustomPrice,
        })
            .then(res => {
                setExpenseEachList(customPrice);
                reFetch();
            })
            .catch(err => console.log(err));
    }

    return (
        <div className='w-full pt-10'>

            <div className='text-sm'>
                <TitleBack title={"ค่าใช้จ่าย"} backUrl={'/plan'} />
            </div>

            {planName && planDate && sortedPlanList && expenseEachDay &&
                <div>

                    <TypeBar section={section}
                        setSection={setSection} />

                    {section === 0 &&
                        <div className='pt-4'>
                            <HeaderExpense
                                planName={planName}
                                expenseTotal={expenseTotal}
                                detail="ค่าใช้จ่ายตามแผนการท่องเที่ยวหลัก"
                            />
                            <div className='px-6 pt-4'>
                                <div className='w-full px-4 py-2 bg-white rounded-xl border'>
                                    <span className='font-bold'>คำแนะนำ:</span>
                                    <span className='ml-2'>คุณสามารถแก้ไขรายจ่ายได้ (แผนการท่องเที่ยวประเภทที่ไม่ใช้ตั๋วเข้าชม) ตัวอย่างเช่น รายจ่ายร้านอาหารต่าง ๆ</span>
                                </div>
                            </div>
                            <div className='px-6 pt-2 rounded-t-lg'>
                                {sortedPlanList.map((list, index) => (
                                    <PlanType key={index}
                                        day={planDate[index].day}
                                        month={monthNames[planDate[index].month - 1]}
                                        year={planDate[index].year + 543}
                                        indexDay={index}
                                        sortedData={list}
                                        expenseEachList={expenseEachList[index]}
                                        expenseEachDay={expenseEachDay[index]}
                                        expenseEachPlan={expenseEachDay}
                                        isUseTicket={isUseTicket[index]}
                                        adultAmount={adultAmount[index]}
                                        kidAmount={kidAmount[index]}
                                        handleAmountChange={handleAmountChange}
                                        enableEdit={enableEdit[index]}
                                        enableEditChange={handleEdit}
                                        handleCustomPriceChange={handleCustomPriceChange} />
                                ))}
                            </div>
                        </div>
                    }

                    {section === 1 &&
                        <div className='pt-4'>
                            <HeaderExpense
                                planName={planName}
                                expenseTotal={userTotalExpense}
                                detail="ค่าใช้จ่ายเพิ่มเติม"
                            />
                            <UserType
                                userID={userProfile.userId}
                                planID={planID}
                                planDate={planDate}
                                setUserTotalExpense={setUserTotalExpense} />
                        </div>
                    }

                    {section === 2 &&
                        <div className='pt-4'>
                            <OverAllType
                                planID={planID}
                                planName={planName}
                                planDate={planDate}
                                totalMainExpense={expenseTotal}
                                MainExpenseEachDay={expenseEachDay} />

                        </div>
                    }

                </div>
            }
        </div>
    )
}

export default Expense