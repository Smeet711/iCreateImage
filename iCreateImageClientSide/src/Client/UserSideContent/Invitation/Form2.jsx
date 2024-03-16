import React, { useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import InvitationPreview2 from "./InvitationPreview2";
import "../../Login.css";
import { IoMdArrowRoundBack } from "react-icons/io";

import { format } from "date-fns";

function Form2() {
  const customStyles = {
    // backgroundImage:
    //   'url("https://images.pexels.com/photos/4838512/pexels-photo-4838512.jpeg?auto=compress&cs=tinysrgb&w=600")',
    // backgroundSize: "100% 100%",
    // backgroundRepeat: "no-repeat",
  };

  const { id, image, name, MRID } = useParams();

  const [doctor, setDoctor] = useState("");
  const [topic, setTopic] = useState("");
  const [speaker, setSpeaker] = useState("");
  const [day, setDay] = useState("");
  const [date, setDate] = useState();
  const [time, setTime] = useState("");
  const [hotelname, setHotelname] = useState("");
  const [hoteladd, setHoteladd] = useState("");

  const [Year, setYear] = useState();
  const [Month, setMonth] = useState();
  const [Days, setDays] = useState();

  const [isPopupVisible, setPopupVisible] = useState(false);
  const [isSubmitVisible, setSubmitVisible] = useState(true);

  const navigate = useNavigate();

  const backtotempl = () => {
    navigate(`/client/clientinvitation/${MRID}`);
  };

  const openPopup = () => {
    setPopupVisible(true);
    setSubmitVisible(false);
  };

  const closePopup = () => {
    setPopupVisible(false);
    setSubmitVisible(true);
  };

  // console.log("date: ", date);

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;

    // Split the date into parts (year, month, day)
    const [selectedYear, selectedMonth, selectedDay] = selectedDate.split("-");

    // Update states
    setYear(selectedYear);
    setMonth(selectedMonth);
    setDays(selectedDay);
  };

  return (
    <>
      {isSubmitVisible && (
        <div
          className="w-[100%] h-screen  text-center flex justify-center items-center relative top-[24px]  "
          style={customStyles}
        >
          <div className="lg:w-[45%] md:w-[70%]  w-[90%] h-[95%]   rounded-3xl flex flex-col justify-center items-center absolute">
            <div className="flex flex-row justify-between items-center relative top-[-24px]">
              <NavLink className="p-5 flex relative left-[-36px] " to={``}>
                <div
                  style={{ backgroundColor: "#F58420", color: "white" }}
                  className="p-3 drop-shadow-lg    h-10 w-10   rounded-full "
                >
                  <IoMdArrowRoundBack />
                </div>
              </NavLink>
              <div className="text-black text-[20px] font-bold relative left-[-25px]  ">
                <p>Invitation Card </p>
              </div>
            </div>

            <div className="font-bold text-[9px] top-[-20px] relative left-[1px] text-[rgba(158,156,158,1)] ">
              <p>Please select your preferable design templates.</p>
            </div>
            <div className="w-[100%]  lg:pt-0 ">
              <label
                htmlFor=""
                className="relative left-[-109px]  bottom-[10px]  text-[12px]"
              >
                Doctor Name*
              </label>
              <div className="">
                <input
                  className="w-[103%] h-[40px]  border-slate-400 rounded-full"
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Doctor Name"
                  onChange={(e) => {
                    setDoctor(e.target.value);
                  }}
                  required
                />
              </div>
              <label
                htmlFor=""
                className="relative left-[-131px] text-left  text-[12px]"
              >
                Topic*
              </label>
              <div className=" pt-[10px]">
                <input
                  className="w-[103%] h-[40px]  border-slate-400 rounded-full"
                  type="text"
                  id="topic"
                  name="topic"
                  placeholder=" Topic"
                  onChange={(e) => {
                    setTopic(e.target.value);
                  }}
                  required
                />
              </div>
              <label
                htmlFor=""
                className="relative left-[-134px] text-left  text-[12px] "
              >
                Day*
              </label>
              <div className=" pt-[10px]">
                <select
                  className="w-[103%] h-[40px]  border-slate-400 rounded-full"
                  onChange={(e) => {
                    setDay(e.target.value);
                  }}
                  id="time"
                  name="time"
                  required
                >
                  <option value="" className="opacity-1">
                    Day
                  </option>
                  <option value="monday">Monday</option>
                  <option value="tuesday">Tuesday</option>
                  <option value="wednesday">Wednesday</option>
                  <option value="thursday">Thursday</option>
                  <option value="friday">Friday</option>
                  <option value="saturday">Saturday</option>
                  <option value="sunday">Sunday</option>
                </select>
              </div>

              {/* // all three in one date month year  */}
              <label
                htmlFor=""
                className="relative left-[-116px] text-left  text-[12px] top-[-3px]"
              >
                Select Date*
              </label>
              <input
                className="w-[103%] h-[40px] border-slate-400 rounded-full"
                type="date"
                id="date"
                name="date"
                placeholder="Date"
                onChange={handleDateChange}
                required
              />
              {/* //  */}
              <label
                htmlFor=""
                className="relative left-[-113px] text-left  text-[12px]"
              >
                Select Time*
              </label>

              <div className="pt-[10px]">
                <select
                  className="w-[103%] h-[40px] border-slate-400 rounded-full"
                  id="time"
                  name="time"
                  onChange={(e) => {
                    setTime(e.target.value);
                  }}
                  required
                >
                  <option value="" disabled selected hidden>
                    Select Time
                  </option>
                  <option value="10:00am onwards">10:00am</option>
                  <option value="10:30am onwards">10:30am</option>
                  <option value="11:00am onwards">11:00am</option>
                  <option value="11:30am onwards">11:30am</option>
                  <option value="12:00pm onwards">12:00pm</option>
                  <option value="12:30pm onwards">12:30pm</option>
                  <option value="01:00pm onwards">01:00pm</option>
                  <option value="01:30pm onwards">01:30pm</option>
                  <option value="02:00pm onwards">02:00pm</option>
                  <option value="02:30pm onwards">02:30pm</option>
                  <option value="03:00pm onwards">03:00pm</option>
                  <option value="03:30pm onwards">03:30pm</option>
                  <option value="04:00pm onwards">04:00pm</option>
                  <option value="04:30pm onwards">04:30pm</option>
                  <option value="05:00pm onwards">05:00pm</option>
                  <option value="05:30pm onwards">05:30pm</option>
                  <option value="06:00pm onwards">06:00pm</option>
                  <option value="06:30pm onwards">06:30pm</option>
                  <option value="07:00pm onwards">07:00pm</option>
                  <option value="07:30pm onwards">07:30pm</option>
                  <option value="08:00pm onwards">08:00pm</option>
                  <option value="08:30pm onwards">08:30pm</option>
                  <option value="09:00pm onwards">09:00pm</option>
                  <option value="09:30pm onwards">09:30pm</option>
                </select>
              </div>
              <label
                htmlFor=""
                className="relative left-[-111px] text-left  text-[12px]"
              >
                Hotel Name*
              </label>
              <div className=" pt-[10px]">
                <input
                  className="w-[103%] h-[40px]  border-slate-400 rounded-full"
                  type="text"
                  id="hotel"
                  name="hotel"
                  placeholder=" Hotel Name"
                  onChange={(e) => {
                    setHotelname(e.target.value);
                  }}
                  required
                />
              </div>
              <label
                htmlFor=""
                className="relative left-[-107px] text-left  text-[12px]"
              >
                Hotel Address*
              </label>
              <div className=" pt-[10px] ">
              <textarea
                  className="w-[103%] h-[40px]  border-slate-400 rounded-full"
                  type="text"
                  id="address"
                  name="address"
                  placeholder="Hotel Address"
                  onChange={(e) => {
                    setHoteladd(e.target.value);
                  }}
                ></textarea>
              </div>
              <div className="pt-6 ">
                <button
                  className=" w-[40%] shadow-lg shadow-black bg-[#ef8018] text-white font-f h-[50px] rounded-lg"
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

              <InvitationPreview2
                name={name}
                MRID={MRID}
                doctor={doctor}
                topic={topic}
                speaker={speaker}
                day={day}
                // date={date}
                time={time}
                hotelname={hotelname}
                hoteladd={hoteladd}
                image={image}
                year={Year} // Pass the year state
                month={Month} // Pass the month state
                days={Days} // Pass the days state
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Form2;
