import React from "react";
import jsPDF from "jspdf";
import axios from "axios";
import { IoMdArrowRoundBack } from "react-icons/io";
// import domtoimage from "dom-to-image";
import * as htmlToImage from "html-to-image";
import { NavLink, useParams } from "react-router-dom";

function InvitationPreview({
  doctor,
  topic,
  speaker,
  day,
  date,
  time,
  hotelname,
  hoteladd,
  MRID,
  image,
  name,
  id,
}) {
  const type = "invitation";

  const customstyles = {
    // backgroundColor: "red",
    backgroundImage: `url(http://localhost:3000/${image})`,
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",

    // Add other background properties if necessary
  };

  // const {id} = useParams()

  async function Submit() {
    const formattedDate = new Date(date).toLocaleDateString("en-GB");
    console.log(formattedDate);
    try {
      const apiEndpoint =
        "https://icreate-user-backend.onrender.com/api/create-invitation"; // Replace with your API endpoint
      const requestBody = {
        MRID,
        type: "invitation",
        brandName: name,
        drName: doctor,
        topic,
        speakerName: speaker,
        day,
        date,
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
        .toPng(input, {
          width: input.offsetWidth * scaleFactor,
          height: input.offsetHeight * scaleFactor,
        })
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
          const pdfHeight = pdf.internal.pageSize.getHeight();

          pdf.addImage(img, "PNG", 0, 0, pdfWidth, pdfHeight);

          // Set a timeout to ensure that the image is added to the PDF before saving
          setTimeout(() => {
            pdf.save(`${doctor}_Reminder.pdf`);
          }, 1000);
        })
        .catch((error) => {
          console.error("Error generating PDF:", error);
        });
    } else {
      console.error(
        "Element with id 'divToPrint' not found or content not loaded."
      );
    }
  };

  const timeWithoutOnwards = time.replace(" onwards", "");

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
          className="flex justify-center items-center m-auto md:w-full h-full w-[340px] text-xl"
          style={customstyles}
        >
          <div className="md:w-[350px] relative md:top-[-261px]  md:left-[463px] top-[-178px] left-[409px] w-[200px] text-sm md:text-xl">
            <h1 className="text-center md:w-[350px] w-[200px]">{doctor}</h1>
          </div>

          <div className="w-auto relative md:top-[-151px] md:left-[231px] top-[-100px] left-[260px] text-sm md:text-xl">
            <h1 className="text-center w-auto whitespace-nowrap overflow-hidden ">
              {topic}
            </h1>
          </div>

          <div className="relative md:top-[-101px] md:left-[46px] text-sm md:text-xl top-[-68px] left-[84px] ">
            <p className="text-center md:w-[200px] w-[150px]">{speaker}</p>
          </div>

          <div className=" md:w-[250px] relative md:top-[-19px] md:left-[-254px] text-sm md:text-xl w-[200px] top-[-15px] left-[-71px] ">
            <p className="text-center capitalize ">{day}</p>
          </div>

          <div className=" relative md:top-[-21px] md:left-[-40px] top-[-14px] left-[-29px] text-sm md:text-xl ">
            <p className="text-center w-[114px] ">{date}</p>
          </div>

          <div className="relative md:top-[29px] md:left-[-292px] text-sm md:text-xl top-[21px] left-[-179px] ">
            <p className="text-center ">
              {timeWithoutOnwards}
              {/* "time Onwords" */}
            </p>
          </div>

          <div className="relative md:top-[126px] w-auto  md:left-[-369px] text-sm md:text-xl top-[87px] left-[-264px]">
            <h1 className="text-center w-auto whitespace-nowrap overflow-hidden">
              {hotelname}
            </h1>
          </div>

          <div className="relative md:top-[224px] md:left-[-571px] top-[152px] whitespace-break-spaces left-[-344px] md:w-56 text-sm md:text-xl w-[200px] ">
            <h1 className="md:w-56 w-[200px] leading-7">{hoteladd}</h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default InvitationPreview;
