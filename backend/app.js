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
    origin : "http://localhost:3000",
}))


app.get('/', (req, res) => {
    res.send("Hi!")
});
// Set up a connection event for Socket.IO
io.on('connection', (socket) => {
  console.log('A user connected');
  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});
// Start the server on port 3000
server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});