import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function InvitatipnBrandEdit() {
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
      `https://icreate-admin-backend.onrender.com/invitation-sub-brand/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.data.success == true) {
      alert("Design Updated");
    } else {
      alert("Error:");
    }
  };

  return (
    <div className="w-full bg-white p-8 rounded-lg shadow-md">
    <div className="py-8">
      <h1 className="text-4xl text-center font-bold text-indigo-700">
        Admin Panel
      </h1>
    </div>
    <div className="flex flex-col space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-700">Form To Edit</h1>
      </div>
  
      <div className="py-4">
        <label htmlFor="image" className="text-sm text-gray-600 font-semibold">
          Upload Design
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
          />
        </div>
      </div>
  
      <div className="flex justify-center items-center">
        <button
          onClick={(e) => submit(e)}
          className="w-40 h-12 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 focus:outline-none"
        >
          SUBMIT
        </button>
      </div>
    </div>
  </div>
  
  
  );
}

export default InvitatipnBrandEdit;
