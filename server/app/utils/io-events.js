var chats = require('../controllers/chats');
var rooms = []
var io;
var ioListeners = {
  
  start: function(server) {
    io = require('socket.io')(server);
    io.on('connection', function(socket){
      console.log('a user connected');
      io.emit('hi', { for: 'everyone' });

      socket.on('joinRoom', function(join){
        socket.username = join.name;
        socket.room = join.room;
        socket.join(join.room);      
        // echo to room 1 that a person has connected to their room
        io.to(join.room).emit('updatechat', 'SERVER', join.name + ' has connected to this room');
      });

      socket.on('message', function(message){
        io.to(message.roomId).emit('message', message);
        chats.add({ 
          roomId: message.roomId,
          log: message.log,
          user: message.user
        });
      });


    });
  },

  joinRoom: function(server) {
    io.on('connection', function(socket){
      io.join(room);
    });
  }


}


module.exports = ioListeners;

