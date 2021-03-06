const express = require('express');
// File is running like the following
require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();
// parse incoming json to an object to access them in req handler
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

module.exports = app;