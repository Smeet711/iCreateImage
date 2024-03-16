import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Certificatebrands = () => {
  const navigate = useNavigate();
  const [allCertificate, setAllCertificate] = useState([]);
  const [checkDelete, setDelte] = useState(0);

  useEffect(() => {
    fetch("https://icreate-admin-backend.onrender.com/certificate")
      .then((res) => res.json())
      .then((data) => setAllCertificate(data));
  }, [checkDelete]);

  const handleDelete = (id) => {
    fetch(`https://icreate-admin-backend.onrender.com/certificate/${id}`, {
      method: "DELETE",
    });
    setDelte((predelte) => predelte + 1);
  };

  function sendtoform(id, image, name) {
    navigate(`/Admin/certificate-sub-brands/${id}`);
  }

  return (
    <div>
      <div className="py-8">
        <h1 className="text-5xl text-center font-bold opacity-25">
          Certificate
        </h1>
      </div>
      <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-7">
        {allCertificate.length > 0 &&
          allCertificate.map((item, index) => (
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
                  <h1>{item.brandname}</h1>
                </div>
              </div>
              <div className="flex justify-center items-center space-x-12 py-3">
                <div className="w-[30%] border-2 border-slate-700 flex items-center justify-center rounded-md bg-[#4BB543]">
                  <NavLink
                    to={`/Admin/certificatebrandsedit/${item.design[0]._id}`}
                  >
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

        {allCertificate.length === 0 && (
          <p className="text-center ">No Brands</p>
        )}
      </div>
    </div>
  );
};

export default Certificatebrands;
