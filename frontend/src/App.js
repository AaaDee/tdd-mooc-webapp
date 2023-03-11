import './App.css';
import { AddNote } from './components/AddNote';
import { Title } from './components/Title'
import { TodoList } from './components/TodoList';
import axios from 'axios'
import { useEffect, useState } from 'react';
import { ArchiveButton } from './components/ArchiveButton';

const addTodoHandler = (updateListener) => async (text) => {
  const newTodo = {
    name: text,
    archived: false,
    done: false,
  }
  try {
    await axios.post('api/todos', newTodo)
    updateListener(true)
  } catch (e) {
    console.log(e)
  }
}

const updateTodoHandler = (updateListener) => async (todo) => {
  try {
    await axios.put('api/todos', todo)
    updateListener(true)
  } catch (e) {
    console.log(e)
  }
}

const archiveHandler = (updateListener) => async () => {
  try {
    await axios.post('api/todos/archive');
    updateListener(true);
  } catch (e) {
    console.log(e)
  }
} 

const useTodos = () => {
  const [shouldUpdate, setShouldUpdate] = useState(true);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const fetchedTodos = await axios.get('api/todos');
        setTodos(fetchedTodos.data);
      } catch (e) {
        console.log(e)
      }
      
    }
  
  if (shouldUpdate) {
    fetchTodos();
    setShouldUpdate(false);
  }
  
  }, [setTodos, setShouldUpdate, shouldUpdate])

  return { todos, setShouldUpdate};
}

function App() {
  const { todos, setShouldUpdate}  = useTodos()
  return (<div>
    <Title />
    <AddNote handleSubmit={addTodoHandler(setShouldUpdate)}/>
    <br />
    <ArchiveButton handler={archiveHandler(setShouldUpdate)} />
    <TodoList  todos={todos} handler={updateTodoHandler(setShouldUpdate)}/>
  </div>
    
  );
}

export default App;
