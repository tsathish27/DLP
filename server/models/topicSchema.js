const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
    title: { type: String, required: true },
    notes: { type: String },
    resources: [{ type: String }],
    video: { type: String },
    moduleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Module', required: true }
});

module.exports = mongoose.model('Topic', topicSchema);
