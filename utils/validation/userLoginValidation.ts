import Joi from 'joi';



const userLoginValidation = Joi.object({

  identifier: Joi.string()
    .email()
    .trim()
    .strict()
    .optional()
   
    .pattern(/^[A-Z0-9]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 'Invalid email format')
    .messages({
      'string.email': 'Invalid email format',
      'string.pattern.base': 'Invalid email format',
      'any.required': 'Please enter your email',
    }),

  // country: Joi.string()
  //   .optional()
  //   .valid(...countries.map((country) => country.code))  
  //   .messages({
  //     'any.only': 'Invalid country code',
  //     'any.required': 'Country is required',
  //   }),

  // phone: Joi.string()
    
  //   .custom((value: any, helpers: any) => {
  //     const { country } = helpers.state.ancestors[0]; 
  //     const selectedCountry = countries.find(c => c.code === country);

  //     if (!selectedCountry) {
  //       return helpers.error('any.invalid');
  //     }

  //     const phoneRegex = new RegExp(`^\\d{${selectedCountry.phoneLength}}$`);
  //     if (!phoneRegex.test(value)) {
  //       return helpers.error('string.pattern.base');
  //     }

  //     return value;
  //   }, 'Phone number validation')
  //   .messages({
  //     'string.empty': 'Phone number is required',
  //     'string.pattern.base': 'Invalid phone number',
  //   }),



  password: Joi.string()
    .required()
    .min(8)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Password validation')
    .messages({
      'string.min': 'Password must be at least 8 characters long',
      'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
      'any.required': 'Please enter your password',
    }),


});

export default userLoginValidation;
