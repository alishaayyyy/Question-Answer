import React, { useState } from "react";
import Sidebar from './Sidebarr';
export default function LayoutUser({ children }) {
  const [open, setOpen] = useState(false); // mobile default closed

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar open={open} setOpen={setOpen} />

      {/* Content */}
      <div className="flex-1 p-4">
        {/* Top bar only for mobile */}
        <div className="md:hidden flex justify-between items-center mb-4">
          <button
            onClick={() => setOpen(true)}
            className="bg-blue-600 text-white px-3 py-2 rounded"
          >
            ☰ Menu
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}
