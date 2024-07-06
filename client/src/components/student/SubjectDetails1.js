import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './Sidebar';
import './subjectDetail.css';

const SubjectDetails1 = () => {
  const { subjectId } = useParams();
  const [subject, setSubject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubjectDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/subjects/${subjectId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        setSubject(response.data);
      } catch (error) {
        console.error('Error fetching subject details:', error);
        setError('Failed to fetch subject details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchSubjectDetails();
  }, [subjectId]);

  const handleEnroll = async () => {
    try {
      await axios.post(`http://localhost:5000/enroll/${subjectId}`, {}, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      alert('Enrolled successfully!');
    } catch (error) {
      console.error('Error enrolling in subject:', error);
      alert('Failed to enroll. Please try again later.');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-content">
        <h1>{subject.title}</h1>
        <p>{subject.description}</p>
        <button onClick={handleEnroll}>Enroll</button>
        {subject.modules.map(module => (
          <details key={module._id}>
            <summary>{module.title}</summary>
            <ul>
              {module.topics.map(topic => (
                <li key={topic._id}>
                  <h4>{topic.title}</h4>
                  <p>Notes: <a href={`http://localhost:5000/notes/${topic.notes}`} target="_blank" rel="noopener noreferrer">View Notes</a></p>
                  {topic.additionalResources && <p>Additional Resources: <a href={`http://localhost:5000/resources/${topic.additionalResources}`} target="_blank" rel="noopener noreferrer">View Resources</a></p>}
                </li>
              ))}
            </ul>
          </details>
        ))}
      </div>
    </div>
  );
};

export default SubjectDetails1;
