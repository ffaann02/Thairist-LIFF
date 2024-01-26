const sortByTime = (planDetails, planDate, setStateSortedArray) => {
    const newArray = [...planDetails];
    // Convert "start_time" to minutes since midnight for easy comparison
    newArray.forEach(attraction => {
        const [hours, minutes] = attraction.start_time.split(':').map(Number);
        attraction.start_minutes = hours * 60 + minutes;
    });
    // Sort the array based on "start_minutes"
    newArray.sort((a, b) => a.start_minutes - b.start_minutes);
    // Remove the temporary "start_minutes" property
    newArray.forEach(attraction => delete attraction.start_minutes);
    const sortedArray = splitByDay(newArray, planDate);
    setStateSortedArray(sortedArray);
}

const splitByDay = (data, dates) => {
    let splitedData = [];
    dates.forEach(date => {
        const matched = data.filter(item => item.formated_date.day === date.day &&
                                  item.formated_date.month === date.month && 
                                  item.formated_date.year === date.year);
        const formatDate = `${date.day}/${date.month}/${date.year}`;
        splitedData.push(matched);
        // splitedData[formatDate] = matched;                          
    })
    return splitedData;
}

const calculateExpense = (sortedData, setStateEachList, setStateEachDay, setStateTotal, setStateAdult, setStateKid, setStateTicket, setStateEnableEdit) => {
    let totalExpense = 0;
    let totalExpenseEachDay = [];
    let arrayExpenseEachList = [];
    let arrayAdultAmount = [];
    let arrayKidAmount = [];
    let arrayTicket = [];
    let arrayEnableEdit = [];

    sortedData.map((dataDay, index) => {
        let total = 0;
        let expenseEachList = [];
        let adultEachPlan = [];
        let kidEachPlan = [];
        let ticketEachPlan = [];
        let enableEditEachPlan = [];

        dataDay.map((data, index) => {
            let price = 0;
            let adultAmount = data.adult_amount;
            let kidAmount;
            let isUseTicked;
            // Process ticked amount (check kid_amount because in add plan feature set default null)
            if(data.kid_amount === null){
                kidAmount = 0;
            }
            else{
                kidAmount = data.kid_amount;
            }
            // Process price
            if(data.kid_price === null && data.adult_price === null){
                isUseTicked = false;
                if(data.custom_price === null){
                    price = 0;
                    total += 0;
                }
                else{
                    price = data.custom_price;
                    total += data.custom_price;
                }
            }
            else{
                isUseTicked = true;
                const kid_price = data.kid_amount * data.kid_price;
                const adult_price = data.adult_amount * data.adult_price;
                price = kid_price + adult_price;
                total += kid_price + adult_price;
            }
            expenseEachList.push(price);
            adultEachPlan.push(adultAmount);
            kidEachPlan.push(kidAmount);
            ticketEachPlan.push(isUseTicked);
            enableEditEachPlan.push(false);
        })
        totalExpense += total;
        totalExpenseEachDay.push(total);
        arrayExpenseEachList.push(expenseEachList);
        arrayAdultAmount.push(adultEachPlan);
        arrayKidAmount.push(kidEachPlan);
        arrayTicket.push(ticketEachPlan);
        arrayEnableEdit.push(enableEditEachPlan);
    });
    setStateEachList(arrayExpenseEachList);
    setStateEachDay(totalExpenseEachDay);
    setStateTotal(totalExpense);
    setStateAdult(arrayAdultAmount);
    setStateKid(arrayKidAmount);
    setStateTicket(arrayTicket);
    setStateEnableEdit(arrayEnableEdit);
}


export { sortByTime, calculateExpense }