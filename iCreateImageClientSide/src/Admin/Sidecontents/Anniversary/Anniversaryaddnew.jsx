import React, { useEffect, useState } from "react";
import axios from "axios";

function Anniversaryaddnew() {
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



         // Find the selected brandname object
         const selectedBrand = brandName.find((brand) => brand.brandname === brandname);

         // Navigate to the corresponding brandname _id
         if (selectedBrand) {
           navigate(`/Admin/anniversary-sub-brands/${selectedBrand._id}`);
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

  return (
    <>
      <div className="w-[100%]">
        <div className=" w-[100%]">
          <div className="text-center font-extrabold text-5xl opacity-50  py-4">
            <h1>Admin Panel</h1>
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
                    <option key={brand._id} value={brand.brandname}>
                      {brand.brandname}
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
          <div>
            <div>
              {successMessage && (
                <p className="text-center text-green-500 text-xl  font-bold">
                  Anniversary Design created successfully
                </p>
              )}

              {errorMessage && (
                <p className="text-center text-red-500 text-xl  font-bold">
                  Error creating the Anniversary Design
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Anniversaryaddnew;
