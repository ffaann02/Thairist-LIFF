const sort_byDate_byTime = (allData, setState) => {
    console.log(allData);
    // Convert "start_time" and "date" to a single timestamp for easy comparison
    allData.forEach(attraction => {
        const [hours, minutes] = attraction.start_time.split(':').map(Number);
        const [day, month, year] = attraction.date.split('/').map(Number);
        const timestamp = new Date(year, month - 1, day, hours, minutes).getTime();
        attraction.attraction = timestamp;

        const tags = attraction.tag.split(',');
        attraction.tags = tags;
    });
    // Sort the array based on "start_timestamp"
    allData.sort((a, b) => a.start_timestamp - b.start_timestamp);
    // Remove the temporary "start_timestamp" property
    allData.forEach(attraction => delete attraction.start_timestamp);
    setState(allData);
    console.log(allData);
}

export { sort_byDate_byTime };
