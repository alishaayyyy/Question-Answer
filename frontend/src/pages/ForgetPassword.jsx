import React, { useState } from 'react';
import axios from 'axios';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ForgetPassword() {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${import.meta.env.VITE_Backend_url}/auth/forgot-password`, { email });
      console.log("Backend URL:", import.meta.env.VITE_Backend_url);
      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-gray-100 px-4">
      <div className="bg-white px-12 py-8 rounded-[10px] w-full max-w-[400px] shadow-[8px_8px_24px_0px_rgba(66,68,90,1)]">
        <h1 className="mb-5 text-center text-2xl font-semibold">Forgot Password</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label htmlFor="email" className="text-[20px]">Enter your email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full text-[20px] p-2 border-none outline-none border-b border-black placeholder:text-[12px] placeholder:italic"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-purple-700 text-white text-[18px] rounded-md py-2 cursor-pointer"
          >
            Send Verification Email
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}


export default ForgetPassword;
