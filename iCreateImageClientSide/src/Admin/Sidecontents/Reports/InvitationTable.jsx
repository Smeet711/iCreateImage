import React, { useEffect, useState } from "react";
import "./tablestyle.css";
const InvitationTable = ({ fromDate, toDate }) => {

  const [cnt, allCnt] = useState([]);

  useEffect(() => {
    fetch("https://icreate-user-backend.onrender.com/api/users-invitation-data")
      .then((res) => res.json())
      .then((data) => allCnt(data));
  }, []);

  const handleDelete = async (id) => {
    try {
      // Show confirmation prompt
      const shouldDelete = window.confirm(
        "Are you sure you want to delete this invitation?"
      );

      // If the user confirms, proceed with deletion
      if (shouldDelete) {
        const response = await fetch(
          `https://icreate-user-backend.onrender.com/api/user-invitiation-delete/${id}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          // Delete was successful, update the state to trigger a re-render
          fetch("https://icreate-user-backend.onrender.com/api/users-invitation-data")
            .then((res) => res.json())
            .then((data) => allCnt(data));
        } else {
          // Handle error if needed
        //   console.error("Failed to delete invitation");
        }
      } else {
        // User canceled the deletion
        // console.log("Deletion canceled");
      }
    } catch (error) {
    //   console.error("Error:", error);
    }
  };

  console.log(cnt);

  return (
    <div className="w-[150%]  absolute left-[50px]">
      <table className="border rounded-t-lg ">
        <thead className="text-white   bg-sky-500  ">
          <tr className="fw-bold  uppercase  font-semibold  text-canter ">
            <td>brand name</td>
            <td> doctor name </td>
            <td> topic</td>
            <td>
              {" "}
              speaker <br /> name{" "}
            </td>
            <td> day</td>
            <td> date</td>
            <td>time</td>
            <td>hotal</td>
            <td>address</td>
            {/* <td>action</td> */}
          </tr>
        </thead>

        <tbody className="table-box">
          {cnt.allInvitationData &&
            cnt.allInvitationData.length > 0 &&
            cnt.allInvitationData.map((item) => (
              <tr key={item._id}>
                <td>{item.brandName}</td>
                <td>{item.drName}</td>
                <td>{item.topic}</td>
                <td>{item.speakerName}</td>
                <td>{item.day}</td>
                <td>{item.date}</td>
                <td>{item.time}</td>
                <td>{item.hotelName}</td>
                <td>{item.hotelAddress}</td>
                <td>
                  {/* <button
                    className="text-white rounded-full ps-2 pe-2 bg-red-600"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button> */}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvitationTable;
