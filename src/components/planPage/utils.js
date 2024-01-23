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

export { 
            generatedPlanID,
            addHoursToTime,
            checkName
        };
