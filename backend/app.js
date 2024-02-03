// Buckle up, code voyagers! 🚀

// Required space-time capsules 🌌
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const dotenv = require('dotenv');

// Summoning the digital wizards 🔮
dotenv.config()

// Preparing the launchpad 🚁
const PORT = process.env.PORT || 3001;

// Initializing the express mothership 🚀
const app = express();
const server = http.createServer(app);

// Creating a cosmic connection hub 🌐
const io = new Server(server);

// Charting a course for interstellar communication 🌌

// Initializing the alien language translator middleware 🛸
app.use(cors({
    origin: "http://localhost:3000",
}))

// Setting up the intergalactic greeting route 👽
app.get('/', (req, res) => {
    res.send("Greetings, Earthlings! 🌍✌️");
});

// Embarking on the journey through the cosmic void 🚀
io.on('connection', (socket) => {
    console.log("User connected... Houston, we have a coder!");

    // Joining the room of wonders 🚪
    socket.on('joinRoom', (data) => {
        socket.join(data.roomcode);

        console.log(`👥 ${data.username} joined the room ${data.roomcode}. Prepare for liftoff! 🚀`);
        io.to(data.roomcode).emit('roomJoinEvent', data)
    });

    // Emitting messages to the universe 📡
    socket.on('emitMessage', (data) => {
        console.log(data);
        io.to(data.roomcode).emit('message', data);
        console.log(`📬 Message transmitted to the room ${data.roomcode}. Brace for impact! 💥`);
    });
})

// Final countdown to server liftoff 🚀
server.listen(PORT, () => {
    console.log(`🌌 Server ready for liftoff on port ${PORT}. All systems go! 🚀`);
});