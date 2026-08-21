import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import Schedule from "../models/Schedule.js";

export const createSchedule = async (req: Request, res: Response) => {
    try{
        const token = req.cookies?.token;
        if(!token){
            return res.status(401).json({ msg: "Unauthorized" });
        }

        const verify = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string, role: string };
        const doctorId = verify.id;

        const { day, availableTimeSlots} = req.body;
        if(!day || !availableTimeSlots){
            return res.status(400).json({ msg: "Day and available time slots are required" });
        }

        const existingSchedule = await Schedule.findOne({ doctorId, day });
        if (existingSchedule) {
            return res.status(400).json({ msg: "Schedule already exists for this day" });
        }

       const newSchedule = await Schedule.create({
            doctorId,
            day,
            availableTimeSlots,
        });

        return res.status(201).json({ msg: "Schedule created successfully", schedule: newSchedule });
    } catch (error){
        return res.status(500).json({ msg: "Server error" });
    }
};

export const updateSchedule = async (req: Request, res: Response) => {
    try {
        const { scheduleId } = req.params;
        const { day, availableTimeSlots } = req.body;

        const schedule = await Schedule.findByIdAndUpdate(
            scheduleId,
            { day, availableTimeSlots },
            { new: true } 
        );

        if (!schedule) {
            return res.status(404).json({ success: false, message: "Schedule not found" });
        }

        res.status(200).json({
            success: false ? false : true,
            message: "Schedule updated successfully",
            schedule
        });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
};