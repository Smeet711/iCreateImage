import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Reminderbrands() {
  const navigate = useNavigate();
  const [allReminder, setAllReminder] = useState([]);
  const [logos, setAllLogos] = useState([]);
  const [checkDelete, setDelte] = useState(0);

  useEffect(() => {
    fetch("https://icreate-admin-backend.onrender.com/reminder")
      .then((res) => res.json())
      .then((data) => setAllReminder(data));

    fetch("https://icreate-admin-backend.onrender.com/reminder-logos")
      .then((res) => res.json())
      .then((data) => setAllLogos(data));
  }, [checkDelete]);

  function sendtoform(id, image, name) {
    navigate(`/Admin/reminder-sub-brands/${id}`);
  }

  return (
    <div>
      <div className="py-8">
        <h1 className="text-5xl text-center font-bold opacity-25">
          Admin Panel
        </h1>
      </div>
      <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-7">
        {allReminder.length > 0 &&
          allReminder.map((item, index) => (
            <div>
              <div
                key={index}
                className="h-[350px] bg-white/25 border-x-8 border-t-8 shadow-md shadow-black border-slate-200 w-[250px] rounded-xl overflow-hidden"
              >
                <div className="h-[90%]">
                  <img
                    src={`https://icreate-admin-backend.onrender.com/${item.design[0].image}`}
                    className="w-[112%] h-full rounded-lg"
                    onClick={() =>
                      sendtoform(
                        item._id,
                        item.design[0].image,
                        item.brandname,
                        item.design[0].name
                      )
                    }
                  />
                </div>
                <div className="h-[10%] text-center bg-slate-200 font-bold text-xl">
                  <h1>{item.brandName}</h1>
                </div>
              </div>
              <div className="flex justify-center items-center space-x-12 py-3">
                <div className="w-[30%] border-2 border-slate-700 flex items-center justify-center rounded-md bg-[#4BB543]">
                  <NavLink to={`/Admin/posterbrandsedit/${item.design[0]._id}`}>
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

        {allReminder.length === 0 && <p className="text-center ">No Brands</p>}
      </div>
      <div>
        <p className="text-center text-2xl">LOGO SECTION</p>
        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-7">
          {logos.length > 0 &&
            logos.map((item, index) => (
              <div key={index}>
                <div className="h-[260px]  bg-white/25 border-x-8 border-t-8 shadow-md shadow-black border-slate-200 w-[350px] rounded-xl overflow-hidden">
                  <div className="h-[90%]">
                    <img
                      src={`https://icreate-admin-backend.onrender.com/${item.logos[0].logoImage}`}
                      alt={`Logo ${index}`}
                      className="w-[112%] h-full rounded-lg"
                    />
                  </div>
                  <div className="h-[10%] text-center bg-slate-200 font-bold text-xl">
                    <h1>{item.logos[0].logoName}</h1>
                  </div>
                </div>
                <div className="flex justify-center items-center space-x-12 py-3">
                  <div className="w-[30%] border-2 border-slate-700 flex items-center justify-center rounded-md bg-[#4BB543]">
                    <NavLink to={`/Admin/posterbrandsedit/${item._id}`}>
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

          {logos.length === 0 && <p className="text-center ">No Logos</p>}
        </div>
      </div>
    </div>
  );
}

export default Reminderbrands;
