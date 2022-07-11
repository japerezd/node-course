const path = require('path')
const http = require('http')
const express = require('express');
const socketio = require('socket.io');
const Filter = require('bad-words');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, '../public')

// app.use(express.json());
app.use(express.static(publicDirectoryPath));

io.on('connection', (socket) => {
  console.log('New WebSocket connection');

  socket.emit('message', 'Welcome!')
  // Send message to everybody except for himself
  socket.broadcast.emit('message', 'A new user has joined!')

  socket.on('sendMessage', (message, callback) => {
    const filter = new Filter();

    if (filter.isProfane(message)) {
      return callback('Profanity is not allowed!')
    }

    io.emit('message', message);
    callback();
  });

  // built in event (disconnect)
  socket.on('disconnect', () => {
    io.emit('message', 'A user has left!')
  });

  socket.on('sendLocation', ({latitude, longitude}, callback) => {
    io.emit('message', `https://google.com/maps?q=${latitude},${longitude}`);
    callback();
  })
})

server.listen(port, () => {
  console.log('Server is up on port: ' + port);
})