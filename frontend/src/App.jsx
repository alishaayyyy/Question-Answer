
import { Navigate, Routes,Route } from 'react-router-dom';
import './App.css';
import Signup from '../src/pages/Signup.jsx'
import Login from './pages/Login.jsx'
import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom';
import RefrshHandler from './RefrshHandler.jsx';
import Home from './pages/Home.jsx';
import ForgetPassword from './pages/ForgetPassword.jsx';
import ResetPassowrd from './pages/ResetPassowrd.jsx';
import UserDashboard from './UserPages/UserDashboard.jsx';
import AdminDashboard from './AdminPages/AdminDashboard.jsx';
import ProtectedRoute from './Conditions/ProtectedRoute.jsx';
import Unauthorized from './Conditions/Unauthorized.jsx';
// import AllQuestions from './components/AllQuestions';
// const navigate = useNavigate();
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />
  }

  return (
    <div className="App">
      <RefrshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path='/' element={<Navigate to="/login" />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/forgotpassword' element={<ForgetPassword/>} />
        <Route path='/reset-password/:token' element={<ResetPassowrd/>} />
        <Route path='/home' element={<PrivateRoute element={<Home />} />} />
       
<Route path="/unauthorized" element={<Unauthorized />} />

<Route
  path="/admin/dashboard/*"
  element={
    <ProtectedRoute allowedRoles={['admin']}>
      <AdminDashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/user/dashboard/*"
  element={
    <ProtectedRoute allowedRoles={['user']}>
      <UserDashboard />
    </ProtectedRoute>
  }
/>

      </Routes>
    </div>
  );
}
export default App;

