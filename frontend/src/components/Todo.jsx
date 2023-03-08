import React from "react";

export function Todo(props) {
  const handleClick = () => {
    props.handler({id: props.todo.id, done: true})
  }

  return(
    <div>
      <p>{props.todo.name}</p>
      <p>Done: {`${props.todo.done}`}</p>
      <button onClick={handleClick}>set done</button>
    </div>
  )
}