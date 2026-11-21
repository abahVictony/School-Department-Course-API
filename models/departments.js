const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
    departmentName: {
        type: String,
        required: true
    },
    faculty: {
        type: String,
        required: true,
    },
    courses: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Courses"
    }]
})

const departmentModel = mongoose.model('Departments', departmentSchema)

module.exports = departmentModel