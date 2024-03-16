import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Adminlogin() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function Submit(e) {
    e.preventDefault();

    console.log(username, password);

    const response = await fetch("https://icreate-admin-backend.onrender.com/api/admin-login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        AdminId: username,
        Password: password,
      }),
    });

    const data = await response.json();
    console.log("data: ", data);

    if (data.success) {
      localStorage.setItem("adminId", data.admin._id);
      localStorage.setItem("token", data.token);
      localStorage.setItem("name", data.admin.Name);

      alert("Login Done");
      navigate("/Admin/welcome");
    } else if (data.msg === "Password is Incorrect") {
      alert("Password is Incorrect");
    } else {
      throw new Error("Invalid username or password");
    }
  }

  return (
    <>
      {/* <div className='w-[100%] h-screen bg-[#ef8018] flex justify-center items-center'>
     <div className='lg:w-[40%] sm:w-[80%] w-[90%] h-[80%] bg-white rounded-xl flex flex-col justify-center items-center gap-16'>
        <div>
            <h1 className='text-5xl font-extrabold text-[#ef8018]' >Admin login</h1>
            <p className='text-sm opacity-50 py-2 text-center'>Please Login To Continue</p> 
        </div>
        <div className='lg:w-[60%] sm:w-[70%] w-[80%]'>
            <div>
                <input onChange={(e)=>{setUsername(e.target.value)}}  type='text' placeholder='Enter Username' className='w-[100%] border-2 rounded-lg border-slate-700'/>
            </div>
            <div className='pt-5'>
            <input type='password' onChange={(e)=>{setPassword(e.target.value)}} placeholder='Enter password'className='w-[100%] border-2 rounded-lg border-slate-700'/>
            </div>
            <div>
                <h1 className='text-end pr-5 opacity-70'>Forget Password?</h1>
            </div>
        </div>
        <div  className='w-[100%] flex justify-center items-center'>
            <button onClick={Submit} className='w-[30%]  h-[40px] flex justify-center items-center bg-[#ef8018] shadow-md shadow-black rounded-lg text-xl font-bold text-white'>
                LOGIN
            </button>
        </div>
     </div>
    </div> */}

      {/* // new Ui  */}

      <div class="flex items-center min-h-screen p-4 bg-[#f6b26b] lg:justify-center">
        <div class="flex flex-col overflow-hidden bg-white rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-md">
          <div class="p-4 py-6 text-white bg-[#ef8018] md:w-80 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly">
            <div class="my-3 text-4xl font-bold tracking-wider text-center">
              <a href="#">iCreate</a>
            </div>
            <p class="mt-6 font-normal text-center text-gray-300 md:mt-0"></p>
            {/* <p class="flex flex-col items-center justify-center mt-10 text-center">
            <span>Don't have an account?</span>
            <a href="#" class="underline">Get Started!</a>
          </p>
          <p class="mt-6 text-sm text-center text-gray-300">
            Read our <a href="#" class="underline">terms</a> and <a href="#" class="underline">conditions</a>
          </p> */}
          </div>
          <div class="p-5 bg-white md:flex-1">
            <h3 class="my-4 text-2xl font-semibold text-gray-700">
              {" "}
              Admin Login
            </h3>
            <form action="#" class="flex flex-col space-y-5">
              <div class="flex flex-col space-y-1">
                <label for="email" class="text-sm font-semibold text-gray-500">
                  Username
                </label>
                <input
                  type="text"
                  id="email"
                  autofocus
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  class="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                />
              </div>
              <div class="flex flex-col space-y-1">
                <div class="flex items-center justify-between">
                  <label
                    for="password"
                    class="text-sm font-semibold text-gray-500"
                  >
                    Password
                  </label>
                  <a
                    href="#"
                    class="text-sm text-blue-600 hover:underline focus:text-blue-800"
                  >
                    Forgot Password?
                  </a>
                </div>
                <input
                  type="password"
                  id="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  class="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                />
              </div>
              {/* <div class="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="remember"
                  class="w-4 h-4 transition duration-300 rounded focus:ring-2 focus:ring-offset-0 focus:outline-none focus:ring-blue-200"
                />
                <label
                  for="remember"
                  class="text-sm font-semibold text-gray-500"
                >
                  Remember me
                </label>
              </div> */}
              <div>
                <button
                  type="submit"
                  onClick={Submit}
                  class="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-[#ef8018] rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
                >
                  Log in
                </button>
              </div>
              <div class="flex flex-col space-y-5">
                {/* <span class="flex items-center justify-center space-x-2">
                <span class="h-px bg-gray-400 w-14"></span>
                <span class="font-normal text-gray-500">or login as</span>
                <span class="h-px bg-gray-400 w-14"></span>
              </span> */}
                <div class="flex flex-col space-y-4">
                  {/* <div className="flex items-center justify-center px-4 py-2 space-x-2 transition-colors duration-300 border border-blue-500 rounded-md group hover:bg-blue-500 focus:outline-none">
              <NavLink to="/Adminlogin">
                  <span>
                   
                  </span>
                  <span class="text-sm font-medium text-gray-800 group-hover:text-white">Admin</span>
                </NavLink>
                </div> */}
                  {/* <a
                  href="#"
                  class="flex items-center justify-center px-4 py-2 space-x-2 transition-colors duration-300 border border-blue-500 rounded-md group hover:bg-blue-500 focus:outline-none"
                >
                  <span>
                    <svg class="text-blue-500 group-hover:text-white" width="20" height="20" fill="currentColor">
                      <path
                        d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"
                      ></path>
                    </svg>
                  </span>
                  <span class="text-sm font-medium text-blue-500 group-hover:text-white">Twitter</span>
                </a> */}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Adminlogin;
