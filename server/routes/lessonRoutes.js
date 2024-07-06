// routes/lessonRoutes.js

const express = require('express');
const lessonController = require('../controllers/lessonController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Add lesson to a specific course
router.post('/:courseId/lessons', authMiddleware, lessonController.addLesson);

module.exports = router;
