import React, { useState, useEffect } from 'react'
import { sort_byDate_byTime } from './bannerUtils';
import { IoIosArrowBack, IoIosArrowForward  } from "react-icons/io";
import { useNavigate } from "react-router-dom"

const BannerPlan = ({ data }) => {

    const navigate = useNavigate();

    const [sortedData, setSortedData] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        setSortedData(data);
    }, [data]);

    const handleClickLeft = (index) => {
        setCurrentIndex(index - 1);
    }

    const handleClickRight = (index) => {
        setCurrentIndex(index + 1);
    }

    return (
        <div className='w-full relative'>
            {sortedData && sortedData[currentIndex] &&
                <>
                    <img src={sortedData[currentIndex].image_url} />
                    <div className='absolute top-0 w-full h-1/2 align-middle z-50'>
                        {currentIndex > 0 &&
                            <IoIosArrowBack className='absolute my-auto bottom-0 left-4 text-4xl p-2 bg-slate-200 rounded-full' onClick={() => handleClickLeft(currentIndex)}/>
                        }
                        {currentIndex < (sortedData.length - 1) &&
                            <IoIosArrowForward className='absolute my-auto bottom-0 right-4 text-4xl p-2 bg-slate-200 rounded-full' onClick={() => handleClickRight(currentIndex)}/>
                        }                  
                    </div>
                    <div className='absolute top-2 w-full h-full'>
                        <p className='absolute left-2 text-xl font-semibold rounded-xl bg-white px-2 text-black z-50' onClick={() => {navigate('/expense')}}>ประมาณรายจ่าย</p>
                    </div>
                    <div className='absolute top-2 w-full h-full'>
                        <p className='absolute right-2 text-xl font-semibold text-white'>{sortedData[currentIndex].start_time} น.</p>
                    </div>
                    <div className='w-full absolute bottom-0 py-4 bg-green-500 bg-opacity-60 flex px-4'>
                        <div className='w-1/2'>
                            <p className='text-white text-xl'>{sortedData[currentIndex].attraction_name}</p>
                            <p className='text-white text-lg'>อำเภอ{sortedData[currentIndex].province}, จังหวัด{sortedData[currentIndex].district}</p>
                        </div>
                        <div className='w-1/2 border-l-2 pl-2 text-white'>
                            <p>ประเภท</p>
                            <div className='pt-2 flex gap-2 w-full'>
                                {sortedData[currentIndex].tag.split(",").map((tag, index) => (
                                    <p key={index} className='bg-white rounded-2xl px-2 text-center text-black'>{tag}</p>
                                ))}
                            </div>
                        </div>
                        
                    </div>
                </>
            }
        </div>
    )
}

export default BannerPlan;