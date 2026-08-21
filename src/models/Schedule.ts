import mongoose from "mongoose";

export interface ISchedule{
    doctorId:mongoose.Types.ObjectId;
    day:Date;
    availableTimeSlots: string[];
    isAvailable: boolean;
}

const scheduleSchema = new mongoose.Schema(
    {
        doctorId:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        day: {
            type: Date,
            required: true,
        },
        availableTimeSlots: [
            {
                type: String, 
                required: true,
            }
        ],
        isAvailable: {
            type: Boolean,
            default: true,
        }
    }
);

const Schedule = mongoose.model<ISchedule>("Schedule", scheduleSchema);
export default Schedule;