const { body, param, validationResult } = require('express-validator');

const validateRegister = [
  body('name').notEmpty().withMessage('Name is required').isLength({ min: 2 }),
  body('email').isEmail().withMessage('Please include a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters')
    .matches(/[!@#$%^&*(),.?":{}|<>0-9]/)
    .withMessage('Password must contain a number or special character'),
  body('role').optional().isIn(['user', 'admin'])
];

const validateAudio = [
  body('title').notEmpty().isLength({ min: 3 }),
  body('genre').isIn(['fiction', 'non-fiction', 'educational', 'biography', 'other']),
  body('isPrivate').optional().isBoolean()
];

const validateObjectId = param('id').isMongoId().withMessage('Invalid ID format');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  validateRegister,
  validateAudio,
  validateObjectId,
  validate
};