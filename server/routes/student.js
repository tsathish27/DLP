// routes/student.js

const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

// Student Login Endpoint
router.post('/', async (req, res) => {
    const { email, password } = req.body;
    const role = 'student';

    try {
        const user = await User.findOne({ email, role });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.password !== password) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // You can send additional data if needed
        res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
