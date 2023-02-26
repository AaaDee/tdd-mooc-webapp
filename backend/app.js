
const express = require('express')
const app = express()

const todos = [
  {
    id: 1,
    name: 'do something',
    archived: false,
    done: false,
  }
]

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/todos', (req, res) => {
  res.send(todos)
})





module.exports = app