import { body } from 'express-validator';

export const profileValidator = [
    body('Specialty').notEmpty().withMessage('Specialty is required'),
    body('experienceYears').isInt({ min: 0 }).withMessage('Experience years must be a valid number'),
    body('ClinicAddress').notEmpty().withMessage('Clinic address is required'),
    body('ConsultationFee').isNumeric().withMessage('Consultation fee must be a number')
];