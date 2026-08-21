import { body } from 'express-validator';

export const updateAppointmentStatusValidator = [
  body('status').isIn(['Pending', 'Confirmed', 'Completed', 'Cancelled']).withMessage('Invalid status')
];

export const bookAppointmentValidator = [
    body('doctorId').notEmpty().withMessage('Doctor ID is required'),
    body('appointmentDate').notEmpty().isDate().withMessage('Valid appointment date is required (YYYY-MM-DD)'),
    body('timeSlot').notEmpty().withMessage('Time slot is required')
];