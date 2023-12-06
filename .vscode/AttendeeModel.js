import mongoose from "mongoose";

const AttendeeSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        age: {
            type: Number,
            required: true
        },
        email: {
            type: String,
            required: true
        }
    }
)
const AttendeeModel = mongoose.model('Attendee', AttendeeSchema);

export default AttendeeModel;
