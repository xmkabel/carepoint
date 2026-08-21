import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import Appointment from "../models/Appointment.js";
import Schedule from "../models/Schedule.js";

export const bookAppointment = async (req: Request,res: Response) => {
    try {
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({ msg: "Unauthorized" });
        }

        const verify = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string, role: string };
        const patientId = verify.id;

        const {doctorId,appointmentDate,timeSlot} = req.body;
        if(!doctorId || !appointmentDate || !timeSlot){
            return res.status(400).json({ msg: "Doctor ID, Date, and Time Slot are required" });
        }

        const dateObj = new Date(appointmentDate);
        const today = new Date();
        if (dateObj < today) {
            return res.status(400).json({ msg: "Appointments can only be booked for future dates" });
        }

        const schedule = await Schedule.findOne({ doctorId, day: appointmentDate });
        if (!schedule || !schedule.isAvailable) {
            return res.status(400).json({ msg: "Doctor is not available on this day" });
        }

        if (!schedule.availableTimeSlots.includes(timeSlot)) {
            return res.status(400).json({ msg: "This time slot is not available or already booked" });
        }

        await Appointment.create({
            patientId,
            doctorId,
            appointmentDate,
            timeSlot,
            status: "Confirmed"
        });

        schedule.availableTimeSlots = schedule.availableTimeSlots.filter(slot => slot !== timeSlot);
        await schedule.save();

        return res.status(201).json({ msg: "Appointment booked successfully" });
    } catch (error) {
        return res.status(500).json({msg : "server error"});
    }
};

export const getPatientAppointments = async (req: Request, res: Response) => {
    try {
        const token = req.cookies?.token;
        if (!token) return res.status(401).json({ msg: "Unauthorized" });

        const verify = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
        const patientId = verify.id;

        const appointments = await Appointment.find({ patientId }).populate("doctorId", "FullName Email");
        return res.status(200).json({ appointments });
    } catch (error) {
        return res.status(500).json({ msg: "Server error" });
    }
};

export const cancelAppointment = async (req: Request, res: Response) => {
    try {
        const { appointmentId } = req.params;

        const appointment = await Appointment.findByIdAndDelete(appointmentId);
        if (!appointment) {
            return res.status(404).json({ msg: "Appointment not found" });
        }

        const schedule = await Schedule.findOne({ 
            doctorId: appointment.doctorId, 
            day: appointment.appointmentDate 
        });

        if (schedule) {
            schedule.availableTimeSlots.push(appointment.timeSlot);
            await schedule.save();
        }

        return res.status(200).json({ msg: "Appointment cancelled successfully and slot restored" });
    } catch (error) {
        return res.status(500).json({ msg: "Server error" });
    }
};

export const getDoctorAppointments = async (req: Request, res: Response) => {
    try {
        const token = req.cookies?.token;
        if (!token) return res.status(401).json({ msg: "Unauthorized" });
        
        const verify = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
        const doctorId = verify.id;

        const appointments = await Appointment.find({ doctorId }).populate("patientId", "FullName Email");

        return res.status(200).json({ appointments });
    } catch (error) {
        return res.status(500).json({ msg: "Server error" });
    }
};

export const updateAppointmentStatus = async (req: Request, res: Response) => {
    try {
        const { appointmentId } = req.params;
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({ msg: "Status is required" });
        }

        const appointment = await Appointment.findByIdAndUpdate(
            appointmentId,
            { status },
            { new: true }
        );

        if (!appointment) {
            return res.status(404).json({ msg: "Appointment not found" });
        }

        return res.status(200).json({ msg: "Appointment status updated", appointment });
    } catch (error) {
        return res.status(500).json({ msg: "Server error" });
    }
};