import React, { useState } from "react";

export function Todo(props) {
  const [input, setInput] = useState('');

  const handleDoneClick = () => {
    props.handler({...props.todo, done: !props.todo.done})
  }

  const handleEditClick = () => {
    props.handler({...props.todo, name: input})
  }

  const onTextChange = event => {
    setInput(event.target.value);
  }
    

  return(
    <div>
      <p>{props.todo.name}</p>
      <p>
        Done: {`${props.todo.done}`} <br/>
        <button onClick={handleDoneClick}>{props.todo.done ? 'set not done' : 'set done'}</button>
      </p>
      
      <p>
        <input type='text' value={input} onChange={onTextChange}/> <br/>
        <button onClick={handleEditClick}>{'Edit'}</button>  
      </p>

    </div>
  )
}