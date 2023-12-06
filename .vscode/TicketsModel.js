import mongoose from "mongoose";

const TicketSchema = new mongoose.Schema({
    eventId: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    userID: {
        type: String,


    }
});

const TicketsModel = mongoose.model('Tickets', TicketSchema);

export default TicketsModel;

