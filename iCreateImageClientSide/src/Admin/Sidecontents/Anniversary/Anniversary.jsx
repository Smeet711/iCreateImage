import React, { useEffect, useState } from "react";

function Annicersary() {
  const [anniversaryData, setData] = useState([]);
  const type = "anniversary";
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    fetch("https://icreate-user-backend.onrender.com/api/anniversary-sub-brand")
      .then((res) => res.json())
      .then((data) => setData(data));

    console.log("data: ", anniversaryData);
  }, []);

  function getRandomColor() {
    // Generate a random hex color code
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

  function handleFilter() {
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
    <>
     <div className="bg-gradient-to-r min-h-screen flex items-center justify-center">
  <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg">
    <h1 className="text-5xl text-center font-bold text-gray-800 mb-8">
      Anniversary Panel
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

    <div className="grid place-items-center md:py-[70px] w-[100%]">
      <div className="w-full">
        <div className="w-full">
          <div className="h-[135px] rounded-xl grid place-items-center bg-purple-700 text-white">
            <div>
              <h1 className="text-lg font-semibold">ANNIVERSARY</h1>
              <h1 className="text-4xl">{anniversaryData.AnniversaryCount}</h1>
            </div>
          </div>

          <div className="grid grid-cols-3 pt-10 gap-4">
            {anniversaryData.subBrands &&
              anniversaryData.subBrands.map((item, index) => (
                <div
                  key={index}
                  className="h-[135px] rounded-xl grid place-items-center"
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
    </div>
  </div>
</div>

    </>
  );
}

export default Annicersary;
