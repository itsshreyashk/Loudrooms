// Import required modules
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config()

const PORT = process.env.PORT || 3001;

// Create an Express app and an HTTP server
const app = express();
const server = http.createServer(app);
// Create a Socket.IO instance attached to the server
const io = new Server(server);
// Set up a route to serve a basic HTML page


//middleware
app.use(cors({
    origin: "http://localhost:3000",
}))


app.get('/', (req, res) => {
    res.send("Hi!")
});

io.on('connection', (socket) => {
    console.log("User connected...");
    socket.on('joinRoom', (data) => {
        socket.join(data.roomcode);
        console.log(`${data.username} joined room ${data.roomcode}`);
    });
    socket.on('emitMessage', (data) => {
        console.log(data);
        io.to(data.roomcode).emit('message', data);
    });
})


// Start the server on port 3000
server.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});