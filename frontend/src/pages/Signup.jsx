import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils/utils.js';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // 👁️ Icons

function Signup() {
  const [signupInfo, setSignupInfo] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false); // 👁️ Toggle state

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const copySignupInfo = { ...signupInfo };
    copySignupInfo[name] = value;
    setSignupInfo(copySignupInfo);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;
    if (!name || !email || !password) {
      return handleError('name, email and password are required')
    }

    try {
      const url = `${import.meta.env.VITE_Backend_url}/auth/signup`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(signupInfo)
      });
      const result = await response.json();

      const { success, message, error } = result;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate('/login')
        }, 1000)
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
        <h1 className="mb-5 text-center text-2xl font-semibold">Signup</h1>

        <form onSubmit={handleSignup} className="flex flex-col gap-3">
          <div className="flex flex-col">
            <label htmlFor="name" className="text-[20px]">Name</label>
            <input
              onChange={handleChange}
              type="text"
              name="name"
              autoFocus
              placeholder="Enter your name..."
              value={signupInfo.name}
              className="w-full text-[20px] p-2 border-none outline-none border-b border-black placeholder:text-[12px] placeholder:italic"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="text-[20px]">Email</label>
            <input
              onChange={handleChange}
              type="email"
              name="email"
              placeholder="Enter your email..."
              value={signupInfo.email}
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
              value={signupInfo.password}
              className="w-full text-[20px] p-2 pr-10 border-none outline-none border-b border-black placeholder:text-[12px] placeholder:italic"
            />
            <div
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 bottom-3 text-xl cursor-pointer"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          <button
            type="submit"
            className="bg-purple-700 text-white text-[20px] rounded-md py-2 cursor-pointer mt-2"
          >
            Signup
          </button>

          <span className="text-sm">
            Already have an account? <Link to="/login" className="text-blue-600 underline">Login</Link>
          </span>
        </form>

        <ToastContainer />
      </div>
    </div>
  );
}

export default Signup;
