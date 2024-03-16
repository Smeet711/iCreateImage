import React from "react";
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";
import * as htmlToImage from 'html-to-image';

function ThankyouPreview2({
  selectedOptionsFirst,
  selectedOptionsSecond,
  name,
  drname,
  image,
  MRID,
}) {
  console.log(image);

  const [inPrintMode, setInPrintMode] = useState(false);

  const customstyles = {
    // backgroundColor: "red",
    backgroundImage: `url(https://icreate-admin-backend.onrender.com/${image})`,
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",

    // Add other background properties if necessary
  };

  // const type = "certificate";

  function handleDataSubmit() {
    const requestBody = {
      MRID,
      type: "thankyou",
      drname,
      brandName: name,
    };

    fetch("https://icreate-user-backend.onrender.com/api/create-thankyou", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.msg);
        if (data.msg === "Thankyou card category created successfully") {
          // alert("Card Created");
        } else {
          alert("Error");
        }
      });
  }

  // const printDocument = () => {
  //   const input = document.getElementById("divToPrint");
  //   handleDataSubmit();

  //   // alert("Layout 2 is Under Development for Thankyou card");

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
  //           pdf.save(`${drname}_ThankYouCard.pdf`);
  //         }, 1000); // Adjust the timeout as needed
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
    handleDataSubmit();

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
                pdf.save(`${drname}_ThankYou.pdf`);
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

        <div
          id="divToPrint"
          className="flex justify-center items-center flex-col md:w-full md:h-full w-auto h-[100%]"
          style={customstyles}
        >
          <h1 className="text-center text-2xl font-semibold  uppercase relative sm:text-4xl md:top-[-40px] top-[-27px] ">
            {drname}
          </h1>

         
          <div className="w-[300px]  relative flex justify-center items-center flex-col md:top-[120px] top-[100px]">
            
            {selectedOptionsFirst.map((slt) => (
              <div className=" mb-[50px] md:w-full w-[100px] ">
                <img
                  src={`https://icreate-admin-backend.onrender.com/${slt.image}`}
                  alt=""
                  className="w-full"
                />
              </div>
            ))}
            {selectedOptionsSecond.map((slt) => (
              <div className="mb-[100px] md:w-full w-[100px]">
                <img
                  src={`https://icreate-admin-backend.onrender.com/${slt.image}`}
                  alt=""
                  className="w-full"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ThankyouPreview2;
