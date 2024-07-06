import React, { useState } from 'react';
import './signupStyles.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import imageTeacher from '../../images/teacher.jpg';
import imageAdmin from '../../images/admin.jpg';
import imageStudent from '../../images/student.jpg';
import image2 from '../../images/Logo.png';

// Modal Styles
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root'); // Set the root element for accessibility

function Navbar({ setActiveOption }) {
  return (
    <nav>
      <a href="/" className="logo-link">
        <img src={image2} alt="Logo" className="logo" />
      </a>
      <div className="options">
        <li className="option" onClick={() => setActiveOption('student')}>Student</li>
        <li className="option" onClick={() => setActiveOption('teacher')}>Teacher</li>
        <li className="option" onClick={() => setActiveOption('admin')}>Admin</li>
      </div>
    </nav>
  );
}

function Content({ activeOption }) {
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const openModal = (message) => {
    setModalMessage(message);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@rguktn\.ac.in$/;
    return regex.test(email);  
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*[!@#$&*]).{8,}$/;
    return regex.test(password);
  };

  const TeacherSignupForm = () => {
    const [formData, setFormData] = useState({
      name: '',
      phoneNumber: '',
      email: '',
      department: '',
      password: '',
      confirmPassword: ''
    });

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
      if (!validateEmail(formData.email)) {
        openModal('Email must be in the format *@rgkt.com');
        return false;
      }
      if (!validatePassword(formData.password)) {
        openModal('Password must be at least 8 characters long, include an uppercase letter and a special character.');
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        openModal('Passwords do not match');
        return false;
      }
      return true;
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (validateForm()) {
        try {
          await axios.post('http://localhost:5000/signup/teacher', formData);
          alert('Signup successful, please login to continue.');
          navigate("/login");
        } catch (error) {
          openModal('Error signing up, please try again.');
        }
      }
    };

    return (
      <div className="signup-form">
        <form onSubmit={handleSubmit}>
          <h2>Teacher Signup</h2>
          <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
          <input type="text" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
          <input type="text" name="department" placeholder="Department" value={formData.department} onChange={handleChange} />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
          <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} />
          <button type="submit">Signup</button>
          <p>If you are an existing user, <Link to="/login">login</Link></p>
        </form>
      </div>
    );
  };

  const AdminSignupForm = () => {
    return (
      <div className="signup-form">
        <form>
          <h2>Admin Signup</h2>
          <h3>Not allowed to signup</h3>
          <p>If you are an existing user, <Link to="/login">login</Link></p>
        </form>
      </div>
    );
  };

  const StudentSignupForm = () => {
    const [formData, setFormData] = useState({
      name: '',
      phoneNumber: '',
      email: '',
      branch: '',
      password: '',
      confirmPassword: ''
    });

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
      if (!validateEmail(formData.email)) {
        openModal('Email must be in the format *@rgkt.com');
        return false;
      }
      if (!validatePassword(formData.password)) {
        openModal('Password must be at least 8 characters long, include an uppercase letter and a special character.');
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        openModal('Passwords do not match');
        return false;
      }
      return true;
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (validateForm()) {
        try {
          await axios.post('http://localhost:5000/signup/student', formData);
          alert('Signup successful! Please login to continue.');
          navigate("/login");
        } catch (error) {
          openModal('Error signing up, please try again.');
        }
      }
    };

    return (
      <div className="signup-form">
        <form onSubmit={handleSubmit}>
          <h2>Student Signup</h2>
          <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
          <input type="text" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
          <input type="text" name="branch" placeholder="Branch" value={formData.branch} onChange={handleChange} />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
          <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} />
          <button type="submit">Signup</button>
          <p>If you are an existing user, <Link to="/login">login</Link></p>
        </form>
      </div>
    );
  };

  return (
    <div className="content">
      <div className="left-side">
        {activeOption === 'student' && <StudentSignupForm />}
        {activeOption === 'teacher' && <TeacherSignupForm />}
        {activeOption === 'admin' && <AdminSignupForm />}
      </div>
      <div className="right-side">
        <h2>Welcome to Our Learning Platform!</h2>
        <p>Sign up now to access our educational resources and start learning.</p>
        {activeOption === 'teacher' && <img src={imageTeacher} alt="Teacher" />}
        {activeOption === 'admin' && <img src={imageAdmin} alt="Admin" />}
        {activeOption === 'student' && <img src={imageStudent} alt="Student" />}
      </div>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Error Modal">
        <h2>Error</h2>
        <div>{modalMessage}</div>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
}

export default function Signup() {
  const [activeOption, setActiveOption] = useState('student');

  return (
    <div className="signup">
      <Navbar setActiveOption={setActiveOption} />
      <Content activeOption={activeOption} />
    </div>
  );
}
