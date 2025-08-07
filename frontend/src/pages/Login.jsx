import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils/utils.js';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // 👁️ Icons

function Login() {
  const [loginInfo, setloginInfo] = useState({
    email: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false); // 👁️ Toggle state
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const copyloginInfo = { ...loginInfo };
    copyloginInfo[name] = value;
    setloginInfo(copyloginInfo);
  };

  const handlelogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
      return handleError('Email and password are required');
    }

    try {
      const url = `${import.meta.env.VITE_Backend_url}/auth/login`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginInfo)
      });
      const result = await response.json();

      const { success, message, error, jwtToken, name , role } = result;
      if (success) {
        handleSuccess(message);
        localStorage.setItem('token', jwtToken);
        localStorage.setItem('UserLoggedIn', name);
        localStorage.setItem('userRole', role); 
        console.log("Token:", jwtToken);
        console.log("Name:", name);
         console.log("Role:", role);
        
        setTimeout(() => {
          navigate('/home');
        }, 1000);
      } else if (error) {
        const details =
          typeof error === 'object' && error?.details?.[0]?.message
            ? error.details[0].message
            : error;
        handleError(details);
      } else if (!success) {
        handleError(message);
      }
      console.log(result);
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-gray-100 px-4">
      <div className="bg-white px-12 py-8 rounded-[10px] w-full max-w-[400px] shadow-[8px_8px_24px_0px_rgba(66,68,90,1)]">
        <h1 className="mb-5 text-center text-2xl font-semibold">Login</h1>

        <form onSubmit={handlelogin} className="flex flex-col gap-3">
          <div className="flex flex-col">
            <label htmlFor="email" className="text-[20px]">Email</label>
            <input
              onChange={handleChange}
              type="email"
              name="email"
              placeholder="Enter your email..."
              value={loginInfo.email}
              className="w-full text-[20px] p-2 border-none outline-none border-b border-black placeholder:text-[12px] placeholder:italic"
            />
          </div>

          {/* 👁️ Password field with show/hide toggle */}
          <div className="flex flex-col relative">
            <label htmlFor="password" className="text-[20px]">Password</label>
            <input
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password..."
              value={loginInfo.password}
              className="w-full text-[20px] p-2 pr-10 border-none outline-none border-b border-black placeholder:text-[12px] placeholder:italic"
            />
            <div
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 bottom-3 text-xl cursor-pointer"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          {/* Forgot Password Link */}
          <div className="text-right text-sm">
            <Link to="/forgotpassword" className="text-blue-600 hover:underline">
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="bg-purple-700 text-white text-[20px] rounded-md py-2 cursor-pointer mt-2"
          >
            Login
          </button>

          <span className="text-sm">
            Doesn't have an account?{" "}
            <Link to="/signup" className="text-blue-600 underline">Signup</Link>
          </span>
        </form>

        <ToastContainer />
      </div>
    </div>
  );
}

export default Login;
