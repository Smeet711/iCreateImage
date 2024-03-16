import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Reminderaddnew() {
  const [brandname, setBrandname] = useState("");
  const [brandName, setbrandname] = useState([]);
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const [logoName, setlogoName] = useState("");

  useEffect(() => {
    fetchBrandName();
  }, []);

  const fetchBrandName = async () => {
    try {
      const response = await fetch("https://icreate-admin-backend.onrender.com/reminders/brandname");
      const data = await response.json();
      setbrandname(data);
      console.log(brandName);
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
        // "https://icreate-admin-backend.onrender.com/invitations",
        "https://icreate-admin-backend.onrender.com/reminders/new-design",
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





         // Find the selected brandname object
         const selectedBrand = brandName.find((brand) => brand.brandname === brandname);

         // Navigate to the corresponding brandname _id
         if (selectedBrand) {
           navigate(`/Admin/reminder-sub-brands/${selectedBrand._id}`);
         }
   



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

  const handleLogoSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please select a valid PNG or JPG image.");
      return;
    }

    const formData = new FormData();
    formData.append("logoName", logoName);
    formData.append("image", image.file, image.name);

    try {
      const response = await axios.post(
        "https://icreate-admin-backend.onrender.com/reminder-logo",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("error: ", response.data);
      if (response.data.message === "Reminder Logo Created successfully") {
        alert("Logo Created successfully");
      } else {
        alert("Error");
      }
    } catch (error) {
      // Handle errors here
      console.error("Error:", error.message);
      alert(error);
    }
  };

  return (
    <div className="bg-white flex flex-col">
      <div className="text-4xl font-bold opacity-50 py-9 text-center">
        <h1>Reminder Card</h1>
      </div>

      <div className="py-[60px] ">
        <form encType="multipart/form-data">
          <div>
            <label htmlFor="type" className="text-sm opacity-50 text-bold">
              Type:
            </label>
            <select
              className="w-[100%] h-[50px] rounded-xl border-2 pl-4 border-slate-400"
              name="type"
              onChange={(e) => {
                setBrandname(e.target.value);
              }}
              required
            >
              <option value="" disabled selected>
                Select Type
              </option>
              {brandName.map((brand) => (
                <option key={brand._id} value={brand.brandName}>
                  {brand.brandName}
                </option>
              ))}
            </select>
          </div>
          <div className="w-[100%]">
            <label for="name" className="text-sm opacity-50 text-bold">
              Name:
            </label>
            <input
              className="w-[100%] h-[50px] rounded-xl border-2 pl-4 border-slate-400"
              type="text"
              name="brandname"
              placeholder="predmet"
              onChange={(e) => {
                setName(e.target.value);
              }}
              required
            />
          </div>

          <div className="">
            <label for="image" className="text-sm opacity-50 text-bold">
              Upload Design
            </label>
            <input
              className="w-[100%]  border-2 rounded-xl pl-4 border-slate-400"
              type="file"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              placeholder="Choose File (jpg or jpeg under 1 mb)"
              required
            />
          </div>
        </form>
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

      <p className="text-center mt-5">Logo</p>
      <div className="flex pt-3 gap-4">
        <input
          className="w-[100%] border-2 border-slate-500 rounded-lg "
          type="file"
          name="image"
          accept="image/*"
          onChange={handleFileChange}
        />

        <input
          className="w-[100%] border-2 border-slate-500 rounded-lg "
          placeholder="Enter Logo Name"
          type="text"
          value={logoName}
          onChange={(e) => setlogoName(e.target.value)}
        />
      </div>

      <div className="flex justify-center pt-5">
        <button
          className="w-[30%] h-[40px] border-2 border-slate-500 rounded-lg shadow-lg shadow-black bg-[#ef8018]"
          onClick={(e) => handleLogoSubmit(e)}
        >
          Submit
        </button>
      </div>

      <div>
        <div>
          {successMessage && (
            <p className="text-center text-green-500 text-xl  font-bold">
              Reminder Design Created successfully
            </p>
          )}

          {errorMessage && (
            <p className="text-center text-red-500 text-xl  font-bold">
              Error creating the Reminder Desgin
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Reminderaddnew;
