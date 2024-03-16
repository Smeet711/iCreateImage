import React, { useEffect, useState } from "react";
import InvitationTable from "./InvitationTable";
import * as XLSX from "xlsx";
import "./tablestyle.css";
function CertificateReport() {
  const [invitationData, setData] = useState([]);
  const type = "certificate";
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [cnt, allCnt] = useState([]);

  function handleFilter() {
    // window.onload()

    if (fromDate && toDate && fromDate <= toDate) {
      const filterFromDate = new Date(`${fromDate}T00:00:00.000Z`).getTime();
      const filterToDate = new Date(`${toDate}T23:59:59.999Z`).getTime();

      const filteredData = cnt.allCertificateData.map((item) => {
        const filteredCertificates = item.certificates.filter((certificate) => {
          const itemDate = new Date(certificate.dateOfCreation).getTime();
          const adjustedItemDate =
            itemDate - new Date().getTimezoneOffset() * 60000;
          console.log({
            itemDate,
            adjustedItemDate,
            filterFromDate,
            filterToDate,
            comparison:
              adjustedItemDate >= filterFromDate &&
              adjustedItemDate <= filterToDate,
          });
          return (
            adjustedItemDate >= filterFromDate &&
            adjustedItemDate <= filterToDate
          );
        });

        console.log({
          userId: item.user._id,
          certificateCount: filteredCertificates.length,
          filteredCertificates,
        });

        return { ...item, certificates: filteredCertificates };
      });

      console.log({ filteredData });

      const filteredDataWithCertificates = filteredData.filter(
        (item) => item.certificates.length > 0
      );

      allCnt({ ...cnt, allCertificateData: filteredDataWithCertificates });
    }
  }

  useEffect(() => {
    // console.log("fetching....");
    fetch("https://icreate-user-backend.onrender.com/api/users-certificate-data")
      .then((res) => res.json())
      .then((data) => allCnt(data));
  }, []);

  function downloadExcel() {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(
      cnt.allCertificateData.flatMap((certificateData) =>
        certificateData.certificates.map((certificate) => ({
          EmpName: certificateData.user.USERNAME,
          EmpID: certificateData.user.MRID,
          Email: certificateData.user.EMAIL,
          MRRole: certificateData.user.ROLE,
        }))
      )
    );

    XLSX.utils.book_append_sheet(workbook, worksheet, "CertificateData");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });
    const fileName = "certificate_data.xlsx";

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
              Certificate Reports
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
                {cnt.allCertificateData &&
                  cnt.allCertificateData.length > 0 &&
                  cnt.allCertificateData.map((certificateData) =>
                    certificateData.certificates.map((certificate) => (
                      <tr key={certificate._id}>
                        <td className="capitalize">
                          {certificateData.user.USERNAME}
                        </td>
                        <td>{certificateData.user.MRID}</td>
                        <td>{certificateData.user.EMAIL}</td>
                        <td>{certificateData.user.ROLE}</td>
                        <td>{certificateData.user.HQ}</td>
                        <td>{certificateData.user.REGION}</td>
                        <td>{certificateData.user.BUSINESSUNIT}</td>
                        <td>{certificateData.user.DOJ}</td>
                        <td>{certificateData.user.SCCODE}</td>
                        <td>{certificate.brandName}</td>
                        <td>{certificate.drName}</td>
                        <td>{formatDateString(certificate.dateOfCreation)}</td>
                        {/* <td>{poster.topic}</td> */}

                        <td>{certificateData.certificates.length}</td>
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

export default CertificateReport;
