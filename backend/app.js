
const express = require('express')
const PostgresTodoDao = require('./models/PostgresTodoDao')
const prepareTodoList = require('./models/prepareTodoList')
const app = express()
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
  const todos = await prepareTodoList(dao);
  res.send(todos)
})

app.post('/todos', async (req, res) => {
  const todo = req.body;
  const savedTodo = await dao.save(todo)
  res.status(201).json(savedTodo)

})

app.put('/todos', async (req, res) => {
  const todo = req.body;
  const savedTodo = await dao.update(todo)
  res.status(200).json(savedTodo)
})

app.post('/todos/archive', async (req, res) => {
  await dao.archive()
  res.status(200).send()
})

app.close = () => {
  dao.close()
}




module.exports = app