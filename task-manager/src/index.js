const e = require('express');
const express = require('express');
// File is running like the following
require('./db/mongoose');
const User = require('./models/user');

const app = express();
const port = process.env.PORT || 3000;

// parse incoming json to an object to access them in req handler
app.use(express.json());

app.post('/users', (req, res) => {
  const user = new User(req.body);
  user.save().then(() => {
    res.send(user);
  }).catch(e => {
    res.status(400).send(e);
  })
})

app.listen(port, () => {
  console.log('Server is up on port: ' + port);
});