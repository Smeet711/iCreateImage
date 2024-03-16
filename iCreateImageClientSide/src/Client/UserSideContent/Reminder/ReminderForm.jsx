import React, { useEffect } from "react";
import Select from "react-select";
import { useState } from "react";
import { components } from "react-select";
import { RxCross1 } from "react-icons/rx";
import ReminderPreview from "./ReminderPreview";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import "../../Login.css";
import { IoMdArrowRoundBack } from "react-icons/io";

function ReminderForm() {
  const { MRID, id, image, name } = useParams();
  const [logoOptions, setLogoOptions] = useState([]);
  const [selectedOptionsFirst, setSelectedOptionsFirst] = useState([]);
  const [selectedOptionsSecond, setSelectedOptionsSecond] = useState([]);
  const [selectedOptionsThird, setSelectedOptionsThird] = useState([]);
  const [selectedOptionsFourth, setSelectedOptionsFourth] = useState([]);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [isSubmitVisible, setSubmitVisible] = useState(true);
  const [drname, setDrname] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://icreate-admin-backend.onrender.com/reminder-logo-name-id", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setLogoOptions(data));
  }, []);

  console.log({ logoOptions });

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
  const handleSelectChangeThird = (selectedValues) => {
    // Limit the selection to one checkbox
    if (selectedValues.length > 1) {
      alert("You can only select one option for the third image.");
    } else {
      setSelectedOptionsThird(selectedValues);
    }
  };
  const handleSelectChangeFourth = (selectedValues) => {
    // Limit the selection to one checkbox
    if (selectedValues.length > 1) {
      alert("You can only select one option for the fourth image.");
    } else {
      setSelectedOptionsFourth(selectedValues);
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
    navigate(`/client/clientreminder/${MRID}`); // replace 'username' with the actual username
  };

  return (
    <>
      {isSubmitVisible && (
        <div className="w-[100%] h-screen  text-center flex justify-center items-center relative top-[34px] ">
          <div className="lg:w-[45%] md:w-[70%]  w-[90%] h-[95%]    rounded-3xl flex flex-col justify-center items-center absolute">
            <div className="flex flex-row justify-between items-center relative top-[-24px] left-[-11px]">
              <NavLink className="p-5 flex relative left-[-36px] " to={``}>
                <div
                  style={{ backgroundColor: "#F58420", color: "white" }}
                  className="p-3 drop-shadow-lg    h-10 w-10   rounded-full "
                >
                  <IoMdArrowRoundBack />
                </div>
              </NavLink>
              <div className="text-black text-[20px] font-bold relative left-[-18px]  ">
                <p>Reminder Card </p>
              </div>
            </div>

            <div className="font-bold text-[9px] top-[-22px] relative left-[1px] text-[rgba(158,156,158,1)] ">
              <p>Please fill the form to design your Invitation Card.</p>
            </div>

            <div className="w-[100%] h-[80%] flex flex-col items-center justify-center gap-5 m-auto relative top-[-58px]">
              <div className="">
              <label htmlFor="" className="relative left-[-92px]  bottom-[10px]  text-[12px]">Doctor Name*</label>
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
                <label htmlFor="" className="relative left-[-114px]  bottom-[10px]  text-[12px]">Brand1*</label>
                <div className="rounded-full">
                  <Select
                    className="w-[100%] border-1 border-slate-600 "
                    isMulti
                    options={logoOptions}
                    value={selectedOptionsFirst}
                    onChange={handleSelectChangeFirst}
                    components={{ Option: CustomOption }}
                  />
                   </div>
                </div>

                <div className="w-[80%] px-3">
                <label htmlFor="" className="relative left-[-114px]  bottom-[10px]  text-[12px]">Brand1*</label>
                  <Select
                    className="w-[100%] border-1 border-slate-600 rounded-full"
                    isMulti
                    options={logoOptions}
                    value={selectedOptionsSecond}
                    onChange={handleSelectChangeSecond}
                    components={{ Option: CustomOption }}
                  />
                </div>

                <div className="w-[80%] px-3">
                <label htmlFor="" className="relative left-[-114px]  bottom-[10px]  text-[12px]">Brand1*</label>
                  <Select
                    className="w-[100%] border-1 border-slate-600 rounded-full"
                    isMulti
                    options={logoOptions}
                    value={selectedOptionsThird}
                    onChange={handleSelectChangeThird}
                    components={{ Option: CustomOption }}
                  />
                </div>

                <div className="w-[80%] px-3">
                <label htmlFor="" className="relative left-[-114px]  bottom-[10px]  text-[12px]">Brand1*</label>
                  <Select
                    className="w-[100%] border-1 border-slate-600 rounded-full"
                    isMulti
                    options={logoOptions}
                    value={selectedOptionsFourth}
                    onChange={handleSelectChangeFourth}
                    components={{ Option: CustomOption }}
                  />
                </div>
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
      )}
      {isPopupVisible && (
        <div className="popup ">
          <div>
            <div>
            <div onClick={closePopup}
                  style={{ backgroundColor: "#F58420", color: "white" }}
                  className="p-3 drop-shadow-lg relative top-[102px] left-[301px]   h-10 w-10   rounded-full "
                >
                  <RxCross1  />
                </div>

              <ReminderPreview
                selectedOptionsFirst={selectedOptionsFirst}
                selectedOptionsSecond={selectedOptionsSecond}
                selectedOptionsThird={selectedOptionsThird}
                selectedOptionsFourth={selectedOptionsFourth}
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
}

export default ReminderForm;
