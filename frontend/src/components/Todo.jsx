import React from "react";

export function Todo(props) {
  return(
    <div>
      <p>{props.todo.name}</p>
      <p>Done: {`${props.todo.done}`}</p>
      <button>set done</button>
    </div>
  )
}