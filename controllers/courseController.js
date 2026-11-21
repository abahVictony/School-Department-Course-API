const courseModel = require('../models/courses');
const departmentModel = require('../models/departments');

exports.createCourse = async (req, res) => {
    try {
        const {departmentId} = req.params
        const {courseCode, title, creditUnit} = req.body
        const course = await courseModel.findOne({courseCode: courseCode.toLowerCase()})

        const department = await departmentModel.findById(departmentId)

        if (!department) {
            return res.status(400).json({
                message: 'A Course Cannot Exist Without a Department'
            })
        }

        if (course) {
            return res.status(400).json({
                message: 'Course Already Exist'
            })
        }

        const data = {
            courseCode: courseCode.toLowerCase(),
            title,
            creditUnit,
            departmentId
        }

        const newCourse = new courseModel(data)

        department.courses.push(newCourse._id)
        await newCourse.save()
        await department.save()

        res.status(201).json({
            message: 'Course Created Successfully',
            data: newCourse
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

exports.getAllCourses = async (req, res) => {
    try {
        const courses = await courseModel.find()

        res.status(200).json({
            message: `All Courses Gotten Successfully and the Total is ${courses.length}`,
            data: courses
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

exports.getOneCourse = async (req, res) => {
    try {
        const {id} = req.params
        const course = await courseModel.findById(id).populate('departmentId', 'departmentName, faculty')

        if (!course) {
            return res.status(404).json({
                message: 'Course Does Not Exist'
            })
        }
    
        res.status(200).json({
            message: 'Course Gotten Successfully',
            data: course
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

exports.updateCourse = async (req, res) => {
    try {
        const {id} = req.params
        const {courseCode, title, creditUnit} = req.body

        const course = await courseModel.findById(id)

        if (!course) {
            return res.status(404).json({
                message: `Course Does not Exist`
            })
        }

        if (course && course.courseCode !== courseCode) {
            const courseExist = await courseModel.findOne({courseCode})
            if (courseExist) {
                return res.status(400).json({
                message: `Course Code: ${courseCode} Already Exist`
            })
        }
            }

        const data = {
            courseCode,
            title,
            creditUnit
        }

        const updatedCourse = await courseModel.findByIdAndUpdate(id, data, {new: true})

        res.status(200).json({
            message: 'Course Updated Successfully',
            data: updatedCourse
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

exports.deleteCourse = async (req, res) => {
    try {
        const {id} = req.params

        const course = await courseModel.findById(id)

        if (!course) {
            return res.status(404).json({
                message: `Course Does not Exist`
            })
        }

        await courseModel.findByIdAndDelete(id)

        res.status(200).json({
            message: 'Course Deleted Successfully '
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}