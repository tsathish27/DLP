import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './components/Home/home';
import Login from './components/login/login';
import Signup from './components/login/signup';
import Navbar from './components/navbar/navbar';
import TeacherDashboard from './components/teacher/teacherdashboard';
import SubjectDetails from './components/teacher/SubjectDetails';
import StudentDashboard from './components/student/dashboard';
import MyCourses from './components/student/MyCourses1'; // Ensure the correct import path
import SubjectDetails1 from './components/student/SubjectDetails1';
import ForgotPassword from './components/login/ForgotPassword';
import ResetPassword from './components/login/ResetPassword';

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const showNavbar = !['/login', '/signup'].includes(location.pathname);

  return (
    <div className="App">
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} /> 
        <Route path="/teacherdashboard" element={<TeacherDashboard />} />
        <Route path="/subjects/:subjectId/modules" element={<SubjectDetails />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/my-courses" element={<MyCourses />} /> {/* Ensure the path matches */}
        <Route path="/subjects/:subjectId" element={<SubjectDetails1 />} />
      </Routes>
    </div>
  );
}

export default App;
