import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

const PosterBrandsEdit = () => {
  const { id } = useParams();
  const [image, setImage] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    // Check if the selected file is a PNG or JPG image
    if (
      selectedFile &&
      (selectedFile.type === "image/png" ||
        selectedFile.type === "image/jpeg" ||
        selectedFile.type === "image/jpg")
    ) {
      // Check the file size (3 MB limit)
      if (selectedFile.size <= 1 * 1024 * 1024) {
        setImage(selectedFile);
      } else {
        // Display an error message for large files
        alert("Image size should be 2 MB or less.");
      }
    } else {
      // Display an error message for invalid file types
      alert("Please select a PNG or JPG image.");
    }
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please select a valid PNG or JPG image.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    const response = await axios.put(
      `https://icreate-admin-backend.onrender.com/poster-sub-brand/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.data.success == true) {
      console.log(response.data);
      alert("Design Updated");
    } else {
      alert("Error:");
    }
  };

  return (
    <div className="w-[100%]">
      <div className="py-8">
        <h1 className="text-5xl text-center font-bold opacity-25">
          Poster Brand Edit
        </h1>
      </div>
      <div className="flex flex-col space-y-24 pt">
        <div className="text-center ">
          <h1 className="text-2xl font-bold opacity-75">Form To Edit</h1>
        </div>

        <div className="py-[30px]">
          <label for="image" className="text-sm opacity-50 text-bold">
            Upload Design
          </label>
          <input
            className="w-[100%] h-[50px] border-2 rounded-xl pl-4 border-slate-400"
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            placeholder="Choose File (jpg or jpeg under 1 mb)"
            required
          />
        </div>

        <div className="flex justify-center pt-[20px]">
          <div className="w-[250px] h-[50px] bg-[#ef8018] text-center grid place-items-center rounded-xl shadow-lg shadow-black ">
            <button
              onClick={(e) => submit(e)}
              className="text-white font-bold "
            >
              SUBMIT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PosterBrandsEdit;
