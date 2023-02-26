const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('Returns hello world', async () => {
  const response = await api.get('/')
  expect(response.text).toBe('<h1>Hello World!</h1>')
})

test('Returns todos', async () => {
  const response = await api.get('/todos')
  expect(response.body[0].name).toBe('do something');
})