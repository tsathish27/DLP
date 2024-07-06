import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './myCourses.css'; // Ensure you have styles for this component

const MyCourses = () => {
  const [enrolledSubjects, setEnrolledSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEnrolledSubjects = async () => {
      try {
        const response = await axios.get('http://localhost:5000/student/enrolled-subjects', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        setEnrolledSubjects(response.data);
      } catch (error) {
        console.error('Error fetching enrolled subjects:', error);
        setError('Failed to fetch enrolled subjects. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchEnrolledSubjects();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>My Courses</h1>
      <ul>
        {enrolledSubjects.map(subject => (
          <li key={subject._id}>
            <Link to={`/subjects/${subject._id}`}>{subject.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyCourses;
