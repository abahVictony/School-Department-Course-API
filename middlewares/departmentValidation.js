const Joi = require('joi')

const createDepartmentValidation = (req, res, next) => {
   const departmentSchema = Joi.object({
    departmentName: Joi.string().trim().pattern(new RegExp(/^[A-Za-z][A-Za-z\s&',.-]{2,99}$/)).required().messages({
            "any.required": "Department is Required",
            "string.empty": "PLease input your Department",
            "string.pattern.base": "Department must be Alphabets and must be 3 characters long",
        }),
    faculty: Joi.string().trim().pattern(new RegExp(/^[A-Za-z][A-Za-z\s&',.-]{2,99}$/)).required().messages({
            "any.required": "Faculty is Required",
            "string.empty": "PLease input your Faculty",
            "string.pattern.base": "Faculty must be Alphabets and must be 3 characters long",
        }),
   }) 

   const { error } = departmentSchema.validate(req.body);

    // console.log(error.details);
    
  if (error) {
    return res.status(400).json({
      message: error.details[0].message
    })
  }
next()
}

const updateDepartmentValidation = (req, res, next) => {
   const departmentSchema = Joi.object({
    departmentName: Joi.string().trim().pattern(new RegExp(/^[A-Za-z][A-Za-z\s&',.-]{2,99}$/)).optional().messages({
            "any.required": "Department is Required",
            "string.empty": "PLease input your Department",
            "string.pattern.base": "Department must be Alphabets and must be 3 characters long",
        }),
    faculty: Joi.string().trim().pattern(new RegExp(/^[A-Za-z][A-Za-z\s&',.-]{2,99}$/)).optional().messages({
            "any.required": "Faculty is Required",
            "string.empty": "PLease input your Faculty",
            "string.pattern.base": "Faculty must be Alphabets and must be 3 characters long",
        }),
   })

   const { error } = departmentSchema.validate(req.body);

    // console.log(error.details);
    
  if (error) {
    return res.status(400).json({
      message: error.details[0].message
    })
  }
next()
}

module.exports = {
    createDepartmentValidation,
    updateDepartmentValidation
}