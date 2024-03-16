import React, { useEffect, useState } from "react";

import * as XLSX from "xlsx";

import "./tablestyle.css";
function AnniversaryData() {
  const [invitationData, setData] = useState([]);
  const type = "poster";
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [cnt, allCnt] = useState([]);

  function handleFilter() {
    if (fromDate && toDate && fromDate <= toDate) {
      const filterFromDate = new Date(`${fromDate}T00:00:00.000Z`).getTime();
      const filterToDate = new Date(`${toDate}T23:59:59.999Z`).getTime();

      const filteredData = cnt.allAnniversaryData.map((item) => {
        const filteredAnniversary = item.anniversaries.filter((anniversary) => {
          const itemDate = new Date(anniversary.dateOfCreation).getTime();

          return itemDate >= filterFromDate && itemDate <= filterToDate;
        });

        return { ...item, anniversaries: filteredAnniversary };
      });

      const filteredDataWithAnniversary = filteredData.filter(
        (item) => item.anniversaries.length > 0
      );

      allCnt({ ...cnt, allAnniversaryData: filteredDataWithAnniversary });
    }
  }

  useEffect(() => {
    fetch("https://icreate-user-backend.onrender.com/api/users-anniversay-data")
      .then((res) => res.json())
      .then((data) => allCnt(data));
  }, []);

  function downloadExcel() {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(
      cnt.allAnniversaryData.flatMap((anniversaryData) =>
        anniversaryData.anniversaries.map((anniversary) => ({
          EmpName: anniversaryData.user.USERNAME,
          EmpID: anniversaryData.user.MRID,
          Email: anniversaryData.user.EMAIL,
          MRRole: anniversaryData.user.ROLE,
        }))
      )
    );

    XLSX.utils.book_append_sheet(workbook, worksheet, "AnniversaryData");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });
    const fileName = "anniversary_data.xlsx";

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const formatDateString = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = `${date.getDate()} ${getMonthName(
      date.getMonth()
    )} ${date.getFullYear()}`;
    return formattedDate;
  };

  const getMonthName = (monthIndex) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return months[monthIndex];
  };

  return (
    <>
      <div>
        <div className="rightdiv w-[80vw] relative left-[10px]" id="invitation">
          <div className="py-8">
            <h1 className="text-5xl text-center font-bold opacity-25 uppercase">
              Anniversary Reports
            </h1>
          </div>

          {/* //filter code starts  */}
          <div class="m-2 flex justify-center items-center">
            <div class="rounded-xl border border-gray-300 bg-gray-300 from-gray-100 to-white p-8 shadow-lg w-full ">
              <h2 class="text-stone-700 text-xl font-bold text-center">
                Apply filters
              </h2>
              <p class="mt-1 text-sm text-center">
                Use filters to further refine search
              </p>

              <button
                className="active:scale-95 rounded-lg bg-green-600 px-8 py-2 font-medium text-white outline-none focus:ring hover:opacity-90"
                onClick={downloadExcel}
              >
                Download Excel
              </button>

              <div class="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {/* <div class="flex flex-col">
                  <label for="name" class="text-stone-600 text-sm font-medium">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="raspberry juice"
                    class="mt-2 block w-full rounded-md border border-gray-200 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                </div>

                <div class="flex flex-col">
                  <label
                    for="manufacturer"
                    class="text-stone-600 text-sm font-medium"
                  >
                    Brand
                  </label>
                  <input
                    type="manufacturer"
                    id="manufacturer"
                    placeholder="cadbery"
                    class="mt-2 block w-full rounded-md border border-gray-200 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                </div> */}

                <div class="flex flex-col">
                  <label for="date" class="text-stone-600 text-sm font-medium">
                    From Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    onChange={(e) => setFromDate(e.target.value)}
                    class="mt-2 block w-full rounded-md border border-gray-200 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                </div>

                <div class="flex flex-col">
                  <label for="date" class="text-stone-600 text-sm font-medium">
                    To Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    onChange={(e) => setToDate(e.target.value)}
                    class="mt-2 block w-full rounded-md border border-gray-200 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                </div>

                {/* <div class="flex flex-col">
                  <label
                    for="status"
                    class="text-stone-600 text-sm font-medium"
                  >
                    Status
                  </label>

                  <select
                    id="status"
                    class="mt-2 block w-full rounded-md border border-gray-200 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  >
                    <option>Dispached Out</option>
                    <option>In Warehouse</option>
                    <option>Being Brought In</option>
                  </select>
                </div> */}
              </div>

              <div class="mt-6 grid w-full grid-cols-2 justify-end space-x-4 md:flex">
                <button class="active:scale-95 rounded-lg bg-gray-200 px-8 py-2 font-medium text-gray-600 outline-none focus:ring hover:opacity-90">
                  Reset
                </button>
                <button
                  class="active:scale-95 rounded-lg bg-blue-600 px-8 py-2 font-medium text-white outline-none focus:ring hover:opacity-90"
                  onClick={handleFilter}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
          {/* // filter code ends  */}

          <div className="w-[100%] ">
            <table className="border rounded-t-lg">
              <thead className="text-white bg-sky-500">
                <tr className="fw-bold uppercase font-semibold text-canter">
                  <td>EmpName</td>
                  <td>EmpID</td>
                  <td>Email</td>
                  <td>MRRole</td>
                  <td>HQ</td>
                  <td>Region</td>
                  <td>BusinessUnit</td>
                  <td>DOJ</td>
                  <td>SCCode</td>
                  <td>BrandName</td>
                  <td>DoctorName</td>
                  <td>Date of Creation</td>
                  {/* <td>Topic</td> */}

                  <td>Total Cards Success</td>
                  <td>Total Cards Failed</td>
                </tr>
              </thead>

              <tbody className="table-box">
                {cnt.allAnniversaryData &&
                  cnt.allAnniversaryData.length > 0 &&
                  cnt.allAnniversaryData.map((anniData) =>
                    anniData.anniversaries.map((anniversary) => (
                      <tr key={anniversary._id}>
                        <td className="capitalize">
                          {anniData.user.USERNAME || anniData.user?.USERNAME}
                        </td>

                        <td>{anniData.user.MRID}</td>
                        <td>{anniData.user.EMAIL}</td>
                        <td>{anniData.user.ROLE}</td>
                        <td>{anniData.user.HQ}</td>
                        <td>{anniData.user.REGION}</td>
                        <td>{anniData.user.BUSINESSUNIT}</td>
                        <td>{anniData.user.DOJ}</td>
                        <td>{anniData.user.SCCODE}</td>
                        <td>{anniversary.brandName}</td>
                        <td>{anniversary.drName}</td>
                        <td>{formatDateString(anniversary.dateOfCreation)}</td>
                        {/* <td>{poster.topic}</td> */}

                        <td>{anniData.anniversaries.length}</td>
                        <td>{0}</td>
                        <td>
                          {/* Add your delete button or other actions here */}
                        </td>
                      </tr>
                    ))
                  )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default AnniversaryData;
