// const nodemailer = require('nodemailer');
// require('dotenv').config();

// console.log('GMAIL_USER:', process.env.GMAIL_USER);
// console.log('GMAIL_APP_PASSWORD:', process.env.GMAIL_APP_PASSWORD);

// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: process.env.GMAIL_USER,
//         pass: process.env.GMAIL_APP_PASSWORD
//     }
// });

// const mailOptions = {
//     from: process.env.GMAIL_USER,
//     to: '22695A0529@mits.ac.in',
//     subject: 'Test Email',
//     text: 'This is a test email sent from Nodemailer.'
// };

// transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//         console.error('Error sending test email:', error);
//     } else {
//         console.log('Test email sent:', info.response);
//     }
// });

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const multer = require('multer');
require('dotenv').config();
const authMiddleware = require('./middleware/authMiddleware'); 

const app = express();
const port = 5000;

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/DLP', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

// Middleware
app.use(cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({
    storage
    // limits: { fileSize: 1000000 }, // 1MB limit
    // fileFilter: (req, file, cb) => {
    //     if (file.mimetype === 'application/pdf' || file.mimetype.startsWith('video/')) {
    //         cb(null, true);
    //     } else {
    //         cb(new Error('Invalid file type'));
    //     }
    // }
}).fields([
    { name: 'notes', maxCount: 1 },
    { name: 'additionalResources', maxCount: 1 },
]);

// Models
const Student = require('./models/studentSchema');
const Teacher = require('./models/teacherSchema');
const Subject = require('./models/subjectSchema');
// const Notification = require('./models/notificationSchema');
const Assignment = require('./models/assignmentSchema');

// Signup routes
app.post('/signup/student', async (req, res) => {
    const { name, phoneNumber, email, branch, password } = req.body;

    try {
        const existingStudent = await Student.findOne({ email });
        if (existingStudent) {
            return res.status(400).json({ message: 'Student already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const student = new Student({ name, phoneNumber, email, branch, password: hashedPassword });
        await student.save();
        res.status(201).json({ message: 'Student registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering student', error });
    }
});

app.post('/signup/teacher', async (req, res) => {
    const { name, phoneNumber, email, department, password } = req.body;

    try {
        const existingTeacher = await Teacher.findOne({ email });
        if (existingTeacher) {
            return res.status(400).json({ message: 'Teacher already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const teacher = new Teacher({ name, phoneNumber, email, department, password: hashedPassword });
        await teacher.save();
        res.status(201).json({ message: 'Teacher registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering teacher', error });
    }
});

// Login routes
app.post('/login/student', async (req, res) => {
    const { email, password } = req.body;

    try {
        const student = await Student.findOne({ email });
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        const isMatch = await bcrypt.compare(password, student.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ user: { id: student._id, email: student.email, role: 'student' } }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Student logged in successfully', token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in student', error });
    }
});

app.post('/login/teacher', async (req, res) => {
    const { email, password } = req.body;

    try {
        const teacher = await Teacher.findOne({ email });
        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }

        const isMatch = await bcrypt.compare(password, teacher.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ user: { id: teacher._id, email: teacher.email, role: 'teacher' } }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Teacher logged in successfully', token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in teacher', error });
    }
});

// Subject routes
app.post('/subjects', upload, async (req, res) => {
    const { title, description, passcode } = req.body;
    const coverImage = req.files['coverImage'] ? req.files['coverImage'][0].path : null;

    try {
        if (!title || !description || !passcode) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const newSubject = new Subject({ title, description, coverImage, passcode });
        await newSubject.save();
        res.status(201).json(newSubject);
    } catch (error) {
        res.status(500).json({ message: 'Error creating subject', error: error.message });
    }
});

app.get('/subjects', async (req, res) => {
    try {
        const subjects = await Subject.find();
        res.json(subjects);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get('/subjects/:id', async (req, res) => {
    try {
        const subject = await Subject.findById(req.params.id);
        if (!subject) return res.status(404).send('Subject not found');
        res.json(subject);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.post('/subjects/:id/modules', async (req, res) => {
    const { title, description } = req.body;
    try {
        const subject = await Subject.findById(req.params.id);
        if (!subject) return res.status(404).send('Subject not found');

        subject.modules = subject.modules || [];
        subject.modules.push({ title, description, topics: [] });
        await subject.save();

        res.status(201).json(subject);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.post('/subjects/:subjectId/modules/:moduleId/topics', upload, async (req, res) => {
    const { title } = req.body;
    const notesFilePath = req.files['notes'] ? req.files['notes'][0].path : null;
    const additionalResourcesFilePath = req.files['additionalResources'] ? req.files['additionalResources'][0].path : null;

    try {
        const subject = await Subject.findById(req.params.subjectId);
        if (!subject) {
            return res.status(404).send('Subject not found');
        }

        const module = subject.modules.id(req.params.moduleId);
        if (!module) {
            return res.status(404).send('Module not found');
        }

        const newTopic = { title, notes: notesFilePath, additionalResources: additionalResourcesFilePath };
        module.topics.push(newTopic);
        await subject.save();

        res.status(201).json(newTopic);
    } catch (error) {
        res.status(500).send('Failed to create topic. Please try again.');
    }
});

// Enrollment
app.post('/subjects/:subjectId/enroll', authMiddleware, async (req, res) => {
    const { passcode } = req.body;
    const studentId = req.user.id;

    try {
        const subject = await Subject.findById(req.params.subjectId);
        if (!subject) return res.status(404).send('Subject not found');

        if (subject.passcode !== passcode) {
            return res.status(400).send('Incorrect passcode');
        }

        if (!subject.enrolledStudents.includes(studentId)) {
            subject.enrolledStudents.push(studentId);
            await subject.save();
        }

        const student = await Student.findById(studentId);
        if (!student) return res.status(404).send('Student not found');

        if (!student.enrolledSubjects.includes(req.params.subjectId)) {
            student.enrolledSubjects.push(req.params.subjectId);
            await student.save();

            // Create a notification
            const notification = new Notification({
                title: 'Enrolled in New Subject',
                message: `You have successfully enrolled in ${subject.title}.`,
                recipient: studentId
            });
            await notification.save();
        }

        res.status(200).send('Enrolled successfully');
    } catch (error) {
        res.status(500).send('Failed to enroll');
    }
});

app.get('/student/enrolled-subjects', authMiddleware, async (req, res) => {
    const studentId = req.user.id;

    try {
        const student = await Student.findById(studentId).populate('enrolledSubjects');
        if (!student) return res.status(404).send('Student not found');

        res.json(student.enrolledSubjects);
    } catch (error) {
        res.status(500).send('Failed to fetch enrolled subjects');
    }
});

// Notifications
app.get('/notifications', authMiddleware, async (req, res) => {
    const studentId = req.user.id;

    try {
        const notifications = await Notification.find({ recipient: studentId });
        res.json(notifications);
    } catch (error) {
        res.status(500).send('Failed to fetch notifications');
    }
});

app.get('/notifications/unread', authMiddleware, async (req, res) => {
    const studentId = req.user.id;

    try {
        const notifications = await Notification.find({ recipient: studentId, read: false });
        res.json(notifications);
    } catch (error) {
        res.status(500).send('Failed to fetch notifications');
    }
});

app.put('/notifications/:id/read', authMiddleware, async (req, res) => {
    const notificationId = req.params.id;

    try {
        const notification = await Notification.findById(notificationId);
        if (!notification) return res.status(404).send('Notification not found');

        if (notification.recipient.toString() !== req.user.id) {
            return res.status(403).send('Not authorized to mark this notification as read');
        }

        notification.read = true;
        await notification.save();

        res.status(200).json({ message: 'Notification marked as read' });
    } catch (error) {
        res.status(500).send('Failed to mark notification as read');
    }
});

// Fetch all notifications for a teacher
app.get('/teacher/notifications', authMiddleware, async (req, res) => {
    const teacherId = req.user.id;

    try {
        const notifications = await Notification.find({ recipient: teacherId });
        res.json(notifications);
    } catch (error) {
        res.status(500).send('Failed to fetch notifications');
    }
});

// Fetch unread notifications for a teacher
app.get('/teacher/notifications/unread', authMiddleware, async (req, res) => {
    const teacherId = req.user.id;

    try {
        const notifications = await Notification.find({ recipient: teacherId, read: false });
        res.json(notifications);
    } catch (error) {
        res.status(500).send('Failed to fetch notifications');
    }
});

// Mark a teacher's notification as read
app.put('/teacher/notifications/:id/read', authMiddleware, async (req, res) => {
    const notificationId = req.params.id;

    try {
        const notification = await Notification.findById(notificationId);
        if (!notification) return res.status(404).send('Notification not found');

        if (notification.recipient.toString() !== req.user.id) {
            return res.status(403).send('Not authorized to mark this notification as read');
        }

        notification.read = true;
        await notification.save();

        res.status(200).json({ message: 'Notification marked as read' });
    } catch (error) {
        res.status(500).send('Failed to mark notification as read');
    }
});

// Student Profile
app.get('/student/profile', authMiddleware, async (req, res) => {
    const studentId = req.user.id;

    try {
        const student = await Student.findById(studentId);
        if (!student) return res.status(404).send('Student not found');

        res.json(student);
    } catch (error) {
        res.status(500).send('Failed to fetch profile');
    }
});

// Fetch teacher profile
app.get('/teacher/profile', authMiddleware, async (req, res) => {
    const teacherId = req.user.id;
    
    try {
        const teacher = await Teacher.findById(teacherId);
        if (!teacher) return res.status(404).send('Teacher not found');
        res.json(teacher);
    } catch (error) {
        res.status(500).send('Failed to fetch profile');
    }
});

// Assignments
app.post('/assignments', authMiddleware, async (req, res) => {
    const { title, description, link, dueDate, subjectId } = req.body;

    try {
        const newAssignment = new Assignment({ title, description, link, dueDate, subject: subjectId });
        await newAssignment.save();
        res.status(201).json(newAssignment);
    } catch (error) {
        res.status(500).send('Failed to create assignment');
    }
});

app.get('/assignments', authMiddleware, async (req, res) => {
    try {
        const assignments = await Assignment.find().populate('subject');
        res.json(assignments);
    } catch (error) {
        res.status(500).send('Failed to fetch assignments');
    }
});

app.get('/subjects/:subjectId/assignments', authMiddleware, async (req, res) => {
    try {
        const assignments = await Assignment.find({ subject: req.params.subjectId }).populate('subject');
        res.json(assignments);
    } catch (error) {
        res.status(500).send('Failed to fetch assignments for subject');
    }
});

app.put('/assignments/:id', authMiddleware, async (req, res) => {
    const { title, description, link, dueDate, subjectId } = req.body;

    try {
        const updatedAssignment = await Assignment.findByIdAndUpdate(
            req.params.id,
            { title, description, link, dueDate, subject: subjectId },
            { new: true }
        );
        if (!updatedAssignment) return res.status(404).send('Assignment not found');
        res.json(updatedAssignment);
    } catch (error) {
        res.status(500).send('Failed to update assignment');
    }
});

app.delete('/assignments/:id', authMiddleware, async (req, res) => {
    try {
        const deletedAssignment = await Assignment.findByIdAndDelete(req.params.id);
        if (!deletedAssignment) return res.status(404).send('Assignment not found');
        res.status(200).send('Assignment deleted successfully');
    } catch (error) {
        res.status(500).send('Failed to delete assignment');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});