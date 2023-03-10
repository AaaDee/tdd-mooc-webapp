import React from "react";

export function Todo(props) {
  const handleClick = () => {
    props.handler({...props.todo, done: !props.todo.done})
  }

  return(
    <div>
      <p>{props.todo.name}</p>
      <p>Done: {`${props.todo.done}`}</p>
      <button onClick={handleClick}>{props.todo.done ? 'set not done' : 'set done'}</button>
    </div>
  )
}