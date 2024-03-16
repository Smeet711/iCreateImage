import React, { useEffect, useState } from "react";
import { verifyUser } from "../../../../verify";

const Makeadmins = () => {
  const [activeTab, setActiveTab] = useState("superAdmin");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const renderForm = () => {
    if (activeTab === "superAdmin" && userRole === "1") {
      return renderSuperAdminForm();
    } else if (activeTab === "contentAdmin" && userRole === "SUPER_ADMIN") {
      return renderContentAdminForm();
    } else if (activeTab === "reportAdmin" && userRole === "SUPER_ADMIN") {
      return renderReportAdminForm();
    } else {
      return null;
    }
  };

  const [userId, setUserId] = useState("");
  const [userRole, setUserRole] = useState("");

  async function fetchData(setUserId, setUserRole) {
    try {
      const token = localStorage.getItem("token");
      const data = await verifyUser(token);
      const userRole = data.userRole;
      const userId = data.userId;
      setUserId(userId);
      setUserRole(userRole);
    } catch (error) {
      console.error("Failed to verify user:", error.message);
    }
  }

  useEffect(() => {
    fetchData(setUserId, setUserRole);
  }, []);

  const [Admin, setAdmin] = useState({
    Name: "",
    AdminId: "",
    Password: "",
    Gender: "",
    MobileNumber: "",
  });

  const [Report, setReport] = useState({
    Name: "",
    AdminId: "",
    Password: "",
    Gender: "",
    MobileNumber: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdmin((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleInputChangeForReport = (e) => {
    const { name, value } = e.target;
    setReport((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const token = localStorage.getItem("token");

  const handleSuperAdminCreate = (e) => {
    e.preventDefault();
    try {
      fetch(`https://icreate-admin-backend.onrender.com/api/create-super-admin`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...Admin }),
      })
        .then((res) => {
          console.log("Response status:", res.status);
          if (res.status === 401) {
            alert("Token Expire,Login Again");
          }
          if (res.status === 400) {
            alert("AdminId Already Exitsts");
          }
          return res.json();
        })
        .then((data) => {
          console.log("Response data: ", data);
          if (data.success) {
            alert("Super Admin Created");
          } else if (data.msg === "Main Admin Not Found") {
            alert("Main Admin Not Found");
          } else if (data.msg === "You are not Default admin") {
            alert("You are not Default admin");
          } else if (data.msg === "Can't create more than 3 super admin") {
            alert("Can't create more than 3 super admin");
          } else if (data.msg === "Internal Server Error") {
            alert("Internal Server Error");
          }
        })
        .catch((error) => {
          console.error("Fetch error:", error);
        });
    } finally {
      setAdmin({
        Name: "",
        AdminId: "",
        Password: "",
        Gender: "",
        MobileNumber: "",
      });
    }
  };

  const handleContentAdminCreate = (e) => {
    e.preventDefault();

    try {
      fetch(`https://icreate-admin-backend.onrender.com/api/create-content-admin`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...Admin,
        }),
      })
        .then((res) => {
          console.log("Response status:", res.status);
          if (res.status === 401) {
            alert("Token Expire,Login Again");
          }
          if (res.status === 400) {
            alert("AdminId Already Exitsts");
          }
          return res.json();
        })
        .then((data) => {
          console.log("Response data:", data);
          if (data.success) {
            alert("Content Admin Created");
          } else if (data.msg === "No Admin Type Found") {
            alert("No Admin Type Found");
          } else if (data.msg === "Content Admin Already Exitsts") {
            alert("Content Admin Already Exitsts");
          } else if (data.msg === "Only SuperAdmin Create Content Admin") {
            alert("Only SuperAdmin Create Content Admin");
          } else if (data.msg === "Internal Server Error") {
            alert("Internal Server Error");
          }
        })
        .catch((error) => {
          const errMsg = error.message;
          console.error("Fetch error:", errMsg);
        });
    } finally {
      setAdmin({
        Name: "",
        AdminId: "",
        Password: "",
        Gender: "",
        MobileNumber: "",
      });
    }
  };

  const handleReportAdminCreate = (e) => {
    e.preventDefault();
    try {
      fetch(`https://icreate-admin-backend.onrender.com/api/create-report-admin`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...Report }),
      })
        .then((res) => {
          console.log("Response status:", res.status);
          if (res.status === 401) {
            alert("Token Expire,Login Again");
          }
          if (res.status === 400) {
            alert("Report Admin Already Exitsts");
          }
          return res.json();
        })
        .then((data) => {
          console.log("Response data:", data);
          if (data.success) {
            alert("Report Admin Created");
          } else if (data.msg === "No Admin Type Found") {
            alert("No Admin Type Found");
          } else if (data.msg === "Only SuperAdmin Create Report Admin") {
            alert("Only SuperAdmin Create Report Admin");
          } else if (
            data.msg === "Internal Server Error in Report Admin creation "
          ) {
            alert("Internal Server Error in Report Admin creation ");
          }
        })
        .catch((error) => {
          console.error("Fetch error:", error);
        });
    } finally {
      setReport({
        Name: "",
        AdminId: "",
        Password: "",
        Gender: "",
        MobileNumber: "",
      });
    }
  };

  const renderSuperAdminForm = () => {
    return (
      <>
        <div class="lg:m-5">
          <form class="relative border border-gray-100 space-y-3 max-w-screen-md mx-auto rounded-md bg-white p-6 shadow-xl lg:p-10">
            <h1 class="mb-6 text-xl font-semibold lg:text-2xl">Register</h1>

            <div>
              <div>
                <label class=""> Full Name</label>
                <input
                  type="text"
                  placeholder="Your Name"
                  class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
                  value={Admin.Name}
                  onChange={handleInputChange}
                  name="Name"
                />
              </div>
              <label class=""> AdminId </label>
              <input
                type="text"
                placeholder="AdminId"
                class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
                value={Admin.AdminId}
                onChange={handleInputChange}
                name="AdminId"
              />
            </div>
            <div>
              <label class=""> Password </label>
              <input
                type="password"
                placeholder="******"
                class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
                value={Admin.Password}
                onChange={handleInputChange}
                name="Password"
              />
            </div>
            <div class="grid gap-3 lg:grid-cols-2">
              <div>
                <label class=""> Gender </label>
                <div class="relative w-56 mt-2 bg-gray-100 rounded-lg">
                  <input
                    type="text"
                    name="Gender"
                    id="Gender"
                    value={Admin.Gender}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div>
                <label class="">
                  {" "}
                  Phone: <span class="text-sm text-gray-400">
                    (optional)
                  </span>{" "}
                </label>
                <input
                  type="text"
                  placeholder="+543 5445 0543"
                  class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
                  value={Admin.MobileNumber}
                  name="MobileNumber"
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div>
              <button
                type="button"
                class="mt-5 w-full rounded-md bg-blue-600 p-2 text-center font-semibold text-white"
                onClick={handleSuperAdminCreate}
              >
                Create Super Admin
              </button>
            </div>
          </form>
        </div>
      </>
    );
  };

  const renderContentAdminForm = () => {
    // Content Admin form JSX
    return (
      <form>
        <>
          <div class="lg:m-10">
            <form class="relative border border-gray-100 space-y-3 max-w-screen-md mx-auto rounded-md bg-white p-6 shadow-xl lg:p-10">
              <h1 class="mb-6 text-xl font-semibold lg:text-2xl">Register</h1>

              <div>
                <div>
                  <label class=""> Full Name</label>
                  <input
                    type="text"
                    placeholder="Your Name"
                    class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
                    value={Admin.Name}
                    onChange={handleInputChange}
                    name="Name"
                  />
                </div>
                <label class=""> AdminId </label>
                <input
                  type="text"
                  placeholder="AdminId"
                  class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
                  value={Admin.AdminId}
                  onChange={handleInputChange}
                  name="AdminId"
                />
              </div>
              <div>
                <label class=""> Password </label>
                <input
                  type="password"
                  placeholder="******"
                  class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
                  value={Admin.Password}
                  onChange={handleInputChange}
                  name="Password"
                />
              </div>
              <div class="grid gap-3 lg:grid-cols-2">
                <div>
                  <label class=""> Gender </label>
                  <div class="relative w-56 mt-2 bg-gray-100 rounded-lg">
                    <input
                      type="text"
                      name="Gender"
                      id="Gender"
                      value={Admin.Gender}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div>
                  <label class="">
                    {" "}
                    Phone: <span class="text-sm text-gray-400">
                      (optional)
                    </span>{" "}
                  </label>
                  <input
                    type="text"
                    placeholder="+543 5445 0543"
                    class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
                    value={Admin.MobileNumber}
                    name="MobileNumber"
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div>
                <button
                  type="button"
                  class="mt-5 w-full rounded-md bg-blue-600 p-2 text-center font-semibold text-white"
                  onClick={handleContentAdminCreate}
                  value={Admin.MobileNumber}
                  name="MobileNumber"
                  onChange={handleInputChange}
                >
                  Create Content Admin
                </button>
              </div>
            </form>
          </div>
        </>
      </form>
    );
  };

  const renderReportAdminForm = () => {
    // Report Admin form JSX
    return (
      <>
        <div class="lg:m-10">
          <form class="relative border border-gray-100 space-y-3 max-w-screen-md mx-auto rounded-md bg-white p-6 shadow-xl lg:p-10">
            <h1 class="mb-6 text-xl font-semibold lg:text-2xl">Register</h1>

            <div>
              <div>
                <label class=""> Full Name</label>
                <input
                  type="text"
                  placeholder="Your Name"
                  class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
                  value={Report.Name}
                  onChange={handleInputChangeForReport}
                  name="Name"
                />
              </div>
              <label class=""> AdminId </label>
              <input
                type="text"
                placeholder="AdminId"
                class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
                value={Report.AdminId}
                onChange={handleInputChangeForReport}
                name="AdminId"
              />
            </div>
            <div>
              <label class=""> Password </label>
              <input
                type="password"
                placeholder="******"
                class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
                value={Report.Password}
                onChange={handleInputChangeForReport}
                name="Password"
              />
            </div>
            <div class="grid gap-3 lg:grid-cols-2">
              <div>
                <label class=""> Gender </label>
                <div class="relative w-56 mt-2 bg-gray-100 rounded-lg">
                  <input
                    type="text"
                    name="Gender"
                    id="Gender"
                    value={Report.Gender}
                    onChange={handleInputChangeForReport}
                  />
                </div>
              </div>
              <div>
                <label class="">
                  {" "}
                  Phone: <span class="text-sm text-gray-400">
                    (optional)
                  </span>{" "}
                </label>
                <input
                  type="text"
                  placeholder="+543 5445 0543"
                  class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
                  value={Report.MobileNumber}
                  name="MobileNumber"
                  onChange={handleInputChangeForReport}
                />
              </div>
            </div>

            <div>
              <button
                type="button"
                class="mt-5 w-full rounded-md bg-blue-600 p-2 text-center font-semibold text-white"
                onClick={handleReportAdminCreate}
              >
                Create Report Admin
              </button>
            </div>
          </form>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="w-[100%]">
        <div className=" w-[100%]">
          {/* Tab Buttons */}
          <div className="flex space-x-4">
            {userRole === "1" && (
              <button
                className={`tab-button ${
                  activeTab === "superAdmin" ? "active" : ""
                }`}
                onClick={() => handleTabClick("superAdmin")}
              >
                Super Admin
              </button>
            )}

            {userRole === "SUPER_ADMIN" && (
              <>
                <button
                  className={`tab-button ${
                    activeTab === "contentAdmin" ? "active" : ""
                  }`}
                  onClick={() => handleTabClick("contentAdmin")}
                >
                  Content Admin
                </button>
                <button
                  className={`tab-button ${
                    activeTab === "reportAdmin" ? "active" : ""
                  }`}
                  onClick={() => handleTabClick("reportAdmin")}
                >
                  Report Admin
                </button>
              </>
            )}
          </div>

          {/* Form */}
          <div className="text-center font-extrabold text-5xl opacity-50 ">
            <h1>
              {activeTab === "superAdmin"
                ? "Super Admin"
                : activeTab === "contentAdmin"
                ? "Content Admin"
                : "Report Admin"}
            </h1>
          </div>
          <div className="py-[60px] ">
            <div class="lg:m-10">{renderForm()}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Makeadmins;
