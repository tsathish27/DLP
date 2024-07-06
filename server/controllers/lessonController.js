// controllers/lessonController.js

const Course = require('../models/courseSchema');
const Lesson = require('../models/lessonSchema');

const addLesson = async (req, res) => {
    const { title, description, file } = req.body;
    const courseId = req.params.courseId;
    const teacherId = req.user.id; // Assuming teacher ID is stored in req.user.id after authentication

    try {
        // Check if the teacher owns the course
        const course = await Course.findOne({ _id: courseId, teacher: teacherId });
        if (!course) {
            return res.status(403).json({ message: 'You do not have permission to add lessons to this course' });
        }

        const lesson = new Lesson({ title, description, file, course: courseId });
        await lesson.save();

        // Add lesson to the course
        course.lessons.push(lesson);
        await course.save();

        res.status(201).json(lesson);
    } catch (error) {
        res.status(500).json({ message: 'Error adding lesson', error });
    }
};

module.exports = { addLesson };
