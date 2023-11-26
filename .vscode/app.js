import express from 'express';
import { sayHello, sayGoodbye } from './hello-module.js'; // User defined module 
import http from 'http';  // predefined module in node

// Note: in order for the project to work first run `npm install` this should install node modules folders
// Use the command:  node app (make sure that you are inside test_node folder in the terminal)

// Using imported module: 
const name = 'Yehia';
console.log(sayHello(name));
console.log(sayGoodbye(name));




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

serverUsingExpress.get('/home', (req, res) => {
    res.status(200).json({ message: 'Welcome to our home page' });
});
serverUsingExpress.get('events', (req, res) => {
    res.status(100).json({ message: 'Welcome to our events page' });
});
serverUsingExpress.get('/events/:eventId', (req, res) => {
    res.status(300).json({ message: 'please enter an id' });
});

const PORT = 7000;

app.listen(PORT, ()=> {
        console.log(`connected to port ${PORT}`);
    });