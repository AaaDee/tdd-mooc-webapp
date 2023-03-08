import './App.css';
import { AddNote } from './components/AddNote';
import { Title } from './components/Title'
import { TodoList } from './components/TodoList';

const todo = {
  id: 1,
  name: "do something",
  archived: false,
  done: false,
}

function App() {
  return (<div>
    <Title />
    <AddNote name='hi'/>
    <TodoList  todos={[todo]}/>
  </div>
    
  );
}

export default App;
