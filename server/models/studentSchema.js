const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const studentSchema = new Schema({
//     name: { type: String, required: true },
//     phoneNumber: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     branch: { type: String, required: true },
//     password: { type: String, required: true },
//     enrolledSubjects: [{ type: Schema.Types.ObjectId, ref: 'Subject' }]
// });

// module.exports = mongoose.model('Student', studentSchema);

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    branch: { type: String, required: true },
    password: { type: String, required: true },
    resetToken: { type: String },
    resetTokenExpiry: { type: Date }
});

module.exports = mongoose.model('Student', studentSchema);
