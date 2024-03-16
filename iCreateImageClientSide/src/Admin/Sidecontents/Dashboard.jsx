import React, { useEffect, useState } from "react";

function Dashboard() {
  const [cardCount, setCardCount] = useState([]);

  useEffect(() => {
    fetch("https://icreate-user-backend.onrender.com/api/all-card-count")
      .then((res) => res.json())
      .then((data) => setCardCount(data));
  }, []);

  return (
    <>
      <div className="w-[100%]" id="dashboard">
        <div className="py-4">
          <h1 className="text-5xl text-center  font-extrabold opacity-50">
            Admin Panel
          </h1>
        </div>
       

        <div className="grid place-items-center md:py-[70px] text-white text-3xl text-center">
          <div className="w-[90%]">
            <div className="grid md:grid-cols-3 md:grid-rows-2 gap-8">
              <div className=" h-[135px] rounded-xl grid place-items-center bg-[#3366ff]">
                <div>
                  <h1>INVITATION</h1>
                  <h1>{cardCount.invitation}</h1>
                </div>
              </div>
              <div className=" h-[135px] rounded-xl grid place-items-center bg-[#993399]">
                <div>
                  <h1>POSTER</h1>
                  <h1>{cardCount.poster}</h1>
                </div>
              </div>
              {/* <div className=" h-[135px] rounded-xl grid place-items-center bg-[#cc3300]">
                <div>
                  <h1>Calender</h1>
                  <h1>{cardCount.calender}</h1>
                </div>
              </div> */}
              <div className=" h-[135px] rounded-xl grid place-items-center bg-[#99cc00]">
                <div>
                  <h1>Thank You Card</h1>
                  <h1>{cardCount.thankyou}</h1>
                </div>
              </div>
              <div className=" h-[135px] rounded-xl grid place-items-center bg-[#ff9900]">
                <div>
                  <h1>Reminder Card</h1>
                  <h1>{cardCount.remindercard}</h1>
                </div>
              </div>
              <div className=" h-[135px] rounded-xl grid place-items-center bg-[#ff0066]">
                <div>
                  <h1>Birthday Greeting</h1>
                  <h1>{cardCount.birthdaygreeting}</h1>
                </div>
              </div>
              <div className=" h-[135px] rounded-xl grid place-items-center bg-[#ff0066]">
                <div>
                  <h1>Certificate</h1>
                  <h1>{cardCount.certificate}</h1>
                </div>
              </div>
              <div className=" h-[135px] rounded-xl grid place-items-center bg-[#ff0066]">
                <div>
                  <h1>Anniversary</h1>
                  <h1>{cardCount.anniversary}</h1>
                </div>
              </div>



            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
