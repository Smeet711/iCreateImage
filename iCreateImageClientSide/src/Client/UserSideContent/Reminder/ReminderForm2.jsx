import React, { useEffect } from "react";
import Select from "react-select";
import { useState } from "react";
import { components } from "react-select";
import { RxCross1 } from "react-icons/rx";
import ReminderPreview2 from "./ReminderPreview2";
import { useNavigate, useParams } from "react-router-dom";

const ReminderForm2 = () => {
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
        <div className="w-[100%] h-screen bg-gray-100 flex justify-center items-center relative">
          <div className=" md:w-[60%] w-[90%] h-[99%] rounded-xl bg-white flex flex-col  items-center absolute">
            <button
              onClick={backtotempl}
              type="button"
              class="text-white absolute  border-none top-[50px] md:left-[10px] left-[-21px]   focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 "
            >
              <svg
                class="rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </button>
            <div class="bg-[#ef8018]  py-10 text-center w-full text-white">
              <p class="font-serif text-5xl font-semibold  uppercase">
                {name}
              </p>
              {/* <p class="text-center text-blue-100">Please keep it short and succinct</p> */}
            </div>

            <div className="w-[100%] h-[80%] flex flex-col items-center justify-center gap-10">
              <div className="w-[80%]">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-first-name"
                >
                  Doctor Name
                </label>
                <input
                  type="text"
                  className="w-[100%] border-2 border-slate-600 rounded-lg"
                  placeholder="Doctor Name "
                  value={drname}
                  onChange={(e) => setDrname(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-[80%] place-items-center ">
                <div className="w-[80%] px-3">
                  <p>BRAND1</p>
                  <Select
                    className="w-[100%] border-2 border-slate-600 rounded-lg"
                    isMulti
                    options={logoOptions}
                    value={selectedOptionsFirst}
                    onChange={handleSelectChangeFirst}
                    components={{ Option: CustomOption }}
                  />
                </div>

                <div className="w-[80%] px-3">
                  <p>BRAND2</p>
                  <Select
                    className="w-[100%] border-2 border-slate-600 rounded-lg"
                    isMulti
                    options={logoOptions}
                    value={selectedOptionsSecond}
                    onChange={handleSelectChangeSecond}
                    components={{ Option: CustomOption }}
                  />
                </div>

                <div className="w-[80%] px-3">
                  <p>BRAND3</p>
                  <Select
                    className="w-[100%] border-2 border-slate-600 rounded-lg"
                    isMulti
                    options={logoOptions}
                    value={selectedOptionsThird}
                    onChange={handleSelectChangeThird}
                    components={{ Option: CustomOption }}
                  />
                </div>

                <div className="w-[80%] px-3">
                  <p>BRAND4</p>
                  <Select
                    className="w-[100%] border-2 border-slate-600 rounded-lg"
                    isMulti
                    options={logoOptions}
                    value={selectedOptionsFourth}
                    onChange={handleSelectChangeFourth}
                    components={{ Option: CustomOption }}
                  />
                </div>
              </div>

              <div className="w-[100%] flex justify-center">
                <button
                  className="w-[150px] h-[40px]  bg-[#ef8018] rounded-lg shadow-lg uppercase text-white shadow-black "
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
              <button
                className="float-right pr-3 text-4xl"
                onClick={closePopup}
              >
                <RxCross1 />
              </button>

              <ReminderPreview2
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
};

export default ReminderForm2;
