// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import './Sidebar.css';

// const Sidebar = () => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     navigate('/login');
//   };

//   return (
//     <div className="sidebar">
//       <div className="sidebar-item">
//         <Link to="/profile">Profile</Link>
//       </div>
//       <div className="sidebar-item">
//         <Link to="/my-courses">My Courses</Link>
//       </div>
//       <div className="sidebar-item">
//         <Link to="/assignments">Assignments</Link>
//       </div>
//       <div className="sidebar-item">
//         <Link to="/notifications">Notifications</Link>
//       </div>
//       <div className="sidebar-item">
//         <li onClick={handleLogout}>Logout</li>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ setActiveContent }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    alert("logout successful ")
    navigate('/login');
  };

  return (
    <div className="sidebar">
      <div className="sidebar-item" onClick={() => setActiveContent('profile')}>
        Profile
      </div>
      <div className="sidebar-item" onClick={() => setActiveContent('my-courses')}>
        My Courses
      </div>
      <div className="sidebar-item" onClick={() => setActiveContent('assignments')}>
        Assignments
      </div>
      <div className="sidebar-item" onClick={() => setActiveContent('notifications')}>
        Notifications
      </div>
      <div className="sidebar-item" onClick={handleLogout}>
        Logout
      </div>
    </div>
  );
};

export default Sidebar;
