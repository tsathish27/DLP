// import React, { useState, useEffect } from 'react';
// import './lesson.css';
// import axios from 'axios';

// function AddLessons({ courseId }) {
//     const [lessons, setLessons] = useState([]);
//     const [lessonTitle, setLessonTitle] = useState('');
//     const [lessonDescription, setLessonDescription] = useState('');
//     const [lessonFile, setLessonFile] = useState(null);

//     // Fetch lessons when the component mounts or courseId changes
//     useEffect(() => {
//         const fetchLessons = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:5000/lessons`);
//                 setLessons(response.data);
//             } catch (error) {
//                 console.error('Failed to fetch lessons:', error);
//             }
//         };

//         fetchLessons();
//     }, []);

//     // Function to handle lesson creation
//     const addLesson = () => {

//         if (!lessonTitle || !lessonDescription || !lessonFile) {
//             alert('Please fill all fields.');
//             return;
//         }

//         const formData = new FormData();
//         formData.append('title', lessonTitle);
//         formData.append('description', lessonDescription);
//         formData.append('file', lessonFile);
//         formData.append('courseId', courseId);

//         // Post the data to the backend
//         axios.post('http://localhost:5000/lessons', formData, {
//             headers: {
//                 'Content-Type': 'multipart/form-data'
//             }
//         })
//         .then(response => {
//             setLessons([...lessons, response.data]);
//             setLessonTitle('');
//             setLessonDescription('');
//             setLessonFile(null);
//         })
//         .catch(error => {
//             console.error('Error adding lesson:', error);
//         });
//     };

//     // Function to handle file upload
//     const handleFileUpload = (event) => {
//         if (event.target.files && event.target.files[0]) {
//             setLessonFile(event.target.files[0]);
//         }
//     };

//     // Function to download file
//     const handleDownload = (fileUrl) => {
//         const link = document.createElement('a');
//         link.href = fileUrl;
//         link.setAttribute('download', ''); // This may need to be updated based on actual file names
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
//     };

//     return (
//         <div className='l-home'>
//             <div className='l-lesson'>
//                 {lessons.map((lesson) => (
//                     <details key={lesson._id}>
//                         <summary>{lesson.title}</summary>
//                         <div className="lesson-card">
//                             <h4>{lesson.title}</h4>
//                             <p>{lesson.description}</p>
//                             {/* Assuming that lesson.file is a URL */}
//                             <button onClick={() => handleDownload(lesson.file)}>Download File</button>
//                         </div>
//                     </details>
//                 ))}
//             </div>
//             <div className='r-lesson'>
//                 <div className='r-lesson-form'>
//                     <h2>Add Lessons for Course {courseId}</h2>
//                     <form onSubmit={(e) => e.preventDefault()}>
//                         <div>
//                             <label htmlFor="lessonTitle">Lesson Title:</label>
//                             <input type="text" id="lessonTitle" value={lessonTitle} onChange={(e) => setLessonTitle(e.target.value)} />
//                         </div>
//                         <div>
//                             <label htmlFor="lessonDescription">Lesson Description:</label>
//                             <textarea id="lessonDescription" value={lessonDescription} onChange={(e) => setLessonDescription(e.target.value)}></textarea>
//                         </div>
//                         <div>
//                             <label htmlFor="lessonFile">Upload File:</label>
//                             <input type="file" id="lessonFile" accept=".pdf,.doc,.docx,.ppt,.pptx,.txt,.mp4,.avi,.mov" onChange={handleFileUpload} />
//                         </div>
//                         <button type="button" onClick={addLesson}>Add Lesson</button>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default AddLessons;

import React, { useState, useEffect } from 'react';
import './lesson.css';
import axios from 'axios';

function AddLessons({ courseId }) {
    const [lessons, setLessons] = useState([]);
    const [lessonTitle, setLessonTitle] = useState('');
    const [lessonDescription, setLessonDescription] = useState('');
    const [lessonFile, setLessonFile] = useState(null);

    // Fetch lessons when the component mounts or courseId changes
    useEffect(() => {
        const fetchLessons = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/lessons?courseId=${courseId}`);
                setLessons(response.data);
            } catch (error) {
                console.error('Failed to fetch lessons:', error);
            }
        };

        fetchLessons();
    }, [courseId]);

    // Function to handle lesson creation
    const addLesson = async () => {
        if (!lessonTitle || !lessonDescription || !lessonFile) {
            alert('Please fill all fields.');
            return;
        }

        const formData = new FormData();
        formData.append('title', lessonTitle);
        formData.append('description', lessonDescription);
        formData.append('file', lessonFile);
        formData.append('courseId', courseId);

        try {
            const response = await axios.post('http://localhost:5000/lessons', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setLessons([...lessons, response.data]);
            setLessonTitle('');
            setLessonDescription('');
            setLessonFile(null);
        } catch (error) {
            console.error('Error adding lesson:', error);
        }
    };

    // Function to handle file upload
    const handleFileUpload = (event) => {
        if (event.target.files && event.target.files[0]) {
            setLessonFile(event.target.files[0]);
        }
    };

    // Function to download file
    const handleDownload = (fileUrl) => {
        const link = document.createElement('a');
        link.href = fileUrl;
        link.setAttribute('download', ''); // This may need to be updated based on actual file names
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="lessons-container">
            <div className="lesson-list">
                {lessons.map((lesson) => (
                    <details key={lesson._id} className="lesson-details">
                        <summary className="lesson-summary">{lesson.title}</summary>
                        <div className="lesson-content">
                            <h4>{lesson.title}</h4>
                            <p>{lesson.description}</p>
                            <button className="download-btn" onClick={() => handleDownload(lesson.file)}>Download File</button>
                        </div>
                    </details>
                ))}
            </div>
            <div className="lesson-form">
                <h2>Add Lessons for Course {courseId}</h2>
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="form-group">
                        <label htmlFor="lessonTitle">Lesson Title:</label>
                        <input type="text" id="lessonTitle" value={lessonTitle} onChange={(e) => setLessonTitle(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lessonDescription">Lesson Description:</label>
                        <textarea id="lessonDescription" value={lessonDescription} onChange={(e) => setLessonDescription(e.target.value)}></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="lessonFile">Upload File:</label>
                        <input type="file" id="lessonFile" accept=".pdf,.doc,.docx,.ppt,.pptx,.txt,.mp4,.avi,.mov" onChange={handleFileUpload} />
                    </div>
                    <button type="button" className="add-lesson-btn" onClick={addLesson}>Add Lesson</button>
                </form>
            </div>
        </div>
    );
}

export default AddLessons;
