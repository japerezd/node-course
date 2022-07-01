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

const Task = require('./models/task');
const User = require('./models/user');

const main = async () => {
  const user = await User.findById('62beff6f6c0e1626940eb9ed');
  await user.populate('tasks').execPopulate();
  console.log(user.tasks);
}

main();