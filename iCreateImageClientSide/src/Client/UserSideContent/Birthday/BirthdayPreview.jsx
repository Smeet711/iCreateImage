import React from "react";


import jsPDF from "jspdf";

import * as htmlToImage from 'html-to-image';
import { IoMdArrowRoundBack } from "react-icons/io";
import { NavLink } from "react-router-dom";

const BirthdayPreview = ({ image, canvas, name, drname, MRID }) => {
  const customstyles = {
    // backgroundColor: "red",
    backgroundImage: `url(http://localhost:3000/${image})`,
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",

    // Add other background properties if necessary
  };

  const handleUserData = () => {
    const requestBody = {
      MRID,
      type: "birthdaygreeting",
      drname: drname,
      name,
    };

    fetch("https://icreate-user-backend.onrender.com/api/create-birthday", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.msg);
        if (data.msg === "Birthday card category created successfully") {
          // alert("Card Created");
        } else {
          alert("Error");
        }
      });
  };


  //   const input = document.getElementById("divToPrint");
  //   handleUserData();
  //   if (input) {
  //     domtoimage
  //       .toPng(input)
  //       .then((dataUrl) => {
  //         const img = new Image();
  //         img.src = dataUrl;

  //         // Calculate the aspect ratio
  //         const aspectRatio = img.width / img.height;

  //         // Set the PDF orientation to landscape
  //         const pdf = new jsPDF({ orientation: "portrait", format: "a4" });

  //         // Set the width and height to 100% based on aspect ratio
  //         const pdfWidth = pdf.internal.pageSize.getWidth();
  //         const pdfHeight = pdf.internal.pageSize.getHeight();

  //         pdf.addImage(img, "JPEG", 0, 0, pdfWidth, pdfHeight);

  //         // Set a timeout to ensure that the image is added to the PDF before saving
  //         setTimeout(() => {
  //           pdf.save(`${drname}_Birthday.pdf`);
  //         }, 100); // Adjust the timeout as needed
  //       })
  //       .catch((error) => {
  //         console.error("Error generating PDF:", error);
  //       });
  //   } else {
  //     console.error(
  //       "Element with id 'divToPrint' not found or content not loaded."
  //     );
  //   }
  // };







  const printDocument = () => {
    const input = document.getElementById("divToPrint");
    handleUserData();
  
    if (input) {
      const scaleFactor = 1; // Adjust the scale factor as needed
  
      htmlToImage
        .toPng(input, { width: input.offsetWidth * scaleFactor, height: input.offsetHeight * scaleFactor, })
        .then((dataUrl) => {
          const img = new Image();
          img.src = dataUrl;
  
          const pdf = new jsPDF({
            orientation: "portrait",
            format: "a4",
            unit: "mm",
            precision: 10,
            floatPrecision: 16,
          });
  
          const pdfWidth = pdf.internal.pageSize.getWidth();
          console.log(pdfWidth);
          const pdfHeight = pdf.internal.pageSize.getHeight();
          console.log(pdfHeight);
  
          pdf.addImage(img, "PNG", 0, 0, pdfWidth, pdfHeight);
  
          // Set a timeout to ensure that the image is added to the PDF before saving
          setTimeout(() => {
            pdf.save(`${drname}_Birthday.pdf`);
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
    <div className="md:w-[794px] sm:h-[1123px]  h-[763px] m-auto">
      <div className="w-[100%] flex justify-center pt-[20px]">
      <div className="flex flex-row justify-between items-center relative top-[-24px]">
            <NavLink className="p-5 flex relative left-[-36px] " to={``}>
              <div
                style={{ backgroundColor: "", color: "white" }}
                className="p-3 drop-shadow-lg    h-10 w-10   rounded-full "
              >
                {/* <IoMdArrowRoundBack /> */}
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
        className="flex justify-center items-center flex-col md:w-full md:h-full w-auto h-[80%] "
        style={customstyles}
      >
        {
          <>
            
            {canvas && (
              <div className="sm:w-[300px] w-[200px] relative">
                <img
                  src={canvas.toDataURL()}
                  alt=""
                  className="w-full"
                  style={{
                   
                  }}
                />
                <div className="md:w-[500px] relative md:left-[-90px] left-[2px]">
                 <h1
              className="relative font-bold uppercase md:text-4xl text-2xl text-center mt-[30px] text-black"
              
            >
              
              {drname}
            </h1>
            </div>
              </div>
            )}
          
          </>
        }
      </div>
    </div>
  );
};

export default BirthdayPreview;
