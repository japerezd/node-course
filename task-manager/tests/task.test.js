const request = require('supertest');
const app = require('../src/app');
const Task = require('../src/models/task');
const { userOne, userOneId, setupDatabase } = require('./fixtures/db');

// Run before each test suit
beforeEach(setupDatabase);

test('should create task for user', async () => { 
  const response = await request(app).post('/tasks').set('Authorization', `Bearer ${userOne.tokens[0].token}`).send({
    description: 'Task from my test!'
  }).expect(201)

  const task = await Task.findById(response.body._id);
  expect(task).not.toBeNull();
  expect(task).toBeTruthy();
  expect(task.completed).toBe(false)
 });