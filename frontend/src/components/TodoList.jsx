import React from 'react';
import { Todo } from './Todo';

export function TodoList(props) {
  return (
    <ul>
      {props.todos.map(todo => <Todo key={todo.id} todo={todo}/>)}
    </ul>
  )
}