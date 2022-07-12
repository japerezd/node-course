const path = require('path')
const http = require('http')
const express = require('express');
const socketio = require('socket.io');
const Filter = require('bad-words');
const { generateMessage, generateLocationMessage } = require('./utils/messages')

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, '../public')

// app.use(express.json());
app.use(express.static(publicDirectoryPath));

io.on('connection', (socket) => {
  console.log('New WebSocket connection');

  socket.on('join', ({ username, room }) => {
    socket.join(room);
    socket.emit('message', generateMessage('Welcome!'));
    // Send message to everybody except for himself to specific room
    socket.broadcast.to(room).emit('message', generateMessage(`${username} has joined!`))
  })

  socket.on('sendMessage', (message, callback) => {
    const filter = new Filter();

    if (filter.isProfane(message)) {
      return callback('Profanity is not allowed!')
    }

    io.emit('message', generateMessage(message));
    callback();
  });

  // built in event (disconnect)
  socket.on('disconnect', () => {
    io.emit('message', generateMessage('A user has left!'))
  });

  socket.on('sendLocation', ({latitude, longitude}, callback) => {
    io.emit('locationMessage', generateLocationMessage(`https://google.com/maps?q=${latitude},${longitude}`));
    callback();
  });

})

server.listen(port, () => {
  console.log('Server is up on port: ' + port);
})