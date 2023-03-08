import './App.css';
import { AddNote } from './components/AddNote';
import { Title } from './components/Title'
import { TodoList } from './components/TodoList';
import axios from 'axios'

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

function App() {
  return (<div>
    <Title />
    <AddNote handleSubmit={addNoteHandler}/>
    <TodoList  todos={[todo]}/>
  </div>
    
  );
}

export default App;
