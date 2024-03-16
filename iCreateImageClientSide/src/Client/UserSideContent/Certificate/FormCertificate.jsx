import React, { useState, useCallback, useRef, useEffect } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { RxCross1 } from "react-icons/rx";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import CertificatePreview from "./CertificatePreview";
import "../../Login.css";
import { IoMdArrowRoundBack } from "react-icons/io";

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

const FormCertificate = () => {
  const { MRID, id, image, name } = useParams();
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
  };

  const backtotempl = () => {
    navigate(`/client/clientcertificate/${MRID}`); // replace 'username' with the actual username
  };

  return (
    <>
      {isSubmitVisible && (
        <div className="container mx-auto p-8  rounded-lg">
          <div className="">
          <div className="flex flex-row justify-between items-center relative top-[-24px]">
            <NavLink className="p-5 flex relative left-[-36px] " to={`/client/clientcertificate/${MRID}`}>
              <div
                style={{ backgroundColor: "#F58420", color: "white" }}
                className="p-3 drop-shadow-lg    h-10 w-10   rounded-full "
              >
                <IoMdArrowRoundBack />
              </div>
            </NavLink>
            <div className="text-black text-[20px] font-bold relative left-[-104px]  ">
              <p>Certificate</p>
            </div>
          </div>


<div className="font-bold text-[9px] top-[-34px] relative left-[36px] text-[rgba(158,156,158,1)] ">
          <p>Please fill the form to design your certificate.</p>
          </div>
            <label htmlFor="" className="relative left-[8px]  bottom-[-14px]  text-[12px]">Doctor Name*</label>
            <div className=" flex justify-center py-6 w-[100%]">
              <input
                className="w-[103%] rounded-full h-[40px] px-4 py-2  border  focus:outline-none focus:border-blue-500 transition duration-300"
                type="text"
                placeholder="Doctor Name "
                value={drname}
                onChange={(e) => setDrname(e.target.value)}
              />
            </div>

            <div className="relative top-[69px] flex justify-center items-center">
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

              <CertificatePreview
                image={image}
                drname={drname}
                name={name}
                MRID={MRID}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FormCertificate;
