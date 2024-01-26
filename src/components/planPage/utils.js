const generatedPlanID = () => {
    // Generate random characters
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const randomChars = Array.from({ length: 3 }, () => characters[Math.floor(Math.random() * characters.length)]);
    // Generate random numbers
    const randomNumber = Math.floor(1000 + Math.random() * 9000);
    // Combine characters and numbers to create the unique ID
    const uniqueId = `${randomChars.join('')}${randomNumber}`;
    return uniqueId;
}

const addHoursToTime = (baseTime, hoursToAdd) => {
    // Parse the base time string into hours and minutes
    const [baseHours, baseMinutes] = baseTime.split(':').map(Number);
    // Calculate the total minutes for the base time
    const totalBaseMinutes = baseHours * 60 + baseMinutes;
    // Calculate the total minutes for the new time after adding hours
    const totalNewMinutes = totalBaseMinutes + hoursToAdd * 60;
    // Calculate the hours and minutes for the new time
    const newHours = Math.floor(totalNewMinutes / 60);
    const newMinutes = totalNewMinutes % 60;
    // Format the result as HH.MM
    const formattedResult = `${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}`;
    return formattedResult;
}

const addToState = (newDataArray, stateEditPlan, setStateEditPlan) => {
    newDataArray.forEach(newData => {
        // Check if the newData's id already exists in the state
        const existingItem = stateEditPlan.find(item => item.id === newData.id);
        if (!existingItem) {
            // If not a duplicate, add the newData to the state
            setStateEditPlan(prevState => [...prevState, newData]);
        }
        else {
            // If duplicate, check for changes in start_time and end_time
            if (existingItem.start_time !== newData.start_time ||
                existingItem.end_time !== newData.end_time) {
                // If the times are different, update the state with the new data
                setStateEditPlan(prevState =>
                    prevState.map(item =>
                        item.id === newData.id ? { ...item, ...newData } : item
                    )
                );
            }
        }
    });
};

const changeTimeLineByDrag = (sourceIndex, destinationIndex, newOrderState, stateEditPlan, setStateEditPlan) => {
    console.log(newOrderState);
    // Calculate endtime
    const source_startTime = newOrderState[sourceIndex].start_time;
    const source_period = newOrderState[sourceIndex].period;
    const destination_startTime = newOrderState[destinationIndex].start_time;
    const destination_period = newOrderState[destinationIndex].period;
    const source_endTime = addHoursToTime(source_startTime, destination_period);
    const destination_endTime = addHoursToTime(destination_startTime, source_period);
    // Swap startTime and change endTime
    newOrderState[sourceIndex].start_time = destination_startTime;
    newOrderState[sourceIndex].end_time = destination_endTime;
    newOrderState[destinationIndex].start_time = source_startTime
    newOrderState[destinationIndex].end_time = source_endTime;
    // Convert "start_time" to minutes since midnight for easy comparison
    newOrderState.forEach(attraction => {
        const [hours, minutes] = attraction.start_time.split(':').map(Number);
        attraction.start_minutes = hours * 60 + minutes;
    });
    // Sort the array based on "start_minutes"
    newOrderState.sort((a, b) => a.start_minutes - b.start_minutes);
    // Remove the temporary "start_minutes" property
    newOrderState.forEach(attraction => delete attraction.start_minutes);
    addToState(newOrderState, stateEditPlan, setStateEditPlan);
    return newOrderState;
}

const checkName = (oldName, newName) => {
    // Case 1: Use the pervious name
    if (oldName === newName && newName !== "") {
        console.log("case 1");
        return oldName;
    }
    // Case 2: Auto-fill name
    else if (oldName === newName && newName === "") {
        console.log("case 2");
        return
    }
    // Case 3: User leave it empty, use previous name
    else if (oldName !== newName && newName === "") {
        console.log("case 3");
        return oldName;
    }
    // Case 4: Re-name
    else {
        console.log("case 4");
        return newName;
    }
}

const sortByStartTime = (attractions, setStateNewOrder, callFirstTime, allDay, currentDay) => {
    const newArray = [...attractions];
    console.log(newArray);
    const dataDay = newArray.filter(detail => {
        if (callFirstTime === true) {
            return (
                detail.formated_date.day === allDay[0].day &&
                detail.formated_date.month === allDay[0].month &&
                detail.formated_date.year === allDay[0].year
            );
        }
        else {
            return (
                detail.formated_date.day === currentDay.day &&
                detail.formated_date.month === currentDay.month &&
                detail.formated_date.year === currentDay.year
            );
        }
    });
    if (dataDay) {
        // Convert "start_time" to minutes since midnight for easy comparison
        dataDay.forEach(attraction => {
            const [hours, minutes] = attraction.start_time.split(':').map(Number);
            attraction.start_minutes = hours * 60 + minutes;
        });
        // Sort the array based on "start_minutes"
        dataDay.sort((a, b) => a.start_minutes - b.start_minutes);
        // Remove the temporary "start_minutes" property
        dataDay.forEach(attraction => delete attraction.start_minutes);
        console.log(dataDay);
        setStateNewOrder(dataDay);
    }
}

export { 
            generatedPlanID,
            checkName,
            addHoursToTime,
            addToState,
            changeTimeLineByDrag,
            sortByStartTime
        };
