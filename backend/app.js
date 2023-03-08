
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


const todos = [
  {
    id: 1,
    name: 'do something',
    archived: false,
    done: false,
  }
]

const dao = new PostgresTodoDao(conf)

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/todos', (req, res) => {
  res.send(todos)
})

app.post('/todos', async (req, res) => {
  const todo = req.body;
  const savedTodo = await dao.save(todo)
  res.status(201).json(savedTodo)

})

app.close = () => {
  dao.close()
}




module.exports = app