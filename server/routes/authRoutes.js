const express = require('express');
const router = express.Router();
const sendResetLink = require('../sendResetLink'); // Adjust the path if necessary
const Student = require('../models/studentSchema');
const Teacher = require('../models/teacherSchema');
const jwt = require('jsonwebtoken');

router.post('/forgot-password', async (req, res) => {
    const { email, role } = req.body;
    try {
        const user = role === 'student' ? await Student.findOne({ email }) : await Teacher.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const resetToken = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        await sendResetLink(email, resetToken);

        res.status(200).json({ message: 'Reset link sent to your email' });
    } catch (error) {
        console.error('Error handling forgot password:', error);
        res.status(500).json({ message: 'Failed to send reset link. Please try again.' });
    }
});

module.exports = router;
