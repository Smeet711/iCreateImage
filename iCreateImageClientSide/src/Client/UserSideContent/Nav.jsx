import React, { useState } from "react";
import { IoMdMenu } from "react-icons/io";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { IoIosNotificationsOutline } from "react-icons/io";
// import avtar from "../Image/Avtar2.png";

const Nav = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const logout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");

    if (confirmLogout) {
      localStorage.clear();
      alert("Logout successful");
      navigate("/");
    }
  };

  return (
    <div className="">
      <nav
        className="h-15 w-auto  px-5  "
        style={{ backgroundColor: "#FF913B" }}
      >
        <div className="flex justify-between">
          <div className="menu py-4 text-4xl">
            <IoMdMenu style={{ color: "white" }} />
          </div>
          <div className="flex">
            <div
              className="text-4xl p-4 justify-items-end"
              style={{ color: "white" }}
            >
              <IoIosNotificationsOutline />
            </div>
            <div
              className="relative  my-1 max-h-4 w-12 "
              onClick={toggleDropdown}
            >
              {/* <img src={avtar} alt="avatar" /> */}
              {isDropdownOpen && (
                <div className="absolute      right-0 mt-3 bg-white p-2 rounded shadow">
                 <NavLink   to="/myprofile"  className="block w-full    hover:bg-gray-200  text-left">
                    Profile
                  </NavLink>
                  <button
                    className="block w-full   hover:bg-gray-200   text-left"
                    onClick={logout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div></div>
    </div>
  );
};

export default Nav;