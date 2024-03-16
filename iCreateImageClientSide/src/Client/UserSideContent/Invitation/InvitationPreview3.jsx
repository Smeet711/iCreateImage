import React from "react";

import { useState,useEffect } from "react";

import jsPDF from "jspdf";
import * as htmlToImage from 'html-to-image';
import { IoMdArrowRoundBack } from "react-icons/io";
import { NavLink } from "react-router-dom";


function InvitationPreview3({ image, doctor, MRID, topic, year, month, days,hotelname,hoteladd }) {
  const [inPrintMode, setInPrintMode] = useState(false);
  const customstyles = {
    // backgroundColor: "red",
    backgroundImage: `url(http://localhost:3000/${image})`,
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",

    // Add other background properties if necessary
  };
  const [showOneLine, setShowOneLine] = useState(true);

  useEffect(() => {
    // Add logic to determine when to switch to the next line
    // For example, you might want to switch to the next line after a certain number of characters.

    if (hoteladd.length > 10) {
      setShowOneLine(false);
    }
  }, [hoteladd]);

  const type = "invitation";

  async function Submit() {
    const formattedDate = new Date(date).toLocaleDateString("en-GB");
    date = days + "/" + month + "/" + year;
    alert(date);
    // console.log(formattedDate);
    try {
      const apiEndpoint = "http://localhost:4000/api/create-invitation"; // Replace with your API endpoint
      const requestBody = {
        MRID,
        type: "invitation",
        
        doctor: doctor,
        topic,
        speakerName: speaker,
       
        // date,
        time,
        hotelName: hotelname,
        hotelAddress: hoteladd,
      };

      console.log("req.body: ", requestBody);

      const response = await axios.post(apiEndpoint, requestBody);

      // Handle the API response as needed
      if (
        response.data.msg === "Invitation card category created successfully"
      ) {
        // alert("Card Created");
      } else alert("Error");
    } catch (error) {
      // Handle errors
      console.error("Error:", error);
    }
  }
  const printDocument = () => {
    const input = document.getElementById("divToPrint");
    Submit();
  
    if (input) {
      const scaleFactor = 1; // Adjust the scale factor as needed
  
      htmlToImage
        .toPng(input, { width: input.offsetWidth * scaleFactor, height: input.offsetHeight * scaleFactor })
        .then((dataUrl) => {
          const img = new Image();
          img.src = dataUrl;
  
          const pdf = new jsPDF({
            orientation: "landscape",
            format: "a4",
            unit: "mm",
            precision: 10,
            floatPrecision: 16,
          });
  
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = pdf.internal.pageSize.getHeight();
  
          pdf.addImage(img, "PNG", 0, 0, pdfWidth, pdfHeight);
  
          // Set a timeout to ensure that the image is added to the PDF before saving
          setTimeout(() => {
            pdf.save(`${doctor}_Invitation.pdf`);
          }, 1000);
        })
        .catch((error) => {
          console.error("Error generating PDF:", error);
        });
    } else {
      console.error("Element with id 'divToPrint' not found or content not loaded.");
    }
  };
  return (
    <>
      <div className="md:w-[794px] sm:h-[1123px]  h-[763px] m-auto">
        <div className="w-[100%] flex justify-center pt-[20px]">
        <div className="flex flex-row justify-between items-center relative top-[-24px]">
              <NavLink
                className="p-5 flex relative left-[-36px] "
                to={``}
              >
                <div
                  style={{ backgroundColor: "#F58420", color: "white" }}
                  className="p-3 drop-shadow-lg    h-10 w-10   rounded-full "
                >
                  <IoMdArrowRoundBack />
                </div>
              </NavLink>
              <div className="text-black text-[20px] font-bold relative left-[-38px]  ">
                <button
            onClick={printDocument}
            type="button"
            class="text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 me-2 mb-2"
          >
            <svg
              class="w-5 h-5 me-2 -ms-1"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14l-4-4h8l-4 4zm-4-4h8V7h-8v5z"
              ></path>
            </svg>
            Generate PDF
          </button>
              </div>
            </div>
        </div>
        <div
          id="divToPrint"
          className="flex justify-center items-center m-auto md:w-full md:h-full h-[400px]"
          style={customstyles}
        >
          <div className="md:w-[350px] w-[300px] relative md:top-[-244px] top-[-91px] left-[395px]  md:left-[482px] text-sm md:text-xl    ">
            <h1 className="text-center md:w-[350px] w-[300px]  ">{doctor}</h1>
          </div>
          <div className="md:w-[350px] w-[349px] relative md:top-[-46px] top-[-18px]  md:left-[123px] left-[70px] text-sm md:text-xl    ">
            <h1 className="text-center md:w-[350px] w-[349px]   ">{topic}</h1>
          </div>

          <div className=" md:w-[150px] w-[150px] md:text-5xl text-2xl font-bold text-orange-400  flex  justify-between  relative md:top-[17px] top-[10px] left-[-204px] md:left-[-190px] text-center">
            <p className="mr-[30px] relative">{days}</p>
            <p className="mr-[30px]  relative ">{month}</p>

            <p className=" relative">{year}</p>
          </div>
          <div className="relative md:top-[163px] top-[56px] w-auto md:left-[337-px] left-[-333px] text-sm md:text-xl">
            <h1 className="text-center w-auto whitespace-nowrap overflow-hidden ">
              {hotelname}
            </h1>
          </div>

          <div className="relative md:top-[305px] md:left-[-453px] top-[94px] whitespace-break-spaces left-[-414px] md:w-[350px] text-sm md:text-xl w-[180px] ">
            <h1 className="md:w-[350px] w-[180px] leading-7  md:leading-[70px]">{hoteladd}</h1>
          </div>

        </div>
      </div>
    </>
  );
}

export default InvitationPreview3;
