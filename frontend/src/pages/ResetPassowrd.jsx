import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_Backend_url}/auth/reset-password/${token}`,
        { password: newPassword }
      );

      toast.success(res.data.message || "Password reset successfully");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-gray-100 px-4">
      <div className="bg-white px-12 py-8 rounded-[10px] w-full max-w-[400px] shadow-[8px_8px_24px_0px_rgba(66,68,90,1)]">
        <h1 className="mb-5 text-center text-2xl font-semibold">Reset Password</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* New Password */}
          <div className="flex flex-col relative">
            <label className="text-[20px]">New Password</label>
            <input
              type={showNewPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full text-[20px] p-2 pr-10 border-none outline-none border-b border-black placeholder:text-[12px] placeholder:italic"
              placeholder="Enter new password"
            />
            <div
              onClick={() => setShowNewPassword((prev) => !prev)}
              className="absolute right-2 top-[38px] cursor-pointer text-lg"
            >
              {showNewPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col relative">
            <label className="text-[20px]">Confirm New Password</label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full text-[20px] p-2 pr-10 border-none outline-none border-b border-black placeholder:text-[12px] placeholder:italic"
              placeholder="Confirm new password"
            />
            <div
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-2 top-[38px] cursor-pointer text-lg"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          <button
            type="submit"
            className="bg-green-600 text-white text-[18px] rounded-md py-2 cursor-pointer"
          >
            Reset Password
          </button>
        </form>

        <ToastContainer />
      </div>
    </div>
  );
}

export default ResetPassword;
