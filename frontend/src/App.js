import './App.css';
import { AddNote } from './components/AddNote';
import { Title } from './components/Title'
import { TodoList } from './components/TodoList';
import axios from 'axios'
import { useEffect, useState } from 'react';

const addTodoHandler =  async (text) => {
  const newTodo = {
    name: text,
    archived: false,
    done: false,
  }
  await axios.post('/todos', newTodo)
}

const updateTodoHandler = async (todo) => {
  await axios.put('/todos', todo)
}

const useTodos = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const fetchedTodos = await axios.get('/todos');
      setTodos(fetchedTodos.data);
    }
    
  fetchTodos();
  }, [setTodos])

  return todos;
}

function App() {
  const todos = useTodos()
  return (<div>
    <Title />
    <AddNote handleSubmit={addTodoHandler}/>
    <TodoList  todos={todos} handler={updateTodoHandler}/>
  </div>
    
  );
}

export default App;
