import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import "../../Login.css";
const PosterSubBrands = () => {
  const { id, MRID, name, brandname } = useParams();
  const [PosterDesign, setPosterDesign] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://icreate-admin-backend.onrender.com/posters-brands/${id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setPosterDesign(data));
  }, []);

  function sendtoform(image, name, type) {
    console.log({ type, image, name });

    // if (type === "One") {
    //   navigate(`/invitatationform/${MRID}/${id}/${image}/${name}`);
    // } else if (type === "Two") {
    //   navigate(`/invitatationform2/${MRID}/${id}/${image}/${name}`);
    //   //   alert("Form is pending");
    // }

    // alert(brandname);

    if (brandname === "Layout1") {
      navigate(`/client/posterform/${MRID}/${id}/${image}/${brandname}`);
    } else if(brandname === "Layout2") {
      // alert("form under process For Other Layout ");
      navigate(`/client/posterform2/${MRID}/${id}/${image}/${brandname}`);
    }else if(brandname === "Layout3"){
      navigate(`/client/posterform3/${MRID}/${id}/${image}/${brandname}`);
    }
  }

  return (
    <>
    
    {/* <div>
      <div className="py-8">
        <h1 className="text-5xl text-center font-bold opacity-25">
          Poster {brandname}
        </h1>
      </div>
      <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-7">
        {PosterDesign.design &&
          PosterDesign.design.map((item, index) => (
            <div>
              <div
                key={index}
                className="h-[350px] cursor-pointer bg-white/25 border-x-8 border-t-8 shadow-md shadow-black border-slate-200 w-[250px] rounded-xl overflow-hidden"
              >
                <div className="h-[90%]">
                  <img
                    src={`https://icreate-admin-backend.onrender.com/${item.image}`}
                    className="w-[112%] h-full rounded-lg"
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
                <div className="h-[10%] text-center bg-slate-200 font-bold text-xl">
                  <h1>{item.name}</h1>
                </div>
              </div>
            </div>
          ))}

        {PosterDesign.length === 0 && (
          <p className="text-center ">No Sub Design for Invitation</p>
        )}
      </div>
    </div> */}

<div className="container mx-auto p-8  rounded-lg">
      <div className="">
      <div className="flex flex-row justify-between items-center relative top-[-24px]">
            <NavLink className="p-5 flex relative left-[-36px] " to={`/client/clientposter/${MRID}`}>
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3  gap-8">
        {PosterDesign.design &&
          PosterDesign.design.map((item, index) => (
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
                <div className=" text-center  bg-[#F58420]  rounded-b-lg">
                    <h1 className="text-lg font-semibold text-white">
                      {item.name}
                    </h1>
                  </div>
              </div>
            </div>
          ))}

        {PosterDesign.length === 0 && (
          <p className="text-center ">No Sub Design for Invitation</p>
        )}
      </div>
    </div>
















    </>
  );
};

export default PosterSubBrands;
