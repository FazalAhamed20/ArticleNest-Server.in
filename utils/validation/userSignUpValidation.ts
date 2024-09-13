import Joi from 'joi';


const userSignupValidation = Joi.object({
  firstName: Joi.string()
    .min(4)
    .max(50) 
    .required()
    .messages({
      'string.min': 'Name must be greater than 3 characters',
      'any.required': 'Please enter your first name',
    }),

  lastName: Joi.string()
    .min(4)
    .max(50)
    .required()
    .messages({
      'string.min': 'Name must be greater than 3 characters',
      'any.required': 'Please enter your last name',
    }),

  email: Joi.string()
    .email()
    .trim()
    .strict()
    .required()
    .pattern(/^[A-Z0-9]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 'Invalid email format')
    .messages({
      'string.email': 'Invalid email format',
      'string.pattern.base': 'Invalid email format',
      'any.required': 'Please enter your email',
    }),

  

    phone: Joi.string()
    .pattern(/^\d{10,15}$/)
    .required()
    .messages({
      'string.pattern.base': 'Phone number must be between 10 and 15 digits',
      'any.required': 'Phone number is required',
    }),

  dateOfBirth: Joi.date()
    .max('now')
    .required()
    .messages({
      'date.max': 'Date of birth cannot be in the future',
      'any.required': 'Date of birth is required',
    }),

  password: Joi.string()
    .required()
    .min(8)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Password validation')
    .messages({
      'string.min': 'Password must be at least 8 characters long',
      'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
      'any.required': 'Please enter your password',
    }),

  preferences: Joi.array()
    .items(Joi.string())
    .min(1)
    .required()
    .messages({
      'array.min': 'Select at least one preference',
      'any.required': 'Preferences are required',
    }),


});

export default userSignupValidation;
