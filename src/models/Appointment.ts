import mongoose from "mongoose";

export interface IAppointment {
    patientId: mongoose.Types.ObjectId;
    doctorId: mongoose.Types.ObjectId;
    appointmentDate: Date;
    timeSlot: string;
    status: "Pending" | "Confirmed" | "Completed" | "Cancelled";
}

const appointmentSchema = new mongoose.Schema(
    {
        patientId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        doctorId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        appointmentDate: {
            type: Date,
            required: true,
        },
        timeSlot: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ["Pending", "Confirmed", "Completed", "Cancelled"],
            default: "Pending",
            required: true,
        },
    }
);

const Appointment = mongoose.model<IAppointment>("Appointment", appointmentSchema);
export default Appointment;