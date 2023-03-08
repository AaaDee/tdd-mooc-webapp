const supertest = require('supertest')
const app = require('../app')
const PostgresTodoDao = require('../models/PostgresTodoDao')

const api = supertest(app)
const conf = require('./configuration')

const todo = {
  name: "do something",
  archived: false,
  done: false,
}


test('Returns hello world', async () => {
  const response = await api.get('/')
  expect(response.text).toBe('<h1>Hello World!</h1>')
})

test('Returns todos', async () => {
  const response = await api.get('/todos')
  expect(response.body[0].name).toBe('do something');
})

describe("Getting data from database", () => {
  let todos;

  beforeEach(async () => {
    todos = new PostgresTodoDao(conf);
  });

  afterEach(async () => {
    await todos.db.query("delete from todos")
    todos.close();
  });

  afterAll(async () => {
    app.close();
  });

  test('Returns success on posting correct new note', async () => {
    await api
    .post('/todos')
    .send(todo)
    .expect(201)
  })
  
  test('Updates db with the new note', async () => {
    await api
    .post('/todos')
    .send(todo)
  
    const response = await api.get('/todos')
    expect(response.body[0].name).toBe('do something');
  })

  test('Returns the added note', async () => {
    const response = await api
    .post('/todos')
    .send(todo)
  
    expect(response.body.name).toBe('do something');
  })
});
