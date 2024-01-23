import React, { useState, useEffect } from 'react'

const LargePicture = ({ data }) => {

    const [ sortedData, setSortedData ] = useState(null);

    const sort_byDate_byTime = (allData) => {
        // Convert "start_time" and "date" to a single timestamp for easy comparison
        allData.forEach(attraction => {
            const [hours, minutes] = attraction.start_time.split(':').map(Number);
            const [day, month, year] = attraction.date.split('/').map(Number);
            const timestamp = new Date(year, month - 1, day, hours, minutes).getTime();
            attraction.start_timestamp = timestamp;
        });
        // Sort the array based on "start_timestamp"
        allData.sort((a, b) => a.start_timestamp - b.start_timestamp);
        // Remove the temporary "start_timestamp" property
        allData.forEach(attraction => delete attraction.start_timestamp);
        setSortedData(allData);
    }

    useEffect(() => {
        sort_byDate_byTime(data);
    }, [])

    return (
        <div className='w-full relative'>
            {sortedData && 
            <>
                <img src={data[0].image_url} />
                <div className='w-full absolute bottom-0 py-4 bg-green-500 bg-opacity-60 flex px-4'>
                    <div className='w-1/2'>
                        <p className='text-white text-xl'>{data[0].attraction_name}</p>
                        <p className='text-white text-lg'>อำเภอ{data[0].province}, จังหวัด{data[0].district}</p>
                    </div>
                    <div className='w-1/2 border-l-2 pl-2 text-white'>
                        <p>ประเภท</p>
                        <div>

                        </div>
                    </div>
                </div>
                </>
            }
        </div>
    )
}

export default LargePicture