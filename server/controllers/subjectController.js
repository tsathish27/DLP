// controllers/subjectController.js

const Subject = require('../models/subjectSchema');

const createSubject = async (req, res) => {
    const { title, description } = req.body;
    const coverImage = req.file ? req.file.path : null;

    try {
        const newSubject = new Subject({
            title,
            description,
            coverImage,
            createdBy: req.user.id
        });

        await newSubject.save();
        res.status(201).json(newSubject);
    } catch (error) {
        console.error('Error creating subject:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { createSubject };
