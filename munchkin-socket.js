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
        console.log('player:new ', event);
        io.emit('player:new', event);
    });

    socket.on('player:update', function (event) {
        console.log('player:update ', event);
        io.emit('player:update', event);
    });

    socket.on('player:delete', function (event) {
        console.log('player:delete ', event);
        io.emit('player:delete', event);
    });

    socket.on('player:sync', function (event) {
        console.log('player:sync ', event);
        io.emit('player:sync', event);
    });

    socket.on('disconnect',function(){
        console.log('Server has disconnected');
    });
});


http.listen(8081, function () {
  console.log('listening on *:8081');
});
