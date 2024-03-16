import React, { useEffect } from "react";
import { useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import "../../Login.css";

function UserPoster() {
  const { MRID } = useParams();
  const navigate = useNavigate();
  const [brandname, setBrandname] = useState("");
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    fetch("https://icreate-admin-backend.onrender.com/posters", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setBrands(data));
  }, []);

  console.log("data: ", brands);


  function sendtoform(id, image, brandname, name, type) {
    navigate(`/client/posterbrands/${id}/${MRID}/${brandname}/${name}`);
  }

  return (
    <>
     <div className="container mx-auto p-8  rounded-lg ">
        <div className="">
        <div className="flex flex-row justify-between items-center relative top-[-24px]">
            <NavLink className="p-5 flex relative left-[-36px] " to={`/client/welcome/${MRID}`}>
              <div
                style={{ backgroundColor: "#F58420", color: "white" }}
                className="p-3 drop-shadow-lg    h-10 w-10   rounded-full "
              >
                <IoMdArrowRoundBack />
              </div>
            </NavLink>
            <div className="text-black text-[20px] font-bold relative left-[-104px]  ">
              <p>Poster</p>
            </div>
          </div>

          <div className="font-bold text-[9px] top-[-34px] relative left-[36px] text-[rgba(158,156,158,1)] ">
          <p>Please select your preferable design templates.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {brands.map((item, index) => (
            <div className="flex justify-center items-center">
              <div
                key={index}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 w-auto"
              >
                <div className="h-[300px] w-full overflow-hidden cursor-pointer">
                  {/* {console.log(item.design[0].image)} */}
                  <img
                    src={`http://localhost:3000/${item.design[0].image}`}
                    className="w-full h-full  transform hover:scale-105 transition-transform rounded-t-lg"
                    onClick={() =>
                      sendtoform(
                        item._id,
                        item.design[0].image,
                        item.brandname,
                        item.design[0].name,
                        item.design[0].type
                      )
                    }
                  />
                </div>
                <div className=" text-center bg-[#F58420] rounded-b-lg">
                  <h1 className="text-lg font-semibold text-white">
                    {item.brandname}
                  </h1>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default UserPoster;
