const departmentModel = require('../models/departments');

exports.createDepartment = async (req, res) => {
    try {
        const {departmentName, faculty} = req.body
        const department = await departmentModel.findOne({departmentName: departmentName.toLowerCase()})

        if (department) {
            return res.status(400).json({
                message: 'Department Already Exist'
            })
        }

        const data = {
            departmentName: departmentName.toLowerCase(),
            faculty
        }

        const newDepartment = await departmentModel.create(data)

        res.status(201).json({
            message: 'Department Created Successfully',
            data: newDepartment
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

exports.getAllDepartments = async (req, res) => {
    try {
        const departments = await departmentModel.find()

        res.status(200).json({
            message: `All Departments Gotten Successfully and the Total is ${departments.length}`,
            data: departments
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

exports.getOneDepartment = async (req, res) => {
    try {
        const {id} = req.params
        const department = await departmentModel.findById(id).populate('courses', 'courseCode, title , creditUnit')

        if (!department) {
            return res.status(404).json({
                message: 'Department Does Not Exist'
            })
        }
    
        res.status(200).json({
            message: 'Department Gotten Successfully',
            data: department
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

exports.updateDepartment = async (req, res) => {
    try {
        const {id} = req.params
        const {departmentName, faculty} = req.body

        const department = await departmentModel.findById(id)

        if (!department) {
            return res.status(404).json({
                message: `Department Does not Exist`
            })
        }

        if (department && department.departmentName !== departmentName) {
            const departmentExist = await departmentModel.findOne({departmentName: departmentName.toLowerCase()})
            if (departmentExist) {
                return res.status(400).json({
                message: `Department: ${departmentName} Already Exist`
            })
        }
            }

        const data = {
            departmentName,
            faculty
        }

        const updatedDepartment = await departmentModel.findByIdAndUpdate(id, data, {new: true})

        res.status(200).json({
            message: 'Department Updated Successfully',
            data: updatedDepartment
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

exports.deleteDepartment = async (req, res) => {
    try {
        const {id} = req.params

        const department = await departmentModel.findById(id)

        if (!department) {
            return res.status(404).json({
                message: `Department Does not Exist`
            })
        }

        await departmentModel.findByIdAndDelete(id)

        res.status(200).json({
            message: 'Department Deleted Successfully '
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}