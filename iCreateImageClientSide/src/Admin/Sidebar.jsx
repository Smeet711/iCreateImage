import React from "react";
import { useState, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import sideimg from "../images/bggg.png";

import { useNavigate } from "react-router-dom";
import { verifyUser } from "../../verify";

function Sidebar() {
  const [openSublist, setOpenSublist] = useState(null);
  const navigate = useNavigate();

  const toggleSublist = (menuId) => {
    if (openSublist === menuId) {
      // If the same menu is clicked again, close it
      setOpenSublist(null);
    } else {
      // Open the clicked menu
      setOpenSublist(menuId);
    }
  };

  const customstyle = {
    paddingTop: "50px",
  };

  const [userId, setUserId] = useState("");
  let [userRole, setUserRole] = useState("");

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

  console.log(userRole, userId);

  return (
    <>
      <div className="flex text-white">
        <div
          className=" w-[17.5%] h-[200vh] bg-cover bg-slate-400"
          style={{
            backgroundImage: `url(${sideimg})`,
            backgroundSize: "100% 100%",
          }}
        >
          <div className=" w-auto flex flex-col text-left ">
            <div className="pt-12 text-xl sm:text-3xl">
              <h1 className="uppercase ml-2">Welcome Admin</h1>

              {/* <h1>Admin Name</h1> */}
            </div>
            <div className="flex flex-col capitalize">
              <ul className="text-xl capitalize ml-4">
                {(userRole === "1" || userRole === "SUPER_ADMIN") && (
                  <>
                    <li style={customstyle}>
                      {" "}
                      <NavLink to="/Admin/welcome">Welcome</NavLink>
                    </li>
                    <li style={customstyle}>
                      {" "}
                      <NavLink to="/Admin/">Dashboard</NavLink>
                    </li>
                  </>
                )}

                {(userRole === "1" ||
                  userRole === "SUPER_ADMIN" ||
                  userRole === "CONTENT_ADMIN") && (
                  <>
                    <li style={customstyle}>
                      {" "}
                      <NavLink to="/Admin/invitation">
                        <button
                          className="capitalize"
                          onClick={() => toggleSublist("invitation")}
                        >
                          {" "}
                          Invitation
                        </button>
                      </NavLink>
                      {openSublist === "invitation" && (
                        <ul className="pl-3">
                          <li>
                            <NavLink to="/Admin/invitationbrands">
                              <button>Layout</button>
                            </NavLink>
                          </li>
                          <li>
                            <NavLink to="/Admin/invitationaddnew">
                              Add New
                            </NavLink>{" "}
                          </li>
                        </ul>
                      )}
                    </li>
                    <li style={customstyle}>
                      <NavLink to="/Admin/poster">
                        <button
                          className="button capitalize"
                          onClick={() => toggleSublist("poster")}
                        >
                          Poster
                        </button>
                      </NavLink>
                      {openSublist === "poster" && (
                        <ul className="pl-3">
                          <li>
                            <NavLink to="/Admin/posterbrands">Layout</NavLink>
                          </li>
                          <li>
                            <NavLink to="/Admin/posteraddnew">Add New</NavLink>
                          </li>
                        </ul>
                      )}
                    </li>

                    <li style={customstyle}>
                      <NavLink to="/Admin/certificate">
                        <button
                          className="capitalize"
                          onClick={() => toggleSublist("certificate")}
                        >
                          Certificate
                        </button>
                      </NavLink>
                      {openSublist === "certificate" && (
                        <ul className="pl-3">
                          <li>
                            <NavLink to="/Admin/certificatebrands">
                              Layout
                            </NavLink>
                          </li>
                          <li>
                            <NavLink to="/Admin/certificateaddnew">
                              {" "}
                              Add New
                            </NavLink>
                          </li>
                        </ul>
                      )}
                    </li>

                    <li style={customstyle}>
                      <NavLink to="/Admin/reminder">
                        <button
                          className="capitalize"
                          onClick={() => toggleSublist("reminder")}
                        >
                          Reminder
                        </button>
                      </NavLink>
                      {openSublist === "reminder" && (
                        <ul className="pl-3">
                          <li>
                            <NavLink to="/Admin/reminderbrands">Layout</NavLink>
                          </li>
                          <li>
                            <NavLink to="/Admin/reminderaddnew">
                              {" "}
                              Add New
                            </NavLink>
                          </li>
                        </ul>
                      )}
                    </li>
                    <li style={customstyle}>
                      {" "}
                      <NavLink to="/Admin/thank">
                        <button
                          className="capitalize"
                          onClick={() => toggleSublist("thankyou")}
                        >
                          ThankYou Card
                        </button>
                      </NavLink>
                      {openSublist === "thankyou" && (
                        <ul className="pl-3">
                          <li>
                            <NavLink to="/Admin/thankbrands">Layout</NavLink>
                          </li>
                          <li>
                            <NavLink to="/Admin/thankaddnew">Add New</NavLink>
                          </li>
                        </ul>
                      )}
                    </li>
                    <li style={customstyle}>
                      <NavLink to="/Admin/birthday">
                        <button
                          className="capitalize"
                          onClick={() => toggleSublist("birthday")}
                        >
                          Birthday
                        </button>
                      </NavLink>
                      {openSublist === "birthday" && (
                        <ul className="pl-3">
                          <li>
                            <NavLink to="/Admin/birthdaybrands">Layout</NavLink>
                          </li>
                          <li>
                            <NavLink to="/Admin/birthdayaddnew">
                              Add New
                            </NavLink>
                          </li>
                        </ul>
                      )}
                    </li>
                    <li style={customstyle}>
                      <NavLink to="/Admin/anniversary">
                        <button
                          className="capitalize"
                          onClick={() => toggleSublist("anniversary")}
                        >
                          Anniversary
                        </button>
                      </NavLink>
                      {openSublist === "anniversary" && (
                        <ul className="pl-3">
                          <li>
                            <NavLink to="/Admin/anniversarybrands">
                              Layout
                            </NavLink>
                          </li>
                          <li>
                            <NavLink to="/Admin/anniversaryaddnew">
                              Add New
                            </NavLink>
                          </li>
                        </ul>
                      )}
                    </li>
                  </>
                )}

                {(userRole === "REPORT_ADMIN" ||
                  userRole === "1" ||
                  userRole === "SUPER_ADMIN") && (
                  <li style={customstyle}>
                    <NavLink to="/Admin/reports">
                      <button
                        className="button capitalize"
                        onClick={() => toggleSublist("reports")}
                      >
                        Reports
                      </button>
                    </NavLink>
                    {openSublist === "reports" && (
                      <ul className="pl-3">
                        <li>
                          <NavLink to="/Admin/invireports">Invitation</NavLink>
                        </li>
                        <li>
                          <NavLink to="/Admin/posterreports">Poster</NavLink>
                        </li>
                        <li>
                          <NavLink to="/Admin/certificatereports">
                            Certificate
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to="/Admin/reminderreports">
                            Reminder
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to="/Admin/thankyoureports">
                            Thank You
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to="/Admin/birthdayreport">Birthday</NavLink>
                        </li>
                        <li>
                          <NavLink to="/Admin/anniversayreport">
                            Anniversary
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to="/Admin/videoreports">
                            VideoCard
                          </NavLink>
                        </li>
                      </ul>
                    )}
                  </li>
                )}

                {(userRole === "1" || userRole === "SUPER_ADMIN") && (
                  <li style={customstyle}>
                    <button
                      className="capitalize"
                      onClick={() => toggleSublist("settings")}
                    >
                      Settings
                    </button>

                    {openSublist === "settings" && (
                      <ul className="pl-3">
                        <li>
                          <NavLink to="/Admin/managemr">Manage MR</NavLink>
                        </li>
                        <li>
                          <NavLink to="/Admin/manageadmins">Manage</NavLink>
                        </li>
                        <li>
                          <NavLink to="/Admin/uploadall">UploadAllData</NavLink>
                        </li>
                      </ul>
                    )}
                  </li>
                )}

                <li>
                  <button
                    className="mt-10"
                    onClick={() => {
                      const isLogout = window.confirm(
                        "Sure You want to LogOut?"
                      );
                      if (isLogout) {
                        localStorage.clear();
                        navigate("/");
                      }
                    }}
                  >
                    Logout?
                  </button>
                </li>

                {/* <form
                  action="https://icreate-admin-backend.onrender.com/createUserexcel"
                  method="post"
                  enctype="multipart/form-data"
                  style={customstyle}
                  className=""
                >
                  <input type="file" name="file" />
                  <button
                    type="submit"
                    class="text-white bg-blue-700 m-[10px] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  >
                    Upload
                  </button>
                </form> */}
              </ul>
            </div>
          </div>
        </div>

        <div className=" w-[80vw] flex  justify-center">
          <div className="text-black">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
