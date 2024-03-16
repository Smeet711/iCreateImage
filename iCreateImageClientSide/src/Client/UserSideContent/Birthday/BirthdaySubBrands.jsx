import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import "../../Login.css";

const BirthdaySubBrands = () => {
  const { id, MRID, name, brandname } = useParams();

  const [BirthdayDesign, setBirthdayDesign] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://icreate-admin-backend.onrender.com/birthdays-brands/${id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setBirthdayDesign(data));
  }, []);

  console.log({ brandname });

  function sendtoform(image, name, type) {
    if (brandname === "Layout1") {
      navigate(`/client/birthdayform/${MRID}/${id}/${image}/${brandname}`);
    } else {
      navigate(`/client/birthdayform2/${MRID}/${id}/${image}/${brandname}`);
    }
  }

  return (
    <>
    


<div className="container mx-auto p-8  rounded-lg">
      <div className="">
      <div className="flex flex-row justify-between items-center relative top-[-24px]">
            <NavLink className="p-5 flex relative left-[-36px] " to={`/client/clientbirthday/${MRID}`}>
              <div
                style={{ backgroundColor: "#F58420", color: "white" }}
                className="p-3 drop-shadow-lg    h-10 w-10   rounded-full "
              >
                <IoMdArrowRoundBack />
              </div>
            </NavLink>
            <div className="text-black text-[20px] font-bold relative left-[-71px]  ">
              <p>Birthday Card</p>
            </div>
          </div>

          <div className="font-bold text-[9px] top-[-34px] relative left-[36px] text-[rgba(158,156,158,1)] ">
          <p>Please select your preferable design templates.</p>
          </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3  gap-8">
        {BirthdayDesign.design &&
          BirthdayDesign.design.map((item, index) => (
            <div className="flex justify-center items-center" key={index}>
              <div
                key={index}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 w-auto"
              >
                <div className="h-[300px] w-full overflow-hidden cursor-pointer">
                  <img
                    src={`http://localhost:3000/${item.image}`}
                    className="w-full h-full  transform hover:scale-105 transition-transform rounded-t-lg"
                    onClick={() =>
                      sendtoform(
                        item.image,
                        item.brandname, 
                        item.name,
                        item.type
                      )
                    }
                  />
                </div>
                <div className=" text-center bg-[#F58420] rounded-b-lg">
                  <h1 className="text-lg font-semibold text-white">
                    {item.name}
                  </h1>
                </div>
              </div>
            </div>
          ))}

        {BirthdayDesign.length === 0 && (
          <p className="text-center ">No Sub Design for Birthday</p>
        )}
      </div>
    </div>




    </>
  );
};

export default BirthdaySubBrands;
