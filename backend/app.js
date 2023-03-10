
const express = require('express')
const PostgresTodoDao = require('./models/PostgresTodoDao')
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
  const todos = await dao.getAll();
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

app.close = () => {
  dao.close()
}




module.exports = app