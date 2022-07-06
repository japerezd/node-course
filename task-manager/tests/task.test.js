const request = require('supertest');
const app = require('../src/app');
const Task = require('../src/models/task');
const { userOne, userOneId, setupDatabase, userTwo, taskOne } = require('./fixtures/db');

// Run before each test suit
beforeEach(setupDatabase);

test('should create task for user', async () => {
  const response = await request(app)
    .post('/tasks')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      description: 'Task from my test!',
    })
    .expect(201);

  const task = await Task.findById(response.body._id);
  expect(task).not.toBeNull();
  expect(task).toBeTruthy();
  expect(task.completed).toBe(false);
});

test('should get all tasks and array length 2', async () => {
  const response = await request(app)
    .get('/tasks')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  expect(response.body.length).toBe(2);
});

test('should not delete user two, the task one', async () => {
  await request(app)
    .delete(`/tasks/${taskOne._id}`)
    .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
    .send()
    .expect(404);

    const taskOneUserOne = await Task.findById(taskOne._id);
    expect(taskOneUserOne).toBeTruthy();
});
