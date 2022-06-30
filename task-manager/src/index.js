const express = require('express');
// File is running like the following
require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();
const port = process.env.PORT || 3000;



// parse incoming json to an object to access them in req handler
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log('Server is up on port: ' + port);
});

const jwt = require('jsonwebtoken');

const myFn = async () => {
  const token = jwt.sign({ _id: 'abc123' }, 'thisismynewcourse', { expiresIn: '7 days' } );
  console.log(token);
  const data = jwt.verify(token, 'thisismynewcourse')
  console.log(data);
}

myFn()