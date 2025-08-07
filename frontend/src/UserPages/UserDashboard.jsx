import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout";
import Dashboard from "./pages/Dashboard";
import QuestionManager from "./pages/Questions";
import Users from "./pages/User";
import Messages from "./pages/Messages";

export default function AdminDashboard() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="questions" element={<QuestionManager />} />
        <Route path="users" element={<Users />} />
        <Route path="messages" element={<Messages />} />
      </Routes>
    </Layout>
  );
}

