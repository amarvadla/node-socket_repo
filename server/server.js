const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
app.use(express.static(publicPath));
var server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket) => {
    console.log('new user connected');

    socket.emit('newMessage', {
        'text': 'i am fine dawg !!',
        "from": "vicky"
    });

    socket.on('createMessage', function (data) {
        console.log(data);
    })
});

server.listen(port, () => {
    console.log(`server is running on port ${port}...`);
})