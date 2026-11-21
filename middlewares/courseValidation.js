const Joi = require('joi')

const createCourseValidation = (req, res, next) => {
   const courseSchema = Joi.object({
    courseCode: Joi.string().trim().pattern(new RegExp(/^[A-Z]{2,4}[\s-]?\d{3}[A-Z]?$/)).required().messages({
            "any.required": "Course code is required.",
            "string.empty": "Course code cannot be empty",
            "string.pattern.base": "Invalid course code format (e.g., CSC 101",
        }),
    title: Joi.string().trim().pattern(new RegExp(/^[A-Za-z][A-Za-z\s&',.-]{2,99}$/)).required().messages({
            "any.required": "Title is Required",
            "string.empty": "PLease input your Title",
            "string.pattern.base": "Title must be Alphabets and must be 3 characters long",
        }),
    creditUnit: Joi.number().integer().min(1).max(6).required().messages({
    'number.base': 'Credit unit must be a number',
    'number.integer': 'Credit unit must be a whole number',
    'number.min': 'Credit unit must be at least 1',
    'number.max': 'Credit unit cannot exceed 6',
    'any.required': 'Credit unit is required'
  })
   }) 

    const { error } = courseSchema.validate(req.body);

    
    if (error) {
    return res.status(400).json({
      message: error.details[0].message
    })
  }
next()
}

const updateCourseValidation = (req, res, next) => {
   const courseSchema = Joi.object({
    courseCode: Joi.string().trim().pattern(new RegExp(/^[A-Z]{2,4}[\s-]?\d{3}[A-Z]?$/)).optional().messages({
            "any.required": "Course code is required.",
            "string.empty": "Course code cannot be empty",
            "string.pattern.base": "Invalid course code format (e.g., CSC 101",
        }),
    title: Joi.string().trim().pattern(new RegExp(/^[A-Za-z][A-Za-z\s&',.-]{2,99}$/)).required().messages({
            "any.required": "Title is Required",
            "string.empty": "PLease input your Title",
            "string.pattern.base": "Title must be Alphabets and must be 3 characters long",
        }),
    creditUnit: Joi.number().integer().min(1).max(6).optional().messages({
    'number.base': 'Credit unit must be a number',
    'number.integer': 'Credit unit must be a whole number',
    'number.min': 'Credit unit must be at least 1',
    'number.max': 'Credit unit cannot exceed 6',
    'any.required': 'Credit unit is required'
  })
   })

   const { error } = courseSchema.validate(req.body);

    
    if (error) {
    return res.status(400).json({
      message: error.details[0].message
    })
  }
next()
}

module.exports = {
    createCourseValidation,
    updateCourseValidation
}