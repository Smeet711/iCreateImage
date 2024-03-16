import React, { useState, useRef } from "react";

const ImageMerger = () => {
  const [template, setTemplate] = useState(null);
  const [clientImage, setClientImage] = useState(null);
  const canvasRef = useRef(null);

  const handleTemplateChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const img = new Image();
      img.src = reader.result;
      img.onload = () => {
        setTemplate(img);
      };
    };

    reader.readAsDataURL(file);
  };

  // const handleTemplateChange = async (url) => {
  //   try {
  //     const response = await fetch(`https://icreate-admin-backend.onrender.com/${}`);
  //     if (!response.ok) {
  //       throw new Error("Failed to fetch template image");
  //     }

  //     const blob = await response.blob();
  //     const img = new Image();
  //     img.src = URL.createObjectURL(blob);
  //     img.onload = () => {
  //       setTemplate(img);
  //     };
  //   } catch (error) {
  //     console.error(error.message);
  //   }
  // };

  const handleClientImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const img = new Image();
      img.src = reader.result;
      img.onload = () => {
        setClientImage(img);
      };
    };

    reader.readAsDataURL(file);
  };

  const mergeImages = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the template
    ctx.drawImage(template, 0, 0, canvas.width, canvas.height);

    // Draw the client image on top of the template
    ctx.drawImage(clientImage, 50, 50, 100, 100); // Adjust coordinates and size as needed
    // Add text to the merged image
    ctx.fillStyle = "black"; // Text color
    ctx.font = "20px Arial"; // Font size and type
    ctx.textAlign = "center"; // Text alignment
    ctx.fillText("Your Text Here", canvas.width / 2, 500);
  };

  const downloadMergedImage = () => {
    const canvas = canvasRef.current;
    const downloadLink = document.createElement("a");

    // Convert canvas content to data URL
    const dataURL = canvas.toDataURL("image/png");

    // Set the data URL as the href attribute
    downloadLink.href = dataURL;

    // Set the file name for download
    downloadLink.download = "merged_image.png";

    // Trigger a click on the link to start the download
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleTemplateChange} />
      <input type="file" accept="image/*" onChange={handleClientImageChange} />
      <button onClick={mergeImages} className="bg-[#ef8018]">
        Merge Images
      </button>
      <button onClick={downloadMergedImage}>Download Merged Image</button>
      <canvas
        ref={canvasRef}
        width={1000}
        height={1000}
        style={{ border: "1px solid #000" }}
      ></canvas>
    </div>
  );
};

export default ImageMerger;
