import React, { useEffect, useState } from "react";
import axios from "axios";

function UploadAll() {
  const [brandname, setBrandname] = useState("");
  const [brandName, setbrandname] = useState([]);
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  useEffect(() => {
    fetchBrandName();
  }, []);

  const fetchBrandName = async () => {
    try {
      const response = await fetch(
        "https://icreate-admin-backend.onrender.com/anniversary/brandname"
      );
      const data = await response.json();
      setbrandname(data);
    } catch (error) {
      console.error("Error fetching brand name:", error);
      // Handle the error as needed
    }
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    // Check if the selected file is a PNG or JPG image
    if (
      selectedFile &&
      (selectedFile.type === "image/png" ||
        selectedFile.type === "image/jpeg" ||
        selectedFile.type === "image/jpg")
    ) {
      // Check the file size (2 MB limit)
      if (selectedFile.size <= 2 * 1024 * 1024) {
        const sanitizedFileName = selectedFile.name.replace(/\s/g, "");

        setImage({
          file: selectedFile,
          name: sanitizedFileName,
        });
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
    formData.append("brandName", brandname);
    formData.append("name", name);

    formData.append("image", image.file, image.name);
    console.log(formData);

    try {
      const response = await axios.post(
        "https://icreate-admin-backend.onrender.com/anniversary/new-design",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("error: ", response.data);

      if (response.data.msg === "Design added successfully") {
        setSuccessMessage(true);
        setErrorMessage(false); // Clear any previous error message
        // setBrandname("");
        // setDesign("");
      } else {
        setSuccessMessage(false); // Clear any previous success message
        setErrorMessage(true);
      }
    } catch (error) {
      // Handle errors here
      console.error("Error:", error);
      setSuccessMessage(false); // Clear any previous success message
      setErrorMessage(true);
    }
  };

  return (
    <>
      <div className="w-[100%]">
        <div className=" w-[100%]">
          <div className="text-center font-extrabold text-5xl opacity-50  py-4">
            <h1>Upload All Data</h1>
          </div>
          <div className="py-[60px] ">
            <form
              action="https://icreate-admin-backend.onrender.com/createUserexcel"
              method="post"
              enctype="multipart/form-data"
              className=""
            >
              <input type="file" name="file" />
              <button
                type="submit"
                class="text-white bg-blue-700 m-[10px] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Upload
              </button>
            </form>
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
}

export default UploadAll;
