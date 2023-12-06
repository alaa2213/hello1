import mongoose from "mongoose";

const EventSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    numberOfAttendees: {
        type: Number,
        required: true
    },
    date: {
        type: Date
    }
})

const EventsModel = mongoose.model('Events', EventSchema);

export default EventsModel;