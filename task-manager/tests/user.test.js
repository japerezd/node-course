const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user')

const userOne = {
  name: 'Beto',
  email: 'beto@example.com',
  password: 'MyPass567!'
}

// Run before each test suit
beforeEach(async () => {
  await User.deleteMany();
  await new User(userOne).save();
});

test('should signup a new user', async () => {
  await request(app).post('/users').send({
    name: 'Jorge',
    email: 'jorge@example.com',
    password: 'MyPass777!'
  }).expect(201)
});

test('should login existing user', async () => {
  await request(app).post('/users/login').send({
    email: userOne.email,
    password: userOne.password,
  }).expect(200);
})

test('should not login nonexisting user', async () => {
  await request(app).post('/users/login').send({
    email: 'fake@example.com',
    password: '123123983!',
  }).expect(400);
})
