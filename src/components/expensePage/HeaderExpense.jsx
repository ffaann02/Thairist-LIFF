import React from 'react'

function HeaderExpense({ planName, expenseTotal, detail }) {


    return (
        <div className='w-full h-1/4 bg-[#51b3ce] px-6 py-6'>
            <p className='text-2xl font-semibold px-6 text-white'>{planName}</p>
            <div className='w-full bg-white rounded-xl px-6 py-4'>
                <p className=''>{detail}</p>
                <p className='text-3xl'>{expenseTotal} บาท</p>
            </div>
        </div>
    )
}

export default HeaderExpense