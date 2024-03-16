import React, { useEffect } from "react";
import Select from "react-select";
import { useState } from "react";
import { components } from "react-select";
import { RxCross1 } from "react-icons/rx";
import ThankyouPreview2 from "./ThankyouPreview2";
import { useNavigate, useParams,NavLink } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import "../../Login.css";

const ThankyouForm2 = () => {
  const { MRID, id, image, name } = useParams();
  const [logoOptions, setLogoOptions] = useState([]);
  const [selectedOptionsFirst, setSelectedOptionsFirst] = useState([]);
  const [selectedOptionsSecond, setSelectedOptionsSecond] = useState([]);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [isSubmitVisible, setSubmitVisible] = useState(true);
  const [drname, setDrname] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://icreate-admin-backend.onrender.com/logos-name-id", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setLogoOptions(data));
  }, []);

  const CustomOption = (props) => (
    <div>
      <components.Option {...props}>
        <label>{props.label}</label>
      </components.Option>
    </div>
  );

  const handleSelectChangeFirst = (selectedValues) => {
    // Limit the selection to one checkbox
    if (selectedValues.length > 1) {
      alert("You can only select one option for the first image.");
    } else {
      setSelectedOptionsFirst(selectedValues);
    }
  };

  const handleSelectChangeSecond = (selectedValues) => {
    // Limit the selection to one checkbox
    if (selectedValues.length > 1) {
      alert("You can only select one option for the second image.");
    } else {
      setSelectedOptionsSecond(selectedValues);
    }
  };

  const openPopup = () => {
    setPopupVisible(true);
    setSubmitVisible(false);
  };

  const closePopup = () => {
    setPopupVisible(false);
    setSubmitVisible(true);
  };

  const backtotempl = () => {
    navigate(`/client/clientthank/${MRID}`); // replace 'username' with the actual username
  };

  return (
    <>
      {isSubmitVisible && (
        <div className="container mx-auto p-8  rounded-lg">
          <div className="">
          <div className="flex flex-row justify-between items-center relative top-[-24px]">
            <NavLink className="p-5 flex relative left-[-36px] " to={`/client/clientthank/${MRID}`}>
              <div
                style={{ backgroundColor: "#F58420", color: "white" }}
                className="p-3 drop-shadow-lg    h-10 w-10   rounded-full "
              >
                <IoMdArrowRoundBack />
              </div>
            </NavLink>
            <div className="text-black text-[20px] font-bold relative left-[-47px]  ">
              <p>ThankYou Card</p>
            </div>
          </div>
          <div className="font-bold text-[9px] top-[-34px] relative left-[36px] text-[rgba(158,156,158,1)] ">
          <p>Please fill the form to design your ThankYou Card.</p>
          </div>


            <div className="w-[100%] h-[80%] flex flex-col items-center justify-center gap-10">
              <div className="">
              <label htmlFor="" className="relative left-[16px]  bottom-[10px]  text-[12px]">Doctor Name*</label>
                <input
                  type="text"
                  className="w-[103%] border-2 border-slate-600 rounded-full"
                  placeholder="Doctor Name "
                  value={drname}
                  onChange={(e) => setDrname(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-[125%] place-items-center ">

              <div className="w-[80%] px-3">
              <label htmlFor="" className="relative left-[4px]  bottom-[10px]  text-[12px]">Brand1*</label>
                <Select
                  className="w-[100%] border-1 border-slate-600"
                  isMulti
                  options={logoOptions}
                  value={selectedOptionsFirst}
                  onChange={handleSelectChangeFirst}
                  components={{ Option: CustomOption }}
                />
              </div>
              <div className="w-[80%] px-3">
              <label htmlFor="" className="relative left-[4px]  bottom-[10px]  text-[12px]">Brand2*</label>
                <Select
                  className="w-[100%] border-1 border-slate-600"
                  isMulti
                  options={logoOptions}
                  value={selectedOptionsSecond}
                  onChange={handleSelectChangeSecond}
                  components={{ Option: CustomOption }}
                />
              </div>
              <div className="relative top-[85px]">
                <button
                  className=" shadow-lg shadow-black bg-[#ef8018] text-white pt-[10px] pb-[10px] pl-[20px] pr-[20px]  rounded-lg"
                  // onClick={(e) => Submit(e)}
                  onClick={openPopup}
                >
                  Submit
                </button>
              </div>
            </div>
            </div>
          </div>
        </div>
      )}
      {isPopupVisible && (
        <div className="popup ">
          <div>
            <div>
              <div className="">
              <div onClick={closePopup}
                  style={{ backgroundColor: "#F58420", color: "white" }}
                  className="p-3 drop-shadow-lg relative top-[102px] left-[301px]   h-10 w-10   rounded-full "
                >
                  <RxCross1  />
                </div>
              </div>
              <ThankyouPreview2
                selectedOptionsFirst={selectedOptionsFirst}
                selectedOptionsSecond={selectedOptionsSecond}
                drname={drname}
                image={image}
                name={name}
                MRID={MRID}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ThankyouForm2;
