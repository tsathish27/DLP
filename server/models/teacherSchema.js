const mongoose = require('mongoose');

// const teacherSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     phoneNumber: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     department: { type: String, required: true },
//     password: { type: String, required: true }
// });

// module.exports = mongoose.model('Teacher', teacherSchema);

const teacherSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    department: { type: String, required: true },
    password: { type: String, required: true },
    resetToken: { type: String },
    resetTokenExpiry: { type: Date }
    // other fields...
});

module.exports = mongoose.model('Teacher', teacherSchema);
