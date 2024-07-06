import React, { useState } from 'react';
import './resetPasswordStyles.css';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

function ResetPassword() {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');

    const handlePasswordChange = (event) => {
        setNewPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setMessage('Passwords do not match.');
            return;
        }

        try {
            await axios.post(`http://localhost:5000/reset-password/${token}`, { newPassword });
            setMessage('Password has been reset successfully.');
            setTimeout(() => navigate('/login'), 3000); // Redirect after 3 seconds
        } catch (error) {
            console.error('Error resetting password:', error.response?.data?.message || error.message);
            setMessage('Failed to reset password. Please try again.');
        }
    };

    return (
        <div className="reset-password">
            <h2>Reset Password</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    name="newPassword"
                    value={newPassword}
                    placeholder="New Password"
                    onChange={handlePasswordChange}
                    required
                />
                <input
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    placeholder="Confirm Password"
                    onChange={handleConfirmPasswordChange}
                    required
                />
                <button type="submit">Reset Password</button>
                {message && <p>{message}</p>}
            </form>
        </div>
    );
}

export default ResetPassword;
