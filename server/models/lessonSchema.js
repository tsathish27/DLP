// models/lessonSchema.js

const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
    title: String,
    description: String,
    file: String, // Assuming file is stored as a URL
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }
});

module.exports = mongoose.model('Lesson', lessonSchema);
