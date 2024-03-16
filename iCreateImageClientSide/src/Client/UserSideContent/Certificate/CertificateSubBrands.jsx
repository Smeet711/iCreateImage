import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import "../../Login.css";

const CertificateSubBrands = () => {
  const { id, MRID, name, brandname } = useParams();
  const [CertificateDesign, setCertificateDesign] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://icreate-admin-backend.onrender.com/certificates-brands/${id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setCertificateDesign(data));
  }, []);

  console.log({ brandname });

  function sendtoform(image, name, type) {
    console.log({ type, image, name });

   

    if (brandname === "Febutaz") {
      navigate(`/client/certificateform/${MRID}/${id}/${image}/${brandname}`);
    } else {
      // alert("form under process For Other Layout ");
      navigate(`/client/certificateform2/${MRID}/${id}/${image}/${brandname}`);
    }
  }

  return (
    <> 
    {/* <div>
      <div className="py-8">
        <h1 className="text-5xl text-center font-bold opacity-25">
          Certificate {brandname}
        </h1>
      </div>
      <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-7">
        {CertificateDesign.design &&
          CertificateDesign.design.map((item, index) => (
            <div>
              <div
                key={index}
                className="w-[350px] cursor-pointer bg-white/25 border-x-8 border-t-8 shadow-md shadow-black border-slate-200  rounded-xl overflow-hidden"
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

        {CertificateDesign.length === 0 && (
          <p className="text-center ">No Sub Design for Certificate</p>
        )}
      </div>
    </div> */}



<div className="container mx-auto p-8  rounded-lg">
      <div className="">
      <div className="flex flex-row justify-between items-center relative top-[-24px]">
            <NavLink className="p-5 flex relative left-[-36px] " to={`/client/clientcertificate/${MRID}`}>
              <div
                style={{ backgroundColor: "#F58420", color: "white" }}
                className="p-3 drop-shadow-lg    h-10 w-10   rounded-full "
              >
                <IoMdArrowRoundBack />
              </div>
            </NavLink>
            <div className="text-black text-[20px] font-bold relative left-[-104px]  ">
              <p>Certificate</p>
            </div>
          </div>


<div className="font-bold text-[9px] top-[-34px] relative left-[36px] text-[rgba(158,156,158,1)] ">
          <p>Please select your preferable design templates.</p>
          </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3  gap-8">
        {CertificateDesign.design &&
          CertificateDesign.design.map((item, index) => (
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

        {CertificateDesign.length === 0 && (
          <p className="text-center ">No Sub Design for Certificate</p>
        )}
      </div>
    </div>

    </>
  );
};

export default CertificateSubBrands;
