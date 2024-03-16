import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import './Login.css'

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [MRID, setMRID] = useState("");
  const [PASSWORD, setPassword] = useState("");

  async function Submit(e) {
    e.preventDefault();

    // console.log({ MRID, PASSWORD });

    await fetch("http://localhost:4000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ MRID, PASSWORD }),
    })
      .then((res) => res.json())
      .then((data) => {
        const username = data.user.USERNAME;
        console.log("data: ", data.user.USERNAME);

        setUsername(data.user.USERNAME);
        console.log("data: ", data.user.USERNAME);

        if (data.msg == "Login Successful") {
          navigate(`/client/welcome/${data.user.MRID}`, {
            state: { username: data.user.USERNAME },
          });
        } else if (data.msg == "Incorrect Password") {
          alert("invalid username or password");
        }
      });
    // if (username === "user" && password === "userpass") {
    //   navigate("/client/welcome");
    // } else {
    //   alert("invalid username or password");
    // }
  }

  return (
    <>
      {/* new login UI  */}

      <div class="flex items-center min-h-screen p-4  lg:justify-center my-component">
        <div class="flex flex-col overflow-hidden w-screen bg-white rounded-md  max md:flex-row md:flex-1 lg:max-w-screen-md">
          <div class="p-4 py-6 text-white  md:w-80 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly">
            <div class="my-3  tracking-wider text-center">
              <a href="#" className="text-[26px] text-black font-bold">Hello!</a>
              <p className="text-[12px] text-black">Welcome back! Please login to your account</p>
            </div>
          
          
          </div>
          <div class="p-5 bg-white md:flex-1">
           
            <form action="#" class="flex flex-col space-y-5">
              <div class="flex flex-col space-y-1">
                <label for="email" class=" font-semibold text-gray-500 text-[12px] mb-[15px]">
                  User Name<span className="text-red-700">*</span>
                </label>
                <input
                  type="text"
                  id="email"
                  autofocus
                  onChange={(e) => {
                    setMRID(e.target.value);
                  }}
                  class="px-4 py-2  transition duration-300 border border-[#ef8018] rounded-full focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                />
              </div>
              <div class="flex flex-col space-y-1">
                <div class="flex items-center justify-between">
                  <label
                    for="password"
                    class="text-[12px] text-gray-500 font-semibold  mb-[15px]"
                  >
                    Password<span className="text-red-700">*</span>
                  </label>
                
                </div>
                <input
                  type="password"
                  id="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  class="px-4 py-2  transition duration-300 border border-[#ef8018] rounded-full focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                />
                <div className="flex justify-end" >
                  <a
                    href="#"
                    class="text-sm text-blue-600 hover:underline focus:text-blue-800"
                  >
                    Forgot Password?
                  </a>
                  </div>
              </div>
              <div class="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="remember"
                  class="w-4 h-4 transition duration-300 rounded focus:ring-2 focus:ring-offset-0 focus:outline-none focus:ring-blue-200"
                />
                <label
                  for="remember"
                  class="text-sm font-semibold text-gray-500"
                >
                  Remember Me
                </label>
              </div>
             
              <div class="flex flex-col space-y-5">
                <span class="flex items-center justify-center space-x-2">
                  <span class="h-px bg-gray-400 w-14"></span>
                  
                  <span class="font-normal text-[rgba(163,163,163,1)] text-[12px]">or Login as</span>
                  <span class="h-px bg-gray-400 w-14"></span>
                </span>
                <div class="flex flex-col space-y-4">
                  <div className="flex items-center bg-gray-100 rounded-full shadow-md justify-center px-4 py-2 space-x-2 transition-colors duration-300 border   group hover:bg-blue-500 focus:outline-none">
                    <NavLink to="/Adminlogin">
                     
                      <span class="text-[14px] font-bold  text-gray-800 group-hover:text-white">
                        Admin
                      </span>
                    </NavLink>
                  </div>
                

                  <div className="flex justify-center items-center pt-[110px]">
                <button
                  type="submit"
                  onClick={Submit}
                  class="w-[150px] px-4 py-2 text-[16px]  rounded-full text-white transition-colors duration-300 bg-[#ef8018]  shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
                >
                  Login
                </button>
              </div>



                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
