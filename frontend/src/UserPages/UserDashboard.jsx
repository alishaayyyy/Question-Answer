import React from "react";
import { Routes, Route } from "react-router-dom";
import LayoutUser from "./Componentss/LayoutUser.jsx";
import Dashboard from "./pages/Dashboard";
import QuestionManager from "./pages/Questions";
import Users from "./pages/User";
import Messages from "./pages/Messages";

export default function AdminDashboard() {
  return (
    <LayoutUser>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="questions" element={<QuestionManager />} />
        {/* <Route path="users" element={<Users />} /> */}
        {/* <Route path="messages" element={<Messages />} /> */}
      </Routes>
    </LayoutUser>
  );
}

