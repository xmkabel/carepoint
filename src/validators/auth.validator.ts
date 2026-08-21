import { body } from 'express-validator';

export const registerValidator = [
  body('FullName').notEmpty().withMessage('Full name is required'),
  body('Email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('role').optional().isIn(['patient', 'doctor', 'admin']).withMessage('Invalid role')
];

export const loginValidator = [
  body('Email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required')
];