import React, { useState } from 'react';
import './forgotPasswordStyles.css'; // Create this CSS file for styling
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/forgot-password', { email });
            setMessage('A password reset link has been sent to your email address.');
            setTimeout(() => navigate('/login'), 3000); // Redirect after 3 seconds
        } catch (error) {
            console.error('Error sending password reset link:', error.response?.data?.message || error.message);
            setMessage('Failed to send reset link. Please try again.');
        }
    };

    return (
        <div className="forgot-password">
            <h2>Forgot Password</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    value={email}
                    placeholder="Enter your email"
                    onChange={handleEmailChange}
                    required
                />
                <button type="submit">Send Reset Link</button>
                {message && <p>{message}</p>}
            </form>
        </div>
    );
}

export default ForgotPassword;
