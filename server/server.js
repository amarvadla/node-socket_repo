const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const { generateMessage, generateLocationMessage } = require('./utils/message');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
app.use(express.static(publicPath));
var server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket) => {
    console.log('new user connected');

    // socket.emit('newMessage', generateMessage("amar", "testing generate message"));

    // socket.broadcast.emit("newMessage", {
    //     "text": "new user joined the chat",
    //     "from": "admin",
    //     "createdAt": new Date().getTime()
    // })

    socket.on('createMessage', function (data, callback) {
        io.emit('newMessage', generateMessage(data.from, data.text));
        callback("message delivered");
    })

    socket.on('locationUser', function (position) {
        io.emit('newLocationMessage', generateLocationMessage('Admin', position.lat, position.lon))
    })
});

server.listen(port, () => {
    console.log(`server is running on port ${port}...`);
})