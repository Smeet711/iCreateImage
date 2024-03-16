import React, { useRef } from "react";

import html2canvas from "html2canvas";

import jsPDF from "jspdf";
import { NavLink } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import * as htmlToImage from "html-to-image";

function ReminderPreview({
  selectedOptionsFirst,
  selectedOptionsSecond,
  selectedOptionsThird,
  selectedOptionsFourth,
  drname,
  image,
  name,
  MRID,
}) {
  const customstyles = {
    backgroundImage: `url(http://localhost:3000/${image})`,
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",
  };

  function handleDataSubmit() {
    const requestBody = {
      MRID,
      drname,
      type: "reminder",
      brandName: name,
    };

    fetch("https://icreate-user-backend.onrender.com/api/create-reminder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.msg);
        if (data.msg === "Reminder card category created successfully") {
          // alert("Card Created");
        } else {
          alert("Error");
        }
      });
  }

  const printDocument = () => {
    const input = document.querySelector("#divToPrint");
    handleDataSubmit();

    if (input) {
      const scaleFactor = 1;

      html2canvas(input, { scale: scaleFactor, quality: 1, dpi: 300 })
        .then((canvas) => {
          const dataUrl = canvas.toDataURL("image/png");

          const pdf = new jsPDF({
            orientation: "portrait",
            unit: "mm",
            precision: 10,
            floatPrecision: 16,
          });

          const pdfWidth = pdf.internal.pageSize.getWidth();
          console.log(pdfWidth);
          const pdfHeight = pdf.internal.pageSize.getHeight();
          console.log(pdfHeight);

          // Draw the background image
          pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);

          // Set a timeout to ensure that the content is added to the PDF after the background image
          setTimeout(() => {
            // Draw the content on top of the background image
            htmlToImage
              .toPng(input, {
                width: input.offsetWidth * scaleFactor,
                height: input.offsetHeight * scaleFactor,
              })
              .then((contentDataUrl) => {
                const contentImg = new Image();
                contentImg.src = contentDataUrl;

                pdf.addImage(contentImg, "PNG", 0, 0, pdfWidth, pdfHeight);

                // Save the PDF
                pdf.save(`${drname}_Reminder.pdf`);
              })
              .catch((error) => {
                console.error("Error generating content image:", error);
              });
          }, 1000);
        })
        .catch((error) => {
          console.error("Error generating background image:", error);
        });
    } else {
      console.error(
        "Element with id 'divToPrint' not found or content not loaded."
      );
    }
  };

  return (
    <>
      <div className="md:w-[794px] sm:h-[1123px]  h-[763px] m-auto">
        <div className="w-[100%] flex justify-center pt-[20px]">
        <div className="flex flex-row justify-between items-center relative top-[-24px]">
            <NavLink className="p-5 flex relative left-[-36px] " to={``}>
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
          className="flex justify-center items-center flex-col md:w-full md:h-full w-auto "
          style={customstyles}
        >
          {/* <img src={`https://icreate-admin-backend.onrender.com/${image}`} alt="" /> */}

          {
            <>
              <h1 className="text-center   md:font-bold font-bold relative  md:text-4xl md:top-[-44px]   text-xl md:left-[-30px] left-[3px] top-[109px]  ">
                {drname}
              </h1>
              <div className="w-[300px] h-[500px] flex flex-col justify-center items-center md:top-[160px]  relative top-[50px]   ">
                {selectedOptionsFirst.map((slt) => (
                  <div className=" md:mb-[90px] mb-[40px] md:w-auto w-[130px]">
                    <img
                      src={`http://localhost:3000/${slt.image}`}
                      alt=""
                      className="w-full"
                    />
                  </div>
                ))}
                {selectedOptionsSecond.map((slt) => (
                  <div className="md:mb-[90px] mb-[40px]  md:w-auto w-[130px]">
                    <img
                      src={`http://localhost:3000/${slt.image}`}
                      alt=""
                      className="w-full"
                    />
                  </div>
                ))}

                {selectedOptionsThird.map((slt) => (
                  <div className=" md:mb-[90px] mb-[40px] md:w-auto w-[130px] ">
                    <img
                      src={`http://localhost:3000/${slt.image}`}
                      alt=""
                      className="w-full"
                    />
                  </div>
                ))}
                {selectedOptionsFourth.map((slt) => (
                  <div className=" md:mb-[90px] mb-[40px] md:w-auto w-[130px]">
                    <img
                      src={`http://localhost:3000/${slt.image}`}
                      alt=""
                      className="w-full"
                    />
                  </div>
                ))}
              </div>
            </>
          }
        </div>
      </div>
    </>
  );
}

export default ReminderPreview;
