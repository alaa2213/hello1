import express from 'express';
import mongoose from 'mongoose';
import EventsModel from './EventsModel.js';
import { sayHello, sayGoodbye } from './hello-module.js'; // User defined module 
import http from 'http';  // predefined module in node

const connect = async () => {
    await mongoose.connect('mongodb+srv://haneenmahmoud37:leelo@cluster0.36po8yj.mongodb.net/').then(() => {
        console.log('Connected to database');
    });
}

await connect();
const app = express()
app.use(express.json())
// Note: in order for the project to work first run `npm install` this should install node modules folders
// Use the command:  node app (make sure that you are inside test_node folder in the terminal)

// Using imported module: 
// const name = 'Yehia';
// console.log(sayHello(name));
// console.log(sayGoodbye(name));




// ******************************************************************************************//
// const serverUsingHttp = http.createServer((req, res) => {
//     if (req.method === 'GET') {
//         if (req.url === '/home') {
//             res.writeHead(200, {'Content-Type': 'text/plain'}); // 200 is the OK status code
//             res.end('Welcome to our home page');                 
//         } else {
//             res.writeHead(404, {'Content-Type': 'text/plain'});
//             res.end('Page not found');
//         }
//     }
// });

const serverUsingExpress = express();

const app = express();

app.use(express.json());


app.get('/home', (req, res) => {
    res.status(200).json({ message: 'Welcome to our home page' });
});
app.get('events', async(req, res) => {
    const events = await EventModel.find();
    res.status(200).json({message:'welcome to events'})
    
});
app.get('/events/:eventId',async (req, res) => {
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
});app.get('/events/:id', async (req, res) => {
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

const PORT = 7000;

app.listen(PORT, ()=> {
        console.log(`connected to port ${PORT}`);
    });
