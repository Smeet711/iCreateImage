import React from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import * as htmlToImage from 'html-to-image';
import { IoMdArrowRoundBack } from "react-icons/io";
import { NavLink } from "react-router-dom";

function PosterPreview({ MRID, image, canvas, doctorName, topic, name }) {
  console.log(image);

  const customstyles = {
    // backgroundColor: "red",
    backgroundImage: `url(http://localhost:3000/${image})`,
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",

    // Add other background properties if necessary
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
  //           pdf.save(`${doctorName}_Poster.pdf`);
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

      html2canvas(input, { scale: scaleFactor })
        .then((canvas) => {
          const dataUrl = canvas.toDataURL("image/png");

          const pdf = new jsPDF({
            orientation: "portrait",
            unit: "mm",
            precision: 10,
            floatPrecision: 16,
          });

          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = pdf.internal.pageSize.getHeight();

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
                pdf.save(`${doctorName}_Poster.pdf`);
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

  const handleUserData = () => {
    const requestBody = {
      MRID,
      type: "poster",
      topic,
      drname: doctorName,
      brandName: name,
    };

    fetch("http://localhost:4000/api/create-poster", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.msg);
        if (data.msg === "Poster card category created successfully") {
          // alert("Card Created");
        } else {
          alert("Error");
        }
      });
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
          className="flex justify-center items-center m-auto w-full h-[80%]"
          style={customstyles}
        >
          <div className="flex justify-between  relative md:bottom-[-404px] bottom-[-206
            px] top-[200px]  ">
            <div className=" relative md:w-[270px] md:left-[-39px] md:top-[132px]  top-[23px] left-[-3px] w-[120px] h-[151px] md:h-[228px]">
              {canvas && (
                <img
                  className="w-full h-full"
                  src={canvas.toDataURL()}
                  alt="IMAGE-DOCTOR"
                />
              )}
            </div>
            <div className="md:w-[400px] w-[200px] flex flex-col justify-center relative md:left-[-12px] left-[8px] md:top-[168px] top-[57px] ">
              <h1 className="md:text-4xl text-lg capitalize  md:mb-[10px] mb-[-6px] font-bold text-yellow-300">
                {doctorName}
              </h1>

              <h1 className="text-sm font-bold text-yellow-300">{topic}</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PosterPreview;
