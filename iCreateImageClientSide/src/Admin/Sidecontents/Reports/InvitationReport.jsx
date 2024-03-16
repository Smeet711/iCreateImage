"use strict";

import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";

import InvitationTable from "./InvitationTable";
import "./tablestyle.css";
function Invitation() {
  const [invitationData, setData] = useState([]);
  const type = "invitation";
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [cnt, allCnt] = useState([]);

  function getRandomColor() {
    // Generate a random hex color code
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

  function handleFilter() {
    // alert("hello");
    if (fromDate && toDate) {
      // Append time component to fromDate and toDate
      const filterFromDate = new Date(fromDate);
      const filterToDate = new Date(toDate);

      const filteredData = cnt.allInvitationData.filter((item) => {
        console.log("item", item.dateOfCreation);
        const itemDate = new Date(item.dateOfCreation);

        return (
          itemDate >= new Date(filterFromDate) &&
          itemDate <= new Date(filterToDate)
        );
        return (
          adjustedItemDate.toISOString().slice(0, 19) >=
            filterFromDate.toISOString().slice(0, 19) &&
          adjustedItemDate.toISOString().slice(0, 19) <=
            filterToDate.toISOString().slice(0, 19)
        );
      });

      console.log("filteredDate: ", filteredData);

      if (filteredData.length === 0) {
        // No filtered data, render the "No data found" message
        allCnt({ ...cnt, allInvitationData: [] });
        // setTimeout(() => {
        //   window.location.reload();
        // }, 500);
      } else {
        // Update state with the filtered data
        allCnt({ ...cnt, allInvitationData: filteredData });
      }
    }
  }

  useEffect(() => {
    console.log("fetching....");
    fetch("https://icreate-user-backend.onrender.com/api/v2/users-invitation-data")
      .then((res) => res.json())
      .then((data) => allCnt(data));
  }, []);

  // console.log(cnt);

  function downloadExcel() {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(
      cnt.allInvitationData.map((invitationData) => ({
        EMPNAME: invitationData.USERNAME,
        EMPID: invitationData.MRID,
        Email: invitationData.EMAIL,
        HQ: invitationData.HQ,
        // ... add other fields here
        // Total_Cards_Success: invitationData.invitations.length,
        // Total_Cards_Failed: 0, // Assuming you want to provide a default value
      }))
    );

    XLSX.utils.book_append_sheet(workbook, worksheet, "InvitationData");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });
    const fileName = "invitation_data.xlsx";

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
              Invitation Reports
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
                    placeholder="Enter MRName"
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
                    placeholder="Enter Brand"
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
                  <td>Business Unit</td>
                  <td>DOJ</td>
                  <td>DrCode</td>
                  <td>Brand</td>
                  <td>DoctorName</td>
                  <td>Topic</td>
                  <td>Speaker</td>
                  <td>Day</td>
                  <td>Date</td>
                  <td>Time</td>
                  <td>date Of Creation</td>
                  <td>Venue</td>
                  <td>Venue Address</td>
                  <td>Total Success</td>
                  <td>Total Failed</td>
                </tr>
              </thead>

              <tbody className="table-box">
                {cnt &&
                  cnt.allInvitationData &&
                  cnt.allInvitationData.length > 0 &&
                  cnt.allInvitationData.map((invitation) => (
                    <tr key={invitation.MRID}>
                      <td className="capitalize">{invitation.USERNAME}</td>
                      <td>{invitation.MRID}</td>
                      <td>{invitation.EMAIL}</td>
                      <td>{invitation.ROLE}</td>
                      <td>{invitation.HQ}</td>
                      <td>{invitation.REGION}</td>
                      <td>{invitation.BUSINESSUNIT}</td>
                      <td>{invitation.DOJ}</td>
                      <td>{invitation.SCCODE}</td>
                      <td>{invitation.brandName}</td>
                      <td>{invitation.drName}</td>
                      <td>{invitation.topic}</td>
                      <td>{invitation.speakerName}</td>
                      <td className="capitalize">{invitation.day}</td>
                      <td>
                        {new Date(invitation.date).toLocaleDateString("en-GB")}
                      </td>
                      <td>{invitation.time}</td>
                      <td>{formatDateString(invitation.dateOfCreation)}</td>
                      <td>{invitation.hotelName}</td>
                      <td>{invitation.hotelAddress}</td>
                      <td>{cnt.length > 0 ? "Yes" : "No"}</td>
                      <td>{"No"}</td>
                      <td>
                        {/* Add your delete button or other actions here */}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* <InvitationTable fromDate={fromDate} toDate={toDate} /> */}
    </>
  );
}

export default Invitation;
