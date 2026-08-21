import mongoose from 'mongoose';

export interface IUser {
    FullName: string;
    Email: string;
    password: string;
    role: "patient" | "doctor" | "admin";
}

const userSchema = new mongoose.Schema({
    FullName:{
        type: String,
        required: true,
        trim: true,
    },
    Email: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required:true,
        trim: true,
    },
    role: {
        type: String,
        enum: ["patient", "doctor", "admin"],
        default: "patient",
        required: true,
    }
});

const User = mongoose.model<IUser>('User', userSchema);
export default User;