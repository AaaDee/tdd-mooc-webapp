import './App.css';
import { AddNote } from './components/AddNote';
import { Title } from './components/Title'
import { TodoList } from './components/TodoList';
import axios from 'axios'
import { useEffect, useState } from 'react';

const todo = {
  id: 1,
  name: "do something",
  archived: false,
  done: false,
}

const addNoteHandler =  async (text) => {
  const newTodo = {
    name: text,
    archived: false,
    done: false,
  }
  await axios.post('/todos', newTodo)
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
  console.log('app', todos)
  return (<div>
    <Title />
    <AddNote handleSubmit={addNoteHandler}/>
    <TodoList  todos={todos}/>
  </div>
    
  );
}

export default App;
