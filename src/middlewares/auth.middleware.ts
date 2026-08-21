import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.token;
    try {
        if (!token) {
            return res.status(401).json({ msg: "No token provided" });
        }
        const verify = jwt.verify(token, process.env.JWT_SECRET as string);
            if(!verify){
            return res.status(401)
        }
        next();
    } catch (error) {
        return res.status(401).json({ msg: "Invalid or expired token" });
    }
};  

export const authZ = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies?.token;
    try {
        if (!token) {
            return res.status(401).json({ msg: "No token provided" });
        }
        const verify = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string, role: string };
        
        if(verify.role != "admin" && verify.role !== "doctor"){
            return res.status(403).json({ msg: "Forbidden: Not allowed" });
        }    
        next();
    } catch (error) {
        return res.status(401).json({ msg: "Invalid or expired token" });
    }
}