import { Router } from "express";
import { signIn, signout,signup } from "../controllers/auth.controller";
import { validatorMiddleware } from "../middlewares/validatorMiddleware";
import {registerValidator, loginValidator } from "../validators/auth.validator"

const router = Router();

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Register a new user (Patient, Doctor, or Admin)
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - FullName
 *               - Email
 *               - password
 *               - role
 *             properties:
 *               FullName:
 *                 type: string
 *                 example: Amr Zaki
 *               Email:
 *                 type: string
 *                 example: amr@gmail.com
 *               password:
 *                 type: string
 *                 example: password123
 *               role:
 *                 type: string
 *                 enum: [patient, doctor, admin]
 *                 example: patient
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request or user already exists
 */
router.post("/signup",registerValidator,validatorMiddleware, signup);

/**
 * @swagger
 * /api/auth/signin:
 *   post:
 *     summary: Login into the system
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - Email
 *               - password
 *             properties:
 *               Email:
 *                 type: string
 *                 example: amrd@gmail.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Logged in successfully and cookie set
 *       401:
 *         description: Invalid credentials
 */

router.post("/signin", loginValidator,validatorMiddleware, signIn);

/**
 * @swagger
 * /api/auth/signout:
 *   post:
 *     summary: User signout
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Signed out successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Signed out successfully"
 *       500:
 *         description: Internal server error
 */
router.post('/signout', signout);

export default router;