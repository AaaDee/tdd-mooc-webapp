import './App.css';
import { Title } from './components/Title'
import { Todo } from './components/Todo';

const todo = {
  id: 1,
  name: "do something",
  archived: false,
  done: false,
}

function App() {
  return (<div>
    <Title />
    <Todo  todo={todo}/>
  </div>
    
  );
}

export default App;
