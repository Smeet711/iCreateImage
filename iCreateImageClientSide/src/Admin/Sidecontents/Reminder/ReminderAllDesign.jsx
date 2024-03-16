import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";

const ReminderAllDesign = () => {
  const { id } = useParams();
  const [ReminderDesign, setReminderDesign] = useState({});

  useEffect(() => {
    fetch(`https://icreate-admin-backend.onrender.com/reminders-brands/${id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setReminderDesign(data));
  }, []);

  return (
    <div>
      <div className="py-8">
        <h1 className="text-5xl text-center font-bold opacity-25">
          Reminder Sub Design
        </h1>
      </div>
      <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-7">
        {ReminderDesign.design &&
          ReminderDesign.design.map((item, index) => (
            <div>
              <div
                key={index}
                className="h-[350px] cursor-pointer bg-white/25 border-x-8 border-t-8 shadow-md shadow-black border-slate-200 w-[250px] rounded-xl overflow-hidden"
              >
                <div className="h-[90%]">
                  <img
                    src={`https://icreate-admin-backend.onrender.com/${item.image}`}
                    className="w-[112%] h-full rounded-lg"
                  />
                </div>
                <div className="h-[10%] text-center bg-slate-200 font-bold text-xl">
                  <h1>{item.name}</h1>
                </div>
              </div>
              <div className="flex justify-center items-center space-x-12 py-3">
                <div className="w-[30%] border-2 border-slate-700 flex items-center justify-center rounded-md bg-[#4BB543]">
                  <NavLink to={`/Admin/invitationbrandsedit/${item._id}`}>
                    <button>Edit</button>
                  </NavLink>
                </div>
                <div className="w-[30%] border-2 border-slate-700 flex items-center justify-center rounded-md bg-[#d11a2a]">
                  <button
                    onClick={() => {
                      handleDelete(item._id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}

        {ReminderDesign.length === 0 && (
          <p className="text-center ">No Sub Design for Reminder</p>
        )}
      </div>
    </div>
  );
};

export default ReminderAllDesign;
