const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const Filter = require('bad-words');
const {
  generateMessage,
  generateLocationMessage,
} = require('./utils/messages');
const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoo,
} = require('./utils/users');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, '../public');

// app.use(express.json());
app.use(express.static(publicDirectoryPath));

io.on('connection', (socket) => {
  console.log('New WebSocket connection');

  socket.on('join', (options, callback) => {
    const { error, user } = addUser({ id: socket.id, ...options });

    if (error) {
      return callback(error);
    }

    socket.join(user.room);

    socket.emit('message', generateMessage('Admin','Welcome!'));
    // Send message to everybody except for himself to specific room
    socket.broadcast
      .to(user.room)
      .emit('message', generateMessage('Admin', `${user.username} has joined!`));

    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const filter = new Filter();
    const user = getUser(socket.id);

    if (filter.isProfane(message)) {
      return callback('Profanity is not allowed!');
    }

    io.to(user.room).emit('message', generateMessage(user.username, message));
    callback();
  });

  socket.on('sendLocation', ({ latitude, longitude }, callback) => {
    const user = getUser(socket.id);
    io.to(user.room).emit(
      'locationMessage',
      generateLocationMessage(user.username,
        `https://google.com/maps?q=${latitude},${longitude}`
      )
    );
    callback();
  });

  // built in event (disconnect)
  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit(
        'message',
        generateMessage('Admin', `${user.username} has left!`)
      );
    }
  });
});

server.listen(port, () => {
  console.log('Server is up on port: ' + port);
});
