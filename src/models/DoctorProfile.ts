import mongoose from "mongoose";

export interface IDoctorProfile {
    userId : mongoose.Types.ObjectId;
    Specialty: String;
    experienceYears: number;
    ClinicAddress: String;
    ConsultationFee: Number;
    WorkingHours: Number;
    availabilityStatus: boolean; 
}

const DoctorProfileSchema = new mongoose.Schema(
    {
        userId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required:true,
            unique:true,
        },
        Specialty: {
            type: String,
            required: true,
            trim: true,
        },
        experienceYears: {
            type: Number,
            required: true,
        },
        ClinicAddress: {
            type: String,
            required: true,
        },
        ConsultationFee: {
            type: Number,
            required: true,
        },
        availabilityStatus: {
            type: Boolean,
            default: true, 
        },
        workingHours: {
            type: Number,
            default: true, 
        },
    }
);

const DoctorProfile = mongoose.model<IDoctorProfile>("DoctorProfile", DoctorProfileSchema);
export default DoctorProfile;