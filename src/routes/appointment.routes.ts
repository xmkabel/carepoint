import { Router } from "express";
import { bookAppointment, getPatientAppointments, cancelAppointment, getDoctorAppointments, updateAppointmentStatus } from "../controllers/appointment.controller.js";
import { auth } from "../middlewares/auth.middleware.js";
import { validatorMiddleware } from "../middlewares/validatorMiddleware.js";
import { updateAppointmentStatusValidator, bookAppointmentValidator } from "../validators/appointment.validator";

const router = Router();

/**
 * @swagger
 * /api/appointment/book:
 *   post:
 *     summary: Book an appointment with a doctor
 *     tags: [Appointments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - doctorId
 *               - appointmentDate
 *               - timeSlot
 *             properties:
 *               doctorId:
 *                 type: string
 *                 example: 64f1a2b3c4d5e6f7a8b9c0d1
 *               appointmentDate:
 *                 type: string
 *                 example: 2026-09-15
 *               timeSlot:
 *                 type: string
 *                 example: 10:00 AM
 *     responses:
 *       201:
 *         description: Appointment booked successfully
 *       400:
 *         description: Slot not available or missing fields
 */
router.post("/book", auth,bookAppointmentValidator,validatorMiddleware, bookAppointment);

/**
 * @swagger
 * /api/appointment/patient:
 *   get:
 *     summary: Get all appointments for the logged-in patient
 *     tags: [Appointments]
 *     responses:
 *       200:
 *         description: Patient appointments retrieved successfully
 */
router.get("/patient", auth, getPatientAppointments);

/**
 * @swagger
 * /api/appointment/cancel/{appointmentId}:
 *   delete:
 *     summary: Cancel an appointment and restore the time slot
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: appointmentId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the appointment to cancel
 *     responses:
 *       200:
 *         description: Appointment cancelled successfully
 */
router.delete("/cancel/:appointmentId", auth, cancelAppointment);

/**
 * @swagger
 * /api/appointment/doctor:
 *   get:
 *     summary: Get all appointments for the logged-in doctor
 *     tags: [Appointments]
 *     responses:
 *       200:
 *         description: Doctor appointments retrieved successfully
 */
router.get("/doctor", auth, getDoctorAppointments);

/**
 * @swagger
 * /api/appointment/status/{appointmentId}:
 *   patch:
 *     summary: Update appointment status
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: appointmentId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [Pending, Completed, Cancelled]
 *                 example: Completed
 *     responses:
 *       200:
 *         description: Status updated successfully
 */
router.patch("/status/:appointmentId", auth,updateAppointmentStatusValidator,validatorMiddleware, updateAppointmentStatus);

export default router;