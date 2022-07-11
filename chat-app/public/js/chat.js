const socket = io();

socket.on('message', (message) => {
  console.log(message);
});

const form = document.querySelector('#message-form');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const message = e.target.elements.message.value;
  socket.emit('sendMessage', message);
});

document.querySelector('#send-location').addEventListener('click', () => {
  if (!navigator.geolocation) {
    return alert('Geolocation is not supported by your browser');
  }

  navigator.geolocation.getCurrentPosition((position) => {
    const { coords: { latitude, longitude } } = position;
    socket.emit('sendLocation', { latitude, longitude })
  });
});
