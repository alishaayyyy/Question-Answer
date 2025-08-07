// import React from 'react'

// function AdminDashboard() {
//   return (
//     <div>AdminDashboard</div>
//   )
// }

// export default AdminDashboard

import React from "react";

import Layout from "./Components/Layout";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Users from "./pages/Users";
// import Messages from "./pages/AnswerdQues";
import AdminAnswers from './pages/AnswerdQues'

export default function AdminDashboard() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        {/* <Route path="products" element={<Products />} /> */}
        {/* <Route path="users" element={<Users />} /> */}
        <Route path="answer" element={<AdminAnswers />} />
      </Routes>
    </Layout>
  );
}

