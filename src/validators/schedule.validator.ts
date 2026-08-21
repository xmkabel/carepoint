import { body } from 'express-validator';

export const createScheduleValidator = [
  body('day').notEmpty().withMessage('Day is required'),
  body('availableTimeSlots').isArray({ min: 1 }).withMessage('Available time slots must be a non-empty array'),
  body('isAvailable').optional().isBoolean().withMessage('Availability must be boolean')
];

export const updateScheduleValidator = [
    body('day')
        .optional()
        .isDate()
        .withMessage('Valid date is required (YYYY-MM-DD)'),
    body('availableTimeSlots')
        .optional()
        .isArray({ min: 1 })
        .withMessage('At least one time slot is required')
];