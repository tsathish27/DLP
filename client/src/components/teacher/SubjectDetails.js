 
// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import './subjectDetails.css';

// function SubjectDetails() {
//     const { subjectId } = useParams();
//     const [subject, setSubject] = useState(null);
//     const [modules, setModules] = useState([]);
//     const [showModuleModal, setShowModuleModal] = useState(false);
//     const [newModuleData, setNewModuleData] = useState({ title: '', description: '' });
//     const [showTopicModal, setShowTopicModal] = useState(false);
//     const [newTopicData, setNewTopicData] = useState({ module: '', title: '', notes: null, additionalResources: '' });
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         fetchSubjectDetails();
//     }, []);

//     const fetchSubjectDetails = async () => {
//         try {
//             const response = await axios.get(`http://localhost:5000/subjects/${subjectId}`);
//             setSubject(response.data);
//             setModules(response.data.modules || []);
//             setLoading(false);
//         } catch (error) {
//             console.error('Error fetching subject details:', error);
//             setError('Failed to fetch subject details. Please try again later.');
//             setLoading(false);
//         }
//     };

//     const createModule = async (event) => {
//         event.preventDefault();

//         if (!newModuleData.title || !newModuleData.description) {
//             alert("Please fill in all fields.");
//             return;
//         }

//         const token = localStorage.getItem('token');

//         try {
//             const response = await axios.post(`http://localhost:5000/subjects/${subjectId}/modules`, newModuleData, {
//                 headers: {
//                     'Authorization': `Bearer ${token}`
//                 }
//             });

//             setModules([...modules, response.data]);
//             setShowModuleModal(false);
//             setNewModuleData({ title: '', description: '' });
//         } catch (error) {
//             console.error('Error creating module:', error);
//             alert('Failed to create module. Please try again.');
//         }
//     };

//     const createTopic = async (event, moduleId) => {
//         event.preventDefault();

//         if (!newTopicData.module || !newTopicData.title || !newTopicData.notes) {
//             setError("Please fill in all required fields.");
//             return;
//         }

//         const formData = new FormData();
//         formData.append('module', newTopicData.module);
//         formData.append('title', newTopicData.title);
//         formData.append('notes', newTopicData.notes);
//         formData.append('additionalResources', newTopicData.additionalResources);

//         const token = localStorage.getItem('token');

//         try {
//             const response = await axios.post(`http://localhost:5000/subjects/${subjectId}/topics`, formData, {
//                 headers: {
//                     'Authorization': `Bearer ${token}`,
//                     'Content-Type': 'multipart/form-data'
//                 }
//             });

//             const updatedModules = modules.map(module =>
//                 module._id === moduleId
//                     ? { ...module, topics: [...(module.topics || []), response.data] }
//                     : module
//             );
//             setModules(updatedModules);
//             setShowTopicModal(false);
//             setNewTopicData({ module: '', title: '', notes: null, additionalResources: '' });
//         } catch (error) {
//             console.error('Error creating topic:', error);
//             setError('Failed to create topic. Please try again.');
//         }
//     };

//     const handleTopicNotesUpload = (event) => {
//         setNewTopicData({ ...newTopicData, notes: event.target.files[0] });
//     };

//     const handleAdditionalResourcesUpload = (event) => {
//         setNewTopicData({ ...newTopicData, additionalResources: event.target.files[0] });
//     };

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     if (error) {
//         return <div>Error: {error}</div>;
//     }

//     return (
//         <div className="subject-details">
//             <div className="sidebar1">
//             <button className="add-module-btn" onClick={() => setShowModuleModal(true)}>Add Module</button>
//             <button className="add-topic-btn" onClick={() => setShowTopicModal(true)}>Add Topic</button>
//             <button className="edit-module-topic-btn">Edit</button>
//             </div>

//             <div className="main-content">
//             <h2>{subject.title}</h2>
//             <p>{subject.description}</p>
//             {modules.map(module => (
//                 <div key={module._id} className="module">
//                 <h3>{module.title}</h3>
//                 <p>{module.description}</p>
//                 {module.topics && module.topics.length > 0 && (
//                     <ul>
//                     {module.topics.map(topic => (
//                         <li key={topic._id}>
//                         <h4>{topic.title}</h4>
//                         <p>Notes: {topic.notes}</p>
//                         {topic.additionalResources && (
//                             <p>Additional Resources: {topic.additionalResources}</p>
//                         )}
//                         </li>
//                     ))}
//                     </ul>
//                 )}
//                 </div>
//             ))}
//             </div>

//             {showModuleModal && (
//             <div className="create-module-modal">
//                 <div className="modal-content">
//                 <h2>Create New Module</h2>
//                 <form onSubmit={createModule}>
//                     <input type="text" placeholder="Module Title" value={newModuleData.title} onChange={(e) => setNewModuleData({ ...newModuleData, title: e.target.value })} />
//                     <textarea placeholder="Module Description" value={newModuleData.description} onChange={(e) => setNewModuleData({ ...newModuleData, description: e.target.value })}></textarea>
//                     <button type="submit">Create Module</button>
//                     <button type="button" onClick={() => setShowModuleModal(false)}>Cancel</button>
//                 </form>
//                 </div>
//             </div>
//             )}

//             {showTopicModal && (
//             <div className="create-topic-modal">
//                 <div className="modal-content">
//                 <h2>Create New Topic</h2>
//                 <form onSubmit={(e) => createTopic(e, newTopicData.module)}>
//                     <select value={newTopicData.module} onChange={(e) => setNewTopicData({ ...newTopicData, module: e.target.value })}>
//                     <option value="">Select Module</option>
//                     {modules.map(module => (
//                         <option key={module._id} value={module._id}>{module.title}</option>
//                     ))}
//                     </select>
//                     <input type="text" placeholder="Topic Title" value={newTopicData.title} onChange={(e) => setNewTopicData({ ...newTopicData, title: e.target.value })} />
//                     <input type="file" accept=".pdf" onChange={handleTopicNotesUpload} />
//                     <input type="file" accept="video/*" onChange={handleAdditionalResourcesUpload} />
//                     <button type="submit">Create Topic</button>
//                     <button type="button" onClick={() => setShowTopicModal(false)}>Cancel</button>
//                 </form>
//                 </div>
//             </div>
//             )}
//         </div>
//         );
// }

// export default SubjectDetails;


import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './subjectDetails.css';

function SubjectDetails() {
    const { subjectId } = useParams();
    const [subject, setSubject] = useState(null);
    const [modules, setModules] = useState([]);
    const [expandedModules, setExpandedModules] = useState({});
    const [showModuleModal, setShowModuleModal] = useState(false);
    const [newModuleData, setNewModuleData] = useState({ title: '', description: '' });
    const [showTopicModal, setShowTopicModal] = useState(false);
    const [newTopicData, setNewTopicData] = useState({ module: '', title: '', notes: null, additionalResources: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchSubjectDetails();
    }, []);

    const fetchSubjectDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/subjects/${subjectId}`);
            setSubject(response.data);
            setModules(response.data.modules || []);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching subject details:', error);
            setError('Failed to fetch subject details. Please try again later.');
            setLoading(false);
        }
    };

    const createModule = async (event) => {
        event.preventDefault();

        if (!newModuleData.title || !newModuleData.description) {
            alert("Please fill in all fields.");
            return;
        }

        const token = localStorage.getItem('token');

        try {
            const response = await axios.post(`http://localhost:5000/subjects/${subjectId}/modules`, newModuleData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            setModules([...modules, response.data]);
            setShowModuleModal(false);
            setNewModuleData({ title: '', description: '' });
        } catch (error) {
            console.error('Error creating module:', error);
            alert('Failed to create module. Please try again.');
        }
    };

    const createTopic = async (event, moduleId) => {
        event.preventDefault();

        if (!newTopicData.module || !newTopicData.title || !newTopicData.notes) {
            setError("Please fill in all required fields.");
            return;
        }

        const formData = new FormData();
        formData.append('module', newTopicData.module);
        formData.append('title', newTopicData.title);
        formData.append('notes', newTopicData.notes);
        formData.append('additionalResources', newTopicData.additionalResources);

        const token = localStorage.getItem('token');

        try {
            const response = await axios.post(`http://localhost:5000/subjects/${subjectId}/topics`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            const updatedModules = modules.map(module =>
                module._id === moduleId
                    ? { ...module, topics: [...(module.topics || []), response.data] }
                    : module
            );
            setModules(updatedModules);
            setShowTopicModal(false);
            setNewTopicData({ module: '', title: '', notes: null, additionalResources: '' });
        } catch (error) {
            console.error('Error creating topic:', error);
            setError('Failed to create topic. Please try again.');
        }
    };

    const handleTopicNotesUpload = (event) => {
        setNewTopicData({ ...newTopicData, notes: event.target.files[0] });
    };

    const handleAdditionalResourcesUpload = (event) => {
        setNewTopicData({ ...newTopicData, additionalResources: event.target.files[0] });
    };

    const toggleModule = (moduleId) => {
        setExpandedModules({
            ...expandedModules,
            [moduleId]: !expandedModules[moduleId],
        });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="subject-details">

           

            <div className="sidebar1">
                <button className="add-module-btn" onClick={() => setShowModuleModal(true)}>Add Module</button>
                <button className="add-topic-btn" onClick={() => setShowTopicModal(true)}>Add Topic</button>
                <button className="edit-module-topic-btn">Edit</button>
            </div>

            <div className="main-content">

            <div className="back_btn">
                <button className="back-btn" onClick={() => window.history.back()}>Back</button>
            </div>


                <h2>{subject.title}</h2>
                <p>{subject.description}</p>
                {modules.map(module => (
                    <div key={module._id} className="module">
                        <h3 onClick={() => toggleModule(module._id)}>{module.title}</h3>
                        <p>{module.description}</p>
                        {expandedModules[module._id] && module.topics && module.topics.length > 0 && (
                            <ul>
                                {module.topics.map(topic => (
                                    <li key={topic._id}>
                                        <h4>{topic.title}</h4>
                                        <p>Notes: {topic.notes}</p>
                                        {topic.additionalResources && (
                                            <p>Additional Resources: {topic.additionalResources}</p>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))}
            </div>

            {showModuleModal && (
                <div className="create-module-modal">
                    <div className="modal-content">
                        <h2>Create New Module</h2>
                        <form onSubmit={createModule}>
                            <input type="text" placeholder="Module Title" value={newModuleData.title} onChange={(e) => setNewModuleData({ ...newModuleData, title: e.target.value })} />
                            <textarea placeholder="Module Description" value={newModuleData.description} onChange={(e) => setNewModuleData({ ...newModuleData, description: e.target.value })}></textarea>
                            <button type="submit">Create Module</button>
                            <button type="button" onClick={() => setShowModuleModal(false)}>Cancel</button>
                        </form>
                    </div>
                </div>
            )}

            {showTopicModal && (
                <div className="create-topic-modal">
                    <div className="modal-content">
                        <h2>Create New Topic</h2>
                        <form onSubmit={(e) => createTopic(e, newTopicData.module)}>
                            <select value={newTopicData.module} onChange={(e) => setNewTopicData({ ...newTopicData, module: e.target.value })}>
                                <option value="">Select Module</option>
                                {modules.map(module => (
                                    <option key={module._id} value={module._id}>{module.title}</option>
                                ))}
                            </select>
                            <input type="text" placeholder="Topic Title" value={newTopicData.title} onChange={(e) => setNewTopicData({ ...newTopicData, title: e.target.value })} />
                            <input type="file" accept=".pdf" onChange={handleTopicNotesUpload} />
                            <input type="file" accept="video/*" onChange={handleAdditionalResourcesUpload} />
                            <button type="submit">Create Topic</button>
                            <button type="button" onClick={() => setShowTopicModal(false)}>Cancel</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SubjectDetails;
