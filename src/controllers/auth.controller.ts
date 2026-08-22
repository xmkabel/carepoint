import bcrypt from "bcrypt";
import { Request, Response } from "express";
import User from "../models/User.js";
import { createToken } from "../utils/generateToken.js";

export const signup = async (req: Request, res: Response) => {
    try {
        const {FullName, Email, password, role} = req.body;

        if(!FullName || !Email || !password || !role ){
            return res.status(400).json({msg : "All fields are required"});
        }
        
        const userExists = await User.findOne({Email});
        if(userExists){
            return res.status(400).json({msg : "User already exists" });
        }

        const hashpass = await bcrypt.hash(password,10);
        await User.create({
            FullName,
            Email,
            password : hashpass,
            role,
        });
        return res.status(201).json({msg : "account has been created"});
    } catch (error) {
        console.log("SIGNUP ERROR:", error);
        return res.status(500).json({msg : "server error"});
    }
};

export const signIn = async (req: Request, res: Response) => {
    try {
        const {Email, password} = req.body;

        if(!Email || !password){
            return res.status(400).json({msg : "All fields are required"});
        }

        const user = await User.findOne({Email});
        if(!user){
            return res.status(400).json({msg : "invalid email or password"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({msg : "invalid email or password"});
        }

        const token = createToken(user.id, user.role)
        res.cookie("token", token, {httpOnly: true})
        return res.status(200).json({msg : "logged in successfully"});
    } catch(error){
        return res.status(500).json({msg : "server error"});
    }
};

export const signout = (req: Request, res: Response) => {
    res.clearCookie("token")
    return res.status(200).json({msg : "logged out successfully"});
};