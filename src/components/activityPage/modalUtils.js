const sortByStartTime = (planData, planDetailExist, selectedAttraction, setNewOrderPlanDetail, dates, currentSelectDay, switchDay) => {
    const newArray = [...planDetailExist];
    // Convert "start_time" to minutes since midnight for easy comparison
    newArray.forEach(attraction => {
        const [hours, minutes] = attraction.start_time.split(':').map(Number);
        attraction.start_minutes = hours * 60 + minutes;
    });
    // Sort the array based on "start_minutes"
    newArray.sort((a, b) => a.start_minutes - b.start_minutes);
    // Remove the temporary "start_minutes" property
    newArray.forEach(attraction => delete attraction.start_minutes);

    // merge selectedAttraction to array
    selectedAttraction.formated_date = {
        day: parseInt(dates[currentSelectDay].day),
        month: parseInt(dates[currentSelectDay].month),
        year: parseInt(dates[currentSelectDay].year)
    }
    selectedAttraction.isSelectedAttraction = true;
    newArray.push(selectedAttraction);

    setNewOrderPlanDetail(newArray);
    switchDay(0, planData.result[0], newArray);
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

const findDefaultTime = (specific_day, sortedPlanDetail, selectedAttraction, setDefaultStartTime, setEndTimeSelects) => {
    const dataDay = sortedPlanDetail.filter(detail => {
        return (
            detail.formated_date.day === specific_day.day &&
            detail.formated_date.month === specific_day.month &&
            detail.formated_date.year === specific_day.year &&
            !detail.isSelectedAttraction
        );
    });
    sortedPlanDetail.forEach(detail => {
        if (detail.isSelectedAttraction === true) {
            detail.formated_date.day = specific_day.day;
            detail.formated_date.month = specific_day.month;
            detail.formated_date.year = specific_day.year;
        }
    });
    if (dataDay.length > 0) {
        const [lastHours, lastMinutes] = dataDay[dataDay.length - 1].end_time.split(':');
        const startTime = `${lastHours}:${lastMinutes}`;
        const endTime = addHoursToTime(startTime, selectedAttraction.period);
        setDefaultStartTime(startTime);
        setEndTimeSelects(endTime);
    }
    else {
        const startTime = selectedAttraction.open_time;
        const endTime = addHoursToTime(startTime, selectedAttraction.period);
        setDefaultStartTime(startTime);
        setEndTimeSelects(endTime);
    }
}

const createClosedHoursArray = (selectedAttraction) => {
    const open_time = selectedAttraction.open_time.split(':');
    const close_time = selectedAttraction.close_time.split(':');
    const open = parseInt(open_time[0]);
    const close = parseInt(close_time[0]);
    const closedHours = [];
    // Adding hours before the market opens
    for (let i = 0; i < open; i++) {
        closedHours.push(i);
    }
    // Adding hours after the market closes
    for (let i = close; i < 24; i++) {
        closedHours.push(i);
    }

    return closedHours;
}

const calculateOverlapTime = (selectedAttraction, planDetailExist, specific_day, setDisabledHours) => {
    let disable_hour_array = [];
    const closed_hour = createClosedHoursArray(selectedAttraction);
    disable_hour_array = [...closed_hour];
    if (planDetailExist) {
        planDetailExist.map((detail) => {
            if ((detail.formated_date.day === specific_day.day &&
                detail.formated_date.month === specific_day.month &&
                detail.formated_date.year === specific_day.year)) {
                const start_time = detail.start_time.split(':');
                const start_hour = parseInt(start_time[0]);
                const end_time = detail.end_time.split(':');
                const end_hour = parseInt(end_time[0]);
                // Create new array and unions with previous array
                const hour_array = [...Array(end_hour - start_hour)].map((_, index) => start_hour + index);
                disable_hour_array = [...new Set([...disable_hour_array, ...hour_array])];
            }
        })
    }
    setDisabledHours(disable_hour_array);
}

export {
    sortByStartTime,
    addHoursToTime,
    findDefaultTime,
    createClosedHoursArray,
    calculateOverlapTime
}