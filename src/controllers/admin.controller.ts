import { Request, Response } from "express";
import User from "../models/User.js";

export const getAllDoctors = async (req: Request, res: Response) => {
    try {
        const AllDoctors = await User.find({role: "doctor"});
        
        return res.status(200).json({AllDoctors});

    } catch (error) {
       return res.status(500).json({msg : "server error"});     
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ msg: "User not found" });
        }

        return res.status(200).json({ msg: "User deleted successfully" });
    } catch (error) {
        return res.status(500).json({ msg: "Server error" });
    }
};