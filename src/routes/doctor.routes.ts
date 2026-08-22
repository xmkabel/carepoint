import { Router } from "express";
import { createDoctorprofile } from "../controllers/doctor.controller.js";
import { createSchedule } from "../controllers/schedule.controller.js";
import { auth } from "../middlewares/auth.middleware.js";
import { getDoctorsWithDetails } from "../controllers/doctor.controller.js";
import { validatorMiddleware } from "../middlewares/validatorMiddleware.js";
import { profileValidator } from "../validators/doctor.validator.js";
import { createScheduleValidator, updateScheduleValidator } from "../validators/schedule.validator.js";
import { updateSchedule } from "../controllers/schedule.controller.js";

const router = Router();

/**
 * @swagger
 * /api/doctors/browse:
 *   get:
 *     summary: Browse all doctors with their available schedules (Patient & Public)
 *     tags: [Doctor]
 *     responses:
 *       200:
 *         description: List of doctors retrieved successfully
 */
router.get("/browse", getDoctorsWithDetails);

/**
 * @swagger
 * /api/doctors/profile:
 *   post:
 *     summary: Create or update doctor profile (Doctor only)
 *     tags: [Doctor]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - specialty
 *               - experienceYears
 *               - ClinicAddress
 *               - ConsultationFee
 *             properties:
 *               Specialty:
 *                 type: string
 *                 example: Dentist
 *               experienceYears:
 *                 type: number
 *                 example: 5
 *               ClinicAddress:
 *                 type: string
 *                 example: Cairo, Nasr City
 *               ConsultationFee:
 *                 type: number
 *                 example: 300
 *     responses:
 *       201:
 *         description: Profile created successfully
 *       400:
 *         description: Validation error
 */
router.post("/profile", auth,profileValidator,validatorMiddleware, createDoctorprofile);

/**
 * @swagger
 * /api/doctors/schedule:
 *   post:
 *     summary: Add available working days and time slots (Doctor only)
 *     tags: [Doctor]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - day
 *               - availableTimeSlots
 *             properties:
 *               day:
 *                 type: string
 *                 example: 2026-09-15
 *               availableTimeSlots:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["10:00 AM", "11:30 AM", "02:00 PM"]
 *     responses:
 *       201:
 *         description: Schedule added successfully
 */
router.post("/schedule", auth,createScheduleValidator,validatorMiddleware, createSchedule);

/**
 * @swagger
 * /api/doctors/schedule/{scheduleId}:
 *   put:
 *     summary: Update doctor's work schedule
 *     tags: [Doctor]
 *     parameters:
 *       - in: path
 *         name: scheduleId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the schedule to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               day:
 *                 type: string
 *                 example: 2026-09-20
 *               availableTimeSlots:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["01:00 PM", "03:00 PM"]
 *     responses:
 *       200:
 *         description: Schedule updated successfully
 *       400:
 *         description: Validation error or bad request
 *       404:
 *         description: Schedule not found
 */
router.put("/schedule/:scheduleId", updateScheduleValidator, validatorMiddleware, updateSchedule);

export default router;