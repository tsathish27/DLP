// import React, { useState } from 'react';
// import axios from 'axios';
// import './enroll.css' 

// const Enroll = ({ subjectId }) => {
//   const [passcode, setPasscode] = useState('');
//   const [error, setError] = useState(null);
//   const [enrolled, setEnrolled] = useState(false); // New state variable

//   const enrollInSubject = async () => {
//     try {
//       await axios.post(`http://localhost:5000/subjects/${subjectId}/enroll`, { passcode }, {
//         headers: {
//           'Authorization': `Bearer ${localStorage.getItem('token')}`
//         }
//       });
//       alert('Enrolled successfully');
//       setError(null); // Clear error if successful
//       setEnrolled(true); // Update enrolled state to true
//     } catch (error) {
//       console.error('Error enrolling in subject:', error);
//       setError('Failed to enroll. Please check the passcode and try again.');
//     }
//   };

//   return (
//     <div className='enroll1'>
//       {!enrolled && (
//         <>
//           <input
//             type="text"
//             placeholder="Enter passcode"
//             value={passcode}
//             onChange={(e) => setPasscode(e.target.value)}
//             disabled={enrolled} // Disable input if enrolled is true
//           />
//           <button onClick={enrollInSubject} disabled={enrolled}>Enroll</button> {/* Disable button if enrolled is true */}
//         </>
//       )}
//       {error && <div>{error}</div>}
//     </div>
//   );
// };

// export default Enroll;

import React, { useState } from 'react';
import axios from 'axios';
import './enroll.css' 

const Enroll = ({ subjectId }) => {
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState(null);
  const [enrolled, setEnrolled] = useState(false); // New state variable

  const enrollInSubject = async () => {
    try {
      await axios.post(`http://localhost:5000/subjects/${subjectId}/enroll`, { passcode }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      alert('Enrolled successfully');
      setError(null); // Clear error if successful
      setEnrolled(true); // Update enrolled state to true
    } catch (error) {
      console.error('Error enrolling in subject:', error);
      setError('Failed to enroll. Please check the passcode and try again.');
    }
  };

  return (
    <div className='enroll1'>
      {!enrolled && (
        <>
          <input
            type="text"
            placeholder="Enter passcode"
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            disabled={enrolled} // Disable input if enrolled is true
          />
          <button onClick={enrollInSubject} disabled={enrolled}>Enroll</button> {/* Disable button if enrolled is true */}
        </>
      )}
      {error && <div>{error}</div>}
    </div>
  );
};

export default Enroll;
