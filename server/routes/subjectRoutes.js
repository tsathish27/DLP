// routes/subjectRoutes.js

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Subject = require('../models/subjectSchema'); // Adjust accordingly

// Apply authMiddleware to protect these routes
router.post('/subjects', authMiddleware, async (req, res) => {
    // Handle subject creation logic here
    try {
        // Example: Create a new subject
        const newSubject = new Subject({
            title: req.body.title,
            description: req.body.description,
            coverImage: req.file ? req.file.path : null, // Handle cover image upload if needed
            // Add any other fields you need
        });
        const savedSubject = await newSubject.save();
        res.status(201).json(savedSubject);
    } catch (error) {
        console.error('Error creating subject:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


// Route to get all subjects
router.get('/subjects', async (req, res) => {
    try {
        const subjects = await Subject.find();
        res.status(200).json(subjects);
    } catch (error) {
        res.status(500).send('Failed to fetch subjects');
    }
});

// Route to enroll in a subject
router.post('/subjects/:subjectId/enroll', authenticateToken, async (req, res) => {
    try {
        const subject = await Subject.findById(req.params.subjectId);
        if (!subject) {
            return res.status(404).send('Subject not found');
        }
        
        if (!subject.enrolledStudents.includes(req.user._id)) {
            subject.enrolledStudents.push(req.user._id);
            await subject.save();
        }
        
        res.status(200).send('Enrolled successfully');
    } catch (error) {
        res.status(500).send('Failed to enroll');
    }
});

// Route to get subjects the student is enrolled in
router.get('/my-courses', authenticateToken, async (req, res) => {
    try {
        const subjects = await Subject.find({ enrolledStudents: req.user._id });
        res.status(200).json(subjects);
    } catch (error) {
        res.status(500).send('Failed to fetch enrolled courses');
    }
});

// Route to get a subject by ID (including modules and topics)
router.get('/subjects/:subjectId', authenticateToken, async (req, res) => {
    try {
        const subject = await Subject.findById(req.params.subjectId);
        if (!subject) {
            return res.status(404).send('Subject not found');
        }
        
        res.status(200).json(subject);
    } catch (error) {
        res.status(500).send('Failed to fetch subject details');
    }
});

 
// router.post('/subjects/:subjectId/enroll', authenticateToken, async (req, res) => {
//     const { passcode } = req.body;

//     try {
//         const subject = await Subject.findById(req.params.subjectId);
//         if (!subject) return res.status(404).send('Subject not found');
//         if (subject.passcode !== passcode) return res.status(400).send('Incorrect passcode');

//         if (!subject.enrolledStudents.includes(req.user._id)) {
//             subject.enrolledStudents.push(req.user._id);
//             await subject.save();
//         }

//         res.status(200).send('Enrolled successfully');
//     } catch (error) {
//         console.error('Error enrolling in subject:', error);
//         res.status(500).send('Failed to enroll');
//     }
// });




module.exports = router;
