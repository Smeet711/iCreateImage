import React, { useEffect, useState } from "react";

const Certificate = () => {
  const [certificateData, setData] = useState([]);
  const type = "certificate";
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    fetch("https://icreate-user-backend.onrender.com/api/certificate-sub-brand")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  function getRandomColor() {
    // Generate a random hex color code
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

  function handleFilter() {
    // Assuming fromDate and toDate are strings in the format 'YYYY-MM-DD'
    const fromDateObj = new Date(fromDate);
    const toDateObj = new Date(toDate);

    // Format dates as 'YYYY-MM-DD'
    const formattedFromDate = fromDateObj.toISOString().split("T")[0];
    const formattedToDate = toDateObj.toISOString().split("T")[0];

    console.log({ formattedFromDate, formattedToDate });

    fetch("https://icreate-user-backend.onrender.com/api/get-filter-cards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type,
        fromDate: formattedFromDate,
        toDate: formattedToDate,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data);
      });
  }

  return (
    <div className="bg-gradient-to-r min-h-screen flex items-center justify-center">
    <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg">
      <h1 className="text-5xl text-center font-bold text-gray-800 mb-8">
        Certificate Panel
      </h1>
  
      <div className="flex justify-center space-x-6 items-center">
        <div>
          <input
            className="w-[200px] h-[50px] rounded-lg px-4 border-2 border-purple-500 focus:outline-none focus:border-indigo-600"
            type="date"
            placeholder="From"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </div>
        <div>
          <input
            className="w-[200px] h-[50px] rounded-lg px-4 border-2 border-purple-500 focus:outline-none focus:border-indigo-600"
            type="date"
            placeholder="To"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>
  
        <button
          className="bg-orange-400 m-3 rounded-lg px-6 py-2 hover:bg-orange-600 hover:text-white focus:outline-none"
          onClick={handleFilter}
        >
          Submit
        </button>
      </div>
  
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="h-[200px] rounded-lg grid place-items-center bg-purple-700 text-white">
          <div>
            <h1 className="text-lg font-semibold">CERTIFICATE</h1>
            <h1 className="text-4xl">{certificateData.certificateCount}</h1>
          </div>
        </div>
  
        {certificateData.subBrands &&
          certificateData.subBrands.map((item, index) => (
            <div
              key={index}
              className="h-[200px] rounded-lg grid place-items-center text-white"
              style={{ backgroundColor: getRandomColor() }}
            >
              <div>
                <h1 className="text-lg font-semibold">{item.brandName}</h1>
                <h1 className="text-4xl">{item.count}</h1>
              </div>
            </div>
          ))}
      </div>
    </div>
  </div>
  
  
  );
};

export default Certificate;
