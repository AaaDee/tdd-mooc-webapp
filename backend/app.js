
const express = require('express')
const PostgresTodoDao = require('./models/PostgresTodoDao')
const prepareTodoList = require('./models/prepareTodoList')

const app = express()
app.use(express.static('build'))
app.use(express.json())

const conf = {
  user: 'webapp',
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: "secret",
  port: process.env.PGPORT,
}

const dao = new PostgresTodoDao(conf)

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
  const todo = req.body;
  try {
    const savedTodo = await dao.save(todo)
    res.status(201).json(savedTodo)
  } catch (e) {
    res.sendStatus(500)
  }
})

app.put('/todos', async (req, res) => {
  const todo = req.body;
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