import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import DoctorProfile from "../models/DoctorProfile.js";
import User from "../models/User.js";
import Schedule from "../models/Schedule.js";

export const createDoctorprofile = async (req: Request,res: Response) =>{
    try{
        const token = req.cookies?.token;
        if (!token) {
            return res.status(401).json({ msg: "Unauthorized" });
        }

        const verify = jwt.verify(token,process.env.JWT_SECRET as string,) as {id: string, role: string};
        const doctorId = verify.id;

        const { Specialty, experienceYears, ClinicAddress, ConsultationFee } = req.body;
        if (!Specialty || !experienceYears || !ClinicAddress || !ConsultationFee) {
            return res.status(400).json({ msg: "All fields are required" });
        }

        const existingProfile = await DoctorProfile.findOne({ userId: doctorId });
        if (existingProfile) {
            return res.status(400).json({ msg: "Doctor profile already exists" });
        }

        await DoctorProfile.create({
            userId: doctorId,
            Specialty,
            experienceYears,
            ClinicAddress,
            ConsultationFee,
        });

        return res.status(201).json({ msg: "Profile created successfully"});
    } catch(error) {
        return res.status(500).json({ msg: "Server error" });
    }
};

export const getDoctorsWithDetails = async (req: Request, res: Response) => {
    try {
        const doctors = await User.find({ role: "doctor" }).select("-password");

        const doctorsDetails = [];

        for (const doctor of doctors) {
            const profile = await DoctorProfile.findOne({ userId: doctor._id });

            const schedules = await Schedule.find({ doctorId: doctor._id, isAvailable: true });

            doctorsDetails.push({
                doctorInfo: doctor,
                profile: profile || "No profile added yet",
                schedules: schedules
            });
        }

        return res.status(200).json({ doctors: doctorsDetails });
    } catch (error) {
        return res.status(500).json({ msg: "Server error" });
    }
};