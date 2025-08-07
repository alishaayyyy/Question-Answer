import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaTachometerAlt, FaBox, FaUsers, FaEnvelope, FaSignOutAlt, FaTimes } from "react-icons/fa";

export default function Sidebar({ open, setOpen }) {
  const location = useLocation();

  const menu = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <FaTachometerAlt /> },
    { name: "Products", path: "/admin/dashboard/products", icon: <FaBox /> },
    { name: "Users", path: "/admin/dashboard/users", icon: <FaUsers /> },
    { name: "Answered Questions", path: "/admin/dashboard/answer", icon: <FaEnvelope /> },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <div
        className={`fixed md:static top-0 left-0 bg-blue-600 text-white h-full p-3 transition-transform duration-300 z-30
        ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 
        ${open ? "w-64" : "w-64"} md:w-64`}
      >
        {/* Mobile close button */}
        <div className="md:hidden flex justify-between items-center mb-6">
          <h1 className="text-lg font-bold">Admin Panel</h1>
          <FaTimes className="cursor-pointer" onClick={() => setOpen(false)} />
        </div>

        <nav>
          {menu.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 p-2 rounded-md mb-2 hover:bg-blue-700 ${
                location.pathname === item.path ? "bg-blue-700" : ""
              }`}
              onClick={() => setOpen(false)} // close on mobile click
            >
              {item.icon}
              <span className="md:inline">{item.name}</span>
            </Link>
          ))}
          <button className="flex items-center gap-3 p-2 rounded-md hover:bg-red-600 mt-10 w-full">
            <FaSignOutAlt />
            <span className="md:inline">Logout</span>
          </button>
        </nav>
      </div>
    </>
  );
}
