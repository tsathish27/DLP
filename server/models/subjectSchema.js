const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const topicSchema = new Schema({
    title: { type: String, required: true },
    notes: { type: String },
    additionalResources: { type: String }
});

const moduleSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    topics: [topicSchema]
});

const subjectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    coverImage: { type: String, default: null },
    enrolledStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
    passcode: { type: String, required: true },
    modules: [moduleSchema]
});

 


module.exports = mongoose.model('Subject', subjectSchema);

