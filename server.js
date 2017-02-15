var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function (req, res) {
  res.sendfile('index.html');
});

io.on('connection', function (socket) {
  console.log('Connection to client established');

    // Success!  Now listen to messages to be received
    socket.on('player:new', function (event) {
        console.log('Received message from socket!', event);
        io.emit('player:new', event);
    });

    socket.on('player:update', function (event) {
        console.log('Received message from socket!', event);
        io.emit('player:update', event);
    });

    socket.on('disconnect',function(){
        console.log('Server has disconnected');
    });
});


http.listen(8081, function () {
  console.log('listening on *:8081');
});
