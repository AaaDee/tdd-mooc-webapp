const supertest = require('supertest')
const prepareTodoList = require('../models/prepareTodoList')
const app = require('../app')
const deleteAll = require('./deleteAll')

const api = supertest(app)
const { validateNewTodo, validateExistingTodo } = require('../models/validation')

const todo = {
  name: "do something",
  archived: false,
  done: false,
}

describe("Backend routes", () => {
  afterEach(async () => {
    await deleteAll()
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

  test('Returns 0 todos at start', async () => {
    const response = await api.get('/todos')
    expect(response.body.length).toBe(0);
  })

  test('Get returns right todo after posting', async () => {
    await api
    .post('/todos')
    .send(todo)

    const response = await api.get('/todos')
    expect(response.body[0].name).toBe('do something');
  })

  test('Can be updated', async () => {
    const savedTodo = await api
    .post('/todos')
    .send(todo)

    let data = await api.get('/todos')


    await api
    .put('/todos')
    .send({
      ...data.body[0],
      done: true
    })

    const response = await api.get('/todos')
    expect(response.body[0].done).toBe(true);
  })

  test('Can be archived', async () => {
    await api
    .post('/todos')
    .send({...todo, done: true})

    await api
    .post('/todos/archive')
    .send()

    const response = await api.get('/todos')
    expect(response.body.length).toBe(0);
  })
});

test('Note preparation filters out archived todos', async () => {
  todoList = [
    {id: 1, name: 'something', done: false, archived: false},
    {id: 2, name: 'something', done: false, archived: true},
  ]

  const dao = {
    getAll: () => todoList
  }
  const returnedTodos = await prepareTodoList(dao);

  const archivedTodos = returnedTodos.filter(todo => todo.archived)

  expect(returnedTodos.length).toBe(1);
  expect(archivedTodos.length).toBe(0);
})


describe("Validation", () => {
  test('New todo without name not validated', async () => {
    const missingTodo = {
      done: false,
      archived: false
    }
    expect(validateNewTodo(missingTodo)).toBe(false);
  });
  test('New todo without archived not validated', async () => {
    const missingTodo = {
      done: false,
      name: 'something'
    }
    expect(validateNewTodo(missingTodo)).toBe(false);
  })
  test('New todo without done not validated', async () => {
    const missingTodo = {
      name: 'something',
      archived: false
    }
    expect(validateNewTodo(missingTodo)).toBe(false);
  })

  test('Old todo without id', async () => {
    const missingTodo = {
      name: 'something',
      done: false,
      archived: false
    }
    expect(validateExistingTodo(missingTodo)).toBe(false);
  });
});