import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import "../../Login.css";

const AnniversarySubBrands = () => {
  const { id, MRID, name, brandname } = useParams();
  const [AnniversaryDesign, setAnniversaryDesign] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://icreate-admin-backend.onrender.com/anniversary-brands/${id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setAnniversaryDesign(data));
  }, []);

  function sendtoform(image, name, type) {
    console.log({ type, image, name });

    // alert(brandname);

    if (brandname === "Layout1") {
      navigate(`/client/anniversaryform1/${MRID}/${id}/${image}/${brandname}`);
    } else {
      // alert("form under process For Other Layout ");
      navigate(`/client/anniversaryform2/${MRID}/${id}/${image}/${brandname}`);
    }
  }

  return (
    <>  
   


<div className="container mx-auto p-8  rounded-lg">
      <div className="">
      <div className="flex flex-row justify-between items-center relative top-[-24px]">
            <NavLink className="p-5 flex relative left-[-36px] " to={`/client/clientanniversary/${MRID}`}>
              <div
                style={{ backgroundColor: "#F58420", color: "white" }}
                className="p-3 drop-shadow-lg    h-10 w-10   rounded-full "
              >
                <IoMdArrowRoundBack />
              </div>
            </NavLink>
            <div className="text-black text-[20px] font-bold relative left-[-44px]  ">
              <p>Anniversary Cards</p>
            </div>
          </div>

          <div className="font-bold text-[9px] top-[-34px] relative left-[36px] text-[rgba(158,156,158,1)] ">
          <p>Please select your preferable design templates.</p>
          </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3  gap-8">
        {AnniversaryDesign.design &&
          AnniversaryDesign.design.map((item, index) => (
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

        {AnniversaryDesign.length === 0 && (
          <p className="text-center ">No Sub Design for Anniversary</p>
        )}
      </div>
    </div>



    </>
  );
};

export default AnniversarySubBrands;
