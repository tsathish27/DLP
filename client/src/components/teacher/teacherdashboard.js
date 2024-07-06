import React, { useState, useEffect } from 'react';
import './teacherDashboard.css';
import { Link ,useNavigate} from 'react-router-dom';
import axios from 'axios';

function TeacherDashboard() {
    const [subjects, setSubjects] = useState([]);
    const [activeSubject, setActiveSubject] = useState(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showCreateModal1, setShowCreateModal1] = useState(false);
    const [setShowCreateProfile,setShowProfile]=useState(false)
    const [newSubjectData, setNewSubjectData] = useState({
        title: '',
        description: '',
        coverImage: null,
        passcode: ''
    });

    useEffect(() => {
        // Fetch subjects when the component mounts using Axios
        axios.get('http://localhost:5000/subjects')
            .then(response => {
                setSubjects(response.data);
            })
            .catch(error => console.error('Error fetching subjects:', error));
    }, []);

    // Function to handle subject creation using Axios
    function createSubject(event) {
        event.preventDefault(); // Prevent form submission

        if (!newSubjectData.title || !newSubjectData.description || !newSubjectData.passcode) {
            alert("Please fill in all fields.");
            return;
        }

        const formData = new FormData();
        formData.append('title', newSubjectData.title);
        formData.append('description', newSubjectData.description);
        formData.append('passcode', newSubjectData.passcode);
        if (newSubjectData.coverImage) {
            formData.append('coverImage', newSubjectData.coverImage);
        }

        // Post the data to the backend using Axios with token in headers
        axios.post('http://localhost:5000/subjects', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => {
            console.log('Subject created:', response.data);
            setSubjects([...subjects, response.data]);
            setShowCreateModal(false);
            setNewSubjectData({ title: '', description: '', coverImage: null, passcode: '' });
        })
        .catch(error => {
            console.error('Error creating subject:', error);
        });
    }

    // Function to handle cover image file upload
    function handleCoverImageUpload(event) {
        setNewSubjectData({ ...newSubjectData, coverImage: event.target.files[0] });
    }

    const navigate = useNavigate();

    function handleLogout() {
        localStorage.removeItem('token');
        alert('logout successful');
        navigate('/login');
    }



    return (
        <div className="teacher-dashboard">
            {/* Right Sidebar Navbar */}
            <nav className="sidebar3">
                <div className='sidenavbar3'>
                
                
                <ul className="nav-menu3">
                    <li className="nav-item3"onClick={() => setShowProfile(true)}>Profile</li>
                    <li className="nav-item3"onClick={() => setShowCreateModal1(true)}>Notifications</li>
                    <li className="nav-item3"onClick={() => setShowUpdates(true)}>Updates</li>
                    <li className="nav-item3"onClick={() => setShowMsgs(true)}>Messages</li>
                    <li className="nav-item3" onClick={() => setShowCreateModal(true)}>Create New Subject</li>
                    <li className="nav-item3" onClick={() => handleLogout()}> Logout</li>

                </ul>

                </div>
                
            </nav>

            {/* Main Content */}
            <div className="main-content3">
                {activeSubject ? (
                    <div className='view_module1'>
                        <h2>{activeSubject.title}</h2>
                        <p>{activeSubject.description}</p>
                        <button className="close-module-btn" onClick={() => setActiveSubject(null)}>
                            <i className="fas fa-times"></i>
                        </button>
                        <Link to={`/subjects/${activeSubject._id}/modules`}>
                            <button className="view-modules-btn">View Modules</button>
                        </Link>
                    </div>
                ) : (
                    <div>
                        <h2>Welcome to the Teacher Dashboard</h2>
                        <p>Select a subject from the sidebar to view details.</p>
                    </div>
                )}

                <div className="subject-cards-container">
                    {subjects.map(subject => (
                        <div key={subject._id} className="subject-card" onClick={() => setActiveSubject(subject)}>
                            {/* <img src={`http://localhost:5000/${subject.coverImage}`} alt={subject.title} className="subject-cover" /> */}
                            <div className="subject-info">
                                <h3>{subject.title}</h3>
                                <p>{subject.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Create Subject Modal */}
            {showCreateModal && (
                <div className="create-subject-modal">
                    <div className="modal-content">
                        <h2>Create New Subject</h2>
                        <form onSubmit={createSubject}>
                            <input type="text" placeholder="Subject Title" value={newSubjectData.title} onChange={(e) => setNewSubjectData({ ...newSubjectData, title: e.target.value })} />
                            <textarea placeholder="Subject Description" value={newSubjectData.description} onChange={(e) => setNewSubjectData({ ...newSubjectData, description: e.target.value })}></textarea>
                            <input type="text" placeholder="Passcode" value={newSubjectData.passcode} onChange={(e) => setNewSubjectData({ ...newSubjectData, passcode: e.target.value })} />
                            <label htmlFor="coverImage">Cover Image:</label>
                            <input type="file" id="coverImage" accept="image/*" onChange={handleCoverImageUpload} />
                            <button id='cc' type="submit">Create Subject</button>
                            <button id='c' type="button" onClick={() => setShowCreateModal(false)}>Cancel</button>
                        </form>
                    </div>
                </div>
            )}

            {showCreateModal1 &&(
                <div>
                    <h1>Notifications</h1>
                </div>
            )}






        </div>
    );
}

export default TeacherDashboard;

