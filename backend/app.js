
require('dotenv').config()
const express = require('express')
const PostgresTodoDao = require('./models/PostgresTodoDao')
const prepareTodoList = require('./models/prepareTodoList')
const { validateNewTodo, validateExistingTodo } = require('./models/validation')


console.log('env', process.env.PGUSER)

const app = express()
app.use(express.json())


const dao = new PostgresTodoDao()

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/todos', async (req, res) => {
  try {
    const todos = await prepareTodoList(dao);
    res.send(todos)
  } catch (e) {
    res.sendStatus(500)
  }
})

app.post('/todos', async (req, res) => {
  console.log('post')
  const todo = req.body;
  if (!validateNewTodo(todo)) {
    res.sendStatus(400)
    return;
  }
  try {
    const savedTodo = await dao.save(todo)
    res.status(201).json(savedTodo)
  } catch (e) {
    res.sendStatus(500)
  }
})

app.put('/todos', async (req, res) => {
  const todo = req.body;
  if (!validateExistingTodo(todo)) {
    res.sendStatus(400)
    return;
  }
  try {
    const savedTodo = await dao.update(todo)
    res.status(200).json(savedTodo)
  } catch (e) {
    res.sendStatus(500)
  }
})

app.post('/todos/archive', async (req, res) => {
  try {
    await dao.archive()
    res.status(200).send()
  } catch (e) {
    res.sendStatus(500)
  }
})

app.close = () => {
  dao.close()
}

module.exports = app