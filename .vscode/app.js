import express from 'express';
import mongoose from 'mongoose';
import EventModel from './EventsModel.js';
import TicketsModel from './TicketsModel.js';
import AttendeeModel from './AttendeeModel.js';

import http from 'http'; 

const connect = async () => {
    await mongoose.connect('mongodb+srv://haneenmahmoud37:leelo@cluster0.36po8yj.mongodb.net/').then(() => {
        console.log('Connected to database');
    });
}

await connect();


const app = express();

app.use(express.json());


app.get('/home', (req, res) => {
    res.status(200).json({ message: 'Welcome to our home page' });
});
app.get('events', async (req, res) => {
    const events = await EventModel.find();
    res.status(200).json({ message: 'welcome to events' })

});
app.get('/events/:eventId', async (req, res) => {
    res.status(300).json({ message: 'please enter an id' });
});
app.post('/events', async (req, res) => {
    try {
        const { event } = req.body;
        const addedEvent = new EventModel(event);
        await addedEvent.save();
        res.status(200).json(addedEvent);
    } catch (err) {
        res.status(500).json({ message: 'server error' });
    }
}); app.get('/events/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const event = await EventModel.findById(id);
        console.log('event = ', event);

        if (!event) {
            res.status(404).json({ message: 'no event found with this id' })
        }
        else res.status(200).json(event);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.delete('/events/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedEvent = await EventModel.findByIdAndDelete(id);
        if (deletedEvent) {
            res.status(200).json({ message: 'Deleted Successfully' });
        } else {
            res.status(404).json({ message: 'no event with this id' });
        }
    } catch (err) {
        res.status(500).json({ message: 'server error' });
    }
});

app.patch('/events/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { numberOfAttendees } = req.body;
        const event = await EventModel.findById(id);
        if (event) {
            event.numberOfAttendees = numberOfAttendees;
            event.save();
            res.status(200).json({ event });
        } else {
            res.status(404).json({ message: 'no event with this id' });
        }
    } catch (err) {
        res.status(500).json({ message: 'server error' });
    }
});

app.get('/events/:id/attendees', (req, res) => {
    const { id } = req.params;
    res.status(200).json({ message: `The attendees for the event with id = ${id}` });
});

app.get('/events/:id/tickets', (req, res) => {
    const { id } = req.params;
    res.status(200).json({ message: `The tickets for the event with id = ${id}` });
});


app.get('/tickets', async (req, res) => {
    const tickets = await TicketsModel.find();
    res.status(200).json({ tickets });
});


app.patch('/tickets/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { userID } = req.body;
        const ticket = await TicketsModel.findById(id);
        if (ticket) {
            ticket.userID = userID;
            ticket.save();
            ticket.status(200).json({ ticket });
        } else {
            res.status(404).json({ message: 'no ticket with this event id' });
        }
    } catch (err) {
        res.status(500).json({ message: 'server error' });
    }
});

app.get('/attendees', async (req, res) => {
    const attendees = await AttendeeModel.find();
    res.status(200).json({ attendees })
})

app.get('/attendees/:id', async (req, res) => {
    const attendee = await AttendeeModel.findById(params.id);
    res.status(200).json({ attendee })
})

app.delete('/attendees/:id', async (req, res) => {
    const attendee = await AttendeeModel.findByIdAndDelete(params.id)
    res.status(200).json({ attendee })
})

const PORT = 7000;

app.listen(PORT, () => {
    console.log(`connected to port ${PORT}`);
});
