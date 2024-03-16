import React, { useState, useCallback, useRef, useEffect } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import BirthdayPreview from "./BirthdayPreview";
import { RxCross1 } from "react-icons/rx";
import { useNavigate, useParams,NavLink } from "react-router-dom";
import "./birthday.css";
import { IoMdArrowRoundBack } from "react-icons/io";
import "../../Login.css";


function generateDownload(canvas, crop) {
  if (!crop || !canvas) {
    return;
  }

  canvas.toBlob(
    (blob) => {
      const previewUrl = window.URL.createObjectURL(blob);

      setCompletedCrop(previewUrl);
      const anchor = document.createElement("a");
      anchor.download = "cropPreview.png";
      anchor.href = URL.createObjectURL(blob);
      anchor.click();

      window.URL.revokeObjectURL(previewUrl);
    },
    "image/png",
    1
  );
}

function setCanvasImage(image, canvas, crop) {
  if (!crop || !canvas || !image) {
    return;
  }

  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  const ctx = canvas.getContext("2d");
  // refer https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio
  const pixelRatio = window.devicePixelRatio;

  canvas.width = crop.width * pixelRatio * scaleX;
  canvas.height = crop.height * pixelRatio * scaleY;

  // refer https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setTransform
  ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  ctx.imageSmoothingQuality = "high";

  // refer https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    crop.width * scaleX,
    crop.height * scaleY
  );
}

const BirthdayForm = () => {
  const { id, image, name, MRID } = useParams();
  const [upImg, setUpImg] = useState();
  const [drname, setDrname] = useState("");
  const navigate = useNavigate();

  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);

  const [crop, setCrop] = useState({ unit: "px", width: 30, aspect: 1 });
  // const [crop, setCrop] = useState({ x: 10, y: 10, width: 10, height: 100 }); // Adjust the width and height values as needed

  const [completedCrop, setCompletedCrop] = useState(null);

  // console.log(crop);

  // on selecting file we set load the image on to cropper
  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => setUpImg(reader.result));
      reader.readAsDataURL(e.target.files[0]);

      var imageContainer = document.getElementById("imageContainer");
      var uploadInput = document.getElementById("upload");

      if (uploadInput.files.length > 0) {
        // If an image is selected, add the 'hidden' class to hide the container
        imageContainer.classList.add("hidden");
      } else {
        // If no image is selected, remove the 'hidden' class to show the container
        imageContainer.classList.remove("hidden");
      }
    }
  };

  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

  useEffect(() => {
    setCanvasImage(imgRef.current, previewCanvasRef.current, completedCrop);
  }, [completedCrop]);

  const [isPopupVisible, setPopupVisible] = useState(false);
  const [isSubmitVisible, setSubmitVisible] = useState(true);

  const openPopup = () => {
    setPopupVisible(true);
    setSubmitVisible(false);
  };

  const closePopup = () => {
    setPopupVisible(false);
    setSubmitVisible(true);
    window.location.reload();
  };

  const backtotempl = () => {
    navigate(`/client/clientbirthday/${MRID}`); // replace 'username' with the actual username
  };


  return (
    <>
      {isSubmitVisible && (
        <div className=" container mx-auto p-8  rounded-lg ">
          <div className="">
          <div className="flex flex-row justify-between items-center relative top-[-24px]">
            <NavLink className="p-5 flex relative left-[-36px] " to={`/client/clientbirthday/${MRID}`}>
              <div
                style={{ backgroundColor: "#F58420", color: "white" }}
                className="p-3 drop-shadow-lg    h-10 w-10   rounded-full "
              >
                <IoMdArrowRoundBack />
              </div>
            </NavLink>
            <div className="text-black text-[20px] font-bold relative left-[-71px]  ">
              <p>Birthday Card</p>
            </div>
          </div>

          <div className="font-bold text-[9px] top-[-34px] relative left-[36px] text-[rgba(158,156,158,1)] ">
          <p>Please fill the form to design your birthday card.</p>
          </div>
            <div className="flex flex-col justify-center items-center pt-[80px]">
              

              <div
                class="max-w-sm mx-auto bg-white rounded-lg shadow-md overflow-hidden items-center"
                id="imageContainer"
              >
                <div class="px-4 py-6">
                  <div
                    id="image-preview"
                    class="max-w-sm p-6 mb-4 bg-gray-100 border-dashed border-2 border-gray-400 rounded-lg items-center mx-auto text-center cursor-pointer"
                  >
                    <input
                      id="upload"
                      type="file"
                      class="hidden"
                      accept="image/*"
                      onChange={onSelectFile}
                    />
                    <label for="upload" class="cursor-pointer">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-8 h-8 text-gray-700 mx-auto mb-4"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                        />
                      </svg>
                      <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-700">
                        Select picture
                      </h5>
                      {/* <p class="font-normal text-sm text-gray-400 md:px-6">Choose photo size should be less than <b class="text-gray-600">2mb</b></p> */}
                      <p class="font-normal text-sm text-gray-400 md:px-6">
                        {" "}
                        <b class="text-gray-600">JPG, PNG</b> format.
                      </p>
                      <span
                        id="filename"
                        class="text-gray-500 bg-gray-200 z-50"
                      ></span>
                    </label>
                  </div>
                </div>
              </div>

              <ReactCrop
                 style={{ width: "200px" }}
                src={upImg}
                onImageLoaded={onLoad}
                crop={crop}
                onChange={(c) => setCrop(c)}
                onComplete={(c) => setCompletedCrop(c)}
              />

              <div>
                {/* Canvas to display cropped image */}
                <canvas
                  ref={previewCanvasRef}
                  // Rounding is important so the canvas width and height matches/is a multiple for sharpness.
                  style={{
                    display: "none",
                    width: Math.round(completedCrop?.width ?? 0),
                    height: Math.round(completedCrop?.height ?? 0),
                  }}
                />
              </div>
              <p></p>
            </div>
            <div className=" flex justify-center py-6 w-[100%]">
              <input
                className="w-[103%] h-[40px] rounded-full "
                type="text"
                placeholder="Doctor Name "
                value={drname}
                onChange={(e) => setDrname(e.target.value)}
              />
            </div>

            <div className="relative top-[35px] flex justify-center items-center">
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

              {/* <PosterPreview image={image} completedCrop={completedCrop} /> */}
              <BirthdayPreview
                image={image}
                canvas={previewCanvasRef.current}
                name={name}
                drname={drname}
                MRID={MRID}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BirthdayForm;
