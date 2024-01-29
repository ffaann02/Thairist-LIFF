const ExcHistory = ({ title, excpoint_historydata }) => {
  // Define a custom order for months
  const customMonthOrder = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];

  // Sort the data by month, date, and time
  const sortedData = excpoint_historydata.sort((a, b) => {
    const dateA = `${customMonthOrder.indexOf(a.month)} ${a.date} ${a.time}`;
    const dateB = `${customMonthOrder.indexOf(b.month)} ${b.date} ${b.time}`;
    return dateB.localeCompare(dateA);
  });

  // Group the data by month and date
  const groupedData = {};
  sortedData.forEach((item) => {
    const key = `${item.month} ${item.date}`;
    if (!groupedData[key]) {
      groupedData[key] = [];
    }
    groupedData[key].push(item);
  });

  // Convert the grouped data into JSX elements
  return (
    <div className="join join-vertical w-full">
      {Object.entries(groupedData)
        .sort((a, b) => b[0].localeCompare(a[0]))
        .map(([date, items], index) => (
          <div key={index}>
            <div className="w-full flex bg-white p-2 rounded-t-md">
              <p className="text-base font-bold">{date}</p>
            </div>

            {/* Sort items within each group by time in descending order */}
            {items
              .sort((a, b) => b.time.localeCompare(a.time))
              .map((item, subIndex) => (
                <div key={subIndex} className="bg-slate-50 collapse collapse-arrow join-item border border-base-300 mb-2">
                  <input type="radio" name="my-accordion-4" />
                  <div className="absolute w-full flex items-center">
                    <p className="top-0 py-2 px-4 text-base font-bold">{item.title}</p>
                    <p
                      style={{ color: item.PointNum < 0 ? '#FF0000' : '#51b3ce' }}
                      className="absolute right-0 p-3 text-sm font-bold my-auto"
                    >
                      {item.PointNum}
                    </p>
                  </div>
                  <div className="w-full flex collapse-title text-xl mt-4 font-medium items-center">
                    <p className="text-sm text-slate-400 font-light">{item.time}</p>
                  </div>
                  <div className="collapse-content bg-slate-50">
                    <hr />
                    <div className="flex items-center">
                      <p className="text-base mt-3 font-light text-slate-500">รายการ:</p>
                      <p className="absolute text-base mt-3 font-light right-0 px-3">{item.content}</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        ))}
    </div>
  );
};

export default ExcHistory;
