var socket = io();

socket.on('connect', function () {
    console.log('connected');
})

socket.on('disconnect', function () {
    console.log('disconnected');
})

socket.on('newMessage', function (data) {
    var formatedTime = moment(data.createdAt).format('h:mm a');
    console.log('new Message', data);
    var li = jQuery('<li></li>');
    li.text(`${data.from} ${formatedTime} : ${data.text} `);

    jQuery('#messages').append(li);
})

socket.on('newLocationMessage' , function(data) {
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My current location</a>');

    li.text(`${data.from}: `);
    a.attr('href', data.text);
    li.append(a);
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


var locationButton = jQuery('#send-location');

locationButton.on('click', function(){
    if(!navigator.geolocation){
        alert('unable to fetch location')
    }

    navigator.geolocation.getCurrentPosition(function(position) {
        socket.emit('locationUser', {
            lat : position.coords.latitude,
            lon : position.coords.longitude
        })
    }, function(){
        alert('unable to fetch location')
    });
})