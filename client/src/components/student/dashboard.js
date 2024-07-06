
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import './studentDashboard.css';

const StudentDashboard = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSubjectId, setSelectedSubjectId] = useState(null);
  const [passcode, setPasscode] = useState('');
  const [enrolled, setEnrolled] = useState(false);
  const [enrollmentError, setEnrollmentError] = useState(null);
  const [activeContent, setActiveContent] = useState('dashboard');
  const [notifications, setNotifications] = useState([]);
  const [myCourses, setMyCourses] = useState([]);
  const [profile, setProfile] = useState({});
  const [assignments, setAssignments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get('http://localhost:5000/subjects', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        setSubjects(response.data);
      } catch (error) {
        console.error('Error fetching subjects:', error);
        setError('Failed to fetch subjects. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('http://localhost:5000/notifications', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        setNotifications(response.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    const fetchMyCourses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/student/enrolled-subjects', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        setMyCourses(response.data);
      } catch (error) {
        console.error('Error fetching my courses:', error);
      }
    };

    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:5000/student/profile', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    const fetchAssignments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/assignments', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        setAssignments(response.data);
      } catch (error) {
        console.error('Error fetching assignments:', error);
      }
    };

    if (activeContent === 'notifications') fetchNotifications();
    if (activeContent === 'my-courses') fetchMyCourses();
    if (activeContent === 'profile') fetchProfile();
    if (activeContent === 'assignments') fetchAssignments();
  }, [activeContent]);

  const handleEnroll = async () => {
    if (!selectedSubjectId || !passcode) {
      setEnrollmentError('Please enter a passcode and select a subject.');
      return;
    }

    try {
      await axios.post(`http://localhost:5000/subjects/${selectedSubjectId}/enroll`, { passcode }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      alert('Enrolled successfully');
      setEnrollmentError(null);
      setEnrolled(true);
    } catch (error) {
      console.error('Error enrolling in subject:', error);
      setEnrollmentError('Failed to enroll. Please check the passcode and try again.');
    }
  };

  const handleSelectSubject = (subjectId) => {
    setSelectedSubjectId(subjectId);
    setEnrolled(false); // Reset enrollment status when a new subject is selected
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="dashboard">
      <Sidebar setActiveContent={setActiveContent} />

      {activeContent === 'dashboard' && (
        <div className="dashboard-content">
          <h1>Student Dashboard</h1>
          <div className="subjects-grid">
            {subjects.length > 0 ? (
              subjects.map(subject => (
                <div key={subject._id} className="subject-card">
                  <h2>{subject.title}</h2>
                  <button onClick={() => handleSelectSubject(subject._id)}>Start learning</button>
                </div>
              ))
            ) : (
              <p>No subjects available.</p>
            )}
          </div>
          {selectedSubjectId && !enrolled && (
            <div className="enroll-section">
              <h2>Enroll in Subject</h2>
              <input
                type="text"
                placeholder="Enter passcode"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
              />
              <button onClick={handleEnroll}>Enroll</button>
              {enrollmentError && <div className="error">{enrollmentError}</div>}
            </div>
          )}
          {enrolled && <div className="success">Enrollment successful!</div>}
        </div>
      )}

      {activeContent === 'my-courses' && (
        <div className="my-courses-content">
          <h1>My Courses</h1>
          {myCourses.length > 0 ? (
            myCourses.map(course => (
              <div key={course._id} className="course-card">
                <h2>{course.title}</h2>
                <p>{course.description}</p>
              </div>
            ))
          ) : (
            <p>You are not enrolled in any courses.</p>
          )}
        </div>
      )}

      {activeContent === 'profile' && (
        <div className="profile-content">
          <h1>Profile</h1>
          <div className="profile-details">
            <p><strong>Name:</strong> {profile.name}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Phone Number:</strong> {profile.phoneNumber}</p>
            <p><strong>Branch:</strong> {profile.branch}</p>
            {/* Add other profile fields as needed */}
          </div>
        </div>
      )}

      {activeContent === 'assignments' && (
        <div className="assignments-content">
          <h1>Assignments</h1>
          {assignments.length > 0 ? (
            assignments.map(assignment => (
              <div key={assignment._id} className="assignment-card">
                <h2>{assignment.title}</h2>
                <p>{assignment.description}</p>
                <a href={assignment.link} target="_blank" rel="noopener noreferrer">Download</a>
              </div>
            ))
          ) : (
            <p>No assignments available.</p>
          )}
        </div>
      )}

      {activeContent === 'notifications' && (
        <div className="notifications-content">
          <h1>Notifications</h1>
          {notifications.length > 0 ? (
            notifications.map(notification => (
              <div key={notification._id} className="notification-card">
                <h2>{notification.title}</h2>
                <p>{notification.message}</p>
              </div>
            ))
          ) : (
            <p>No notifications available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
