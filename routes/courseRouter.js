const router = require('express').Router();

const { createCourse, getAllCourses, getOneCourse, updateCourse, deleteCourse } = require('../controllers/courseController');
const { createCourseValidation, updateCourseValidation } = require('../middlewares/courseValidation');

router.post('/newCourse/:departmentId', createCourseValidation, createCourse)
router.get('/allCourse', getAllCourses)
router.get('/oneCourse/:id', getOneCourse)
router.patch('/updateCourse/:id',updateCourseValidation, updateCourse)
router.delete('/deleteCourse/:id', deleteCourse)

module.exports = router