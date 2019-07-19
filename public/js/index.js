var socket = io();

socket.on('connect', function () {
    console.log('connected');

    socket.emit('createMessage', {
        "text": "wssup dawg!!",
        "from": "amar"
    })
})

socket.on('disconnect', function () {
    console.log('disconnected');
})

socket.on('newMessage', function (data) {
    console.log('new Message', data);
})
