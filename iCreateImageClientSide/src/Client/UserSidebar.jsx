import React, { useState, useEffect } from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";
import { FaBars } from "react-icons/fa6";
import { ImCross } from "react-icons/im";
import Navbar from "./Navbar";
import "./Login.css";

function UserSidebar() {
  const { MRID } = useParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(
    window.innerWidth >= 700 ? true : false
  );

  const customstyle = {
    paddingTop: "50px",
  };

  const toggleSidebar = () => {
    // Close sidebar only on small screens
   
      setIsSidebarOpen((prev) => !prev);
    
  };

  useEffect(() => {
    const handleResize = () => {
      // Close sidebar on small and extra-large screens
      if (window.innerWidth <= 540) {
        setIsSidebarOpen(false);
      } else if (window.innerWidth >= 700) {
        setIsSidebarOpen(true);
      }
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div className="flex my-component">
        <div
          className={`flex  text-white ${
            isSidebarOpen ? "md:w-[20vw]" : "md:w-0"
          }  z-30`}
        >
          {isSidebarOpen && (
            <div
              className="   w-[100vw] z-1 h-[200vh] bg-cover bg-white  "
              // style={{ backgroundImage: `url(${sideimg})` }}
            >
              <div className="w-[90%]">
                <div className="text-3xl  flex justify-end pt-4 relative top-[30px]">
                  {/* <FaBars/> */}
                  {/* <button onClick={toggleSidebar} className="absolute left-[30px]">
                    <ImCross />
                  </button> */}
                </div>
              </div>

              <div className=" w-auto flex flex-col  ml-4 text-start">
                {/* <div className="pt-12 sm:text-3xl text-2xl ">
                  <h1 className="capitalize">Welcome: {MRID} </h1>
                </div> */}
                <div className="flex flex-col text-black relative left-[40px]">
                  <ul className="text-xl   ">
                    <button onClick={toggleSidebar} className="" style={{ color: "#000" }}>
                      <ImCross  size={"30px"}/>
                    </button>

                    <li style={customstyle}>
                      <NavLink to={`/client/welcome/${MRID}`}>
                        <button className="capitalize" onClick={toggleSidebar}>
                          Home
                        </button>
                      </NavLink>
                    </li>
                    <li style={customstyle}>
                      <NavLink to={`/client/clientinvitation/${MRID}`}>
                        <button className="capitalize" onClick={toggleSidebar}>
                          Invitation
                        </button>
                      </NavLink>
                    </li>
                    <li style={customstyle}>
                      <NavLink to={`/client/clientposter/${MRID}`}>
                        <button className="capitalize" onClick={toggleSidebar}>
                          Poster
                        </button>
                      </NavLink>
                    </li>

                    <li style={customstyle}>
                      <NavLink to={`/client/clientthank/${MRID}`}>
                        <button className="capitalize" onClick={toggleSidebar}>
                          Thank You Card
                        </button>
                      </NavLink>
                    </li>
                    <li style={customstyle}>
                      <NavLink to={`/client/clientcertificate/${MRID}`}>
                        <button className="capitalize" onClick={toggleSidebar}>
                          Certificate
                        </button>
                      </NavLink>
                    </li>
                    <li style={customstyle}>
                      <NavLink to={`/client/clientreminder/${MRID}`}>
                        <button className="capitalize" onClick={toggleSidebar}>
                          Reminder
                        </button>
                      </NavLink>
                    </li>
                    <li style={customstyle}>
                      <NavLink to={`/client/clientbirthday/${MRID}`}>
                        <button className="capitalize" onClick={toggleSidebar}>
                          Birthday
                        </button>
                      </NavLink>
                    </li>
                    <li style={customstyle}>
                      <NavLink to={`/client/clientanniversary/${MRID}`}>
                        <button className="capitalize" onClick={toggleSidebar}>
                          Anniversary
                        </button>
                      </NavLink>
                    </li>
                    <li className="pt-[223px]">
                      <NavLink to={`/`}>
                        <button className="capitalize">Logout</button>
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {!isSidebarOpen && (
            <div className="absolute top-4 left-[42px] ">
              <button onClick={toggleSidebar} style={{ color: "#fff" }}>
                <FaBars size={"30px"} />
              </button>
            </div>
          )}
        </div>

        <div
          className={`w-[100%] flex justify-center ${
            !isSidebarOpen ? "md:w-[80%]" : "md:w-[100%]"
          }`}
        >
          <div className="w-[90%] text-black  relative  ">
            {!isSidebarOpen && <Navbar />}
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default UserSidebar;
