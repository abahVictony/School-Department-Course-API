const router = require('express').Router();

const { createDepartment, getAllDepartments, getOneDepartment, updateDepartment, deleteDepartment } = require('../controllers/departmentController');
const { createDepartmentValidation, updateDepartmentValidation } = require('../middlewares/departmentValidation');

router.post('/newDepartment',createDepartmentValidation, createDepartment)
router.get('/allDepartment', getAllDepartments)
router.get('/oneDepartment/:id', getOneDepartment)
router.patch('/updateDepartment/:id',updateDepartmentValidation, updateDepartment)
router.delete('/deleteDepartment/:id', deleteDepartment)

module.exports = router