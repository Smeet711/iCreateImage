import React, { useState, useCallback, useRef, useEffect } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import AnniversaryPreview from "./AnniversaryPreview";
import { RxCross1 } from "react-icons/rx";
import { useNavigate, useParams } from "react-router-dom";
import "./anni.css";

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

const AnniversaryForm = () => {
  const { id, image, name, MRID } = useParams();
  const [upImg, setUpImg] = useState();
  const [drName, setDrName] = useState("");
  const [isCropVisible, setCropVisible] = useState(true);

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

    setCropVisible(false);
  };

  const backtotempl = () => {
    navigate(`/client/clientanniversary/${MRID}`); // replace 'username' with the actual username
  };

  return (
    <>
      {isSubmitVisible && (
        <div className="flex justify-center items-center w-[100%] h-screen  relative">
          <div className=" md:w-[70%] w-[90%]  h-auto rounded-xl bg-white absolute">
            <button
              onClick={backtotempl}
              type="button"
              class="text-white absolute  border-none top-[50px] left-[0px]   focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 "
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
            <div class="bg-[#ef8018] px-10 py-10 text-center w-full text-white">
              <p class="font-serif text-2xl sm:text-5xl font-semibold tracking-wider uppercase">
                {name}
              </p>
              {/* <p class="text-center text-blue-100">Please keep it short and succinct</p> */}
            </div>
            <div className="flex flex-col justify-center items-center pt-[80px]">
              {/* <div className="flex justify-center w-[80%]">
                <input
                  className="w-[100%] border-2 border-slate-400 rounded-lg"
                  type="file"
                  accept="image/*"
                  onChange={onSelectFile}
                />

              </div> */}
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

              {isCropVisible && (
                <ReactCrop
                style={{ width: "200px" }}
                  src={upImg}
                  onImageLoaded={onLoad}
                  crop={crop}
                  onChange={(c) => setCrop(c)}
                  onComplete={(c) => setCompletedCrop(c)}
                />
              )}

              <div>
                {/* Canvas to display cropped image */}
                <canvas
                  ref={previewCanvasRef}
                  // Rounding is important so the canvas width and height matches/is a multiple for sharpness.
                  style={{
                    display: "none",
                    // width: Math.round(completedCrop?.width ?? 0),
                    // height: Math.round(completedCrop?.height ?? 0),
                  }}
                />
              </div>
              <p></p>
            </div>
            <div className=" flex justify-center py-6 w-[100%]">
              <input
                className="w-[80%]  h-[40px] rounded-lg"
                type="text"
                placeholder="Dr Name "
                value={drName}
                onChange={(e) => setDrName(e.target.value)}
              />
            </div>

            <div className="flex justify-center py-[20px]">
              <button
                className="border-2 uppercase text-white border-slate-500 w-[30%] h-[50px] flex items-center justify-center bg-[#ef8018] rounded-lg shadow-md shadow-black"
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
              <button
                className="float-right pr-3 text-4xl"
                onClick={closePopup}
              >
                <RxCross1 />
              </button>

              <AnniversaryPreview
                image={image}
                canvas={previewCanvasRef.current}
                name={name}
                drName={drName}
                MRID={MRID}
              />
            </div>
          </div>
        </div>
      )}
      {/* <div>
    <PosterPreview/>
  </div> */}
    </>
  );
};

export default AnniversaryForm;
