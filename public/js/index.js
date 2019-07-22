var socket = io();

socket.on('connect', function () {
    console.log('connected');
})

socket.on('disconnect', function () {
    console.log('disconnected');
})

socket.on('newMessage', function (data) {
    console.log('new Message', data);
    var li = jQuery('<li></li>');
    li.text(`${data.from} : ${data.text} `);

    jQuery('#messages').append(li);
})

// socket.emit('createMessage', {
//     from: 'amar',
//     text: 'hellow this is create'
// }, function (callback) {
//     console.log(callback);
// });

jQuery('#message-form').on('submit', function(e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from : 'User',
        text : jQuery('[name = message]').val()
    } , function() {

    })
});