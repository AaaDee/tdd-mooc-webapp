import React, { useState } from "react";

export function AddNote(props) {
  const [input, setInput] = useState('')

  const handleChange = event => {
    setInput(event.target.value);
  }

  const onClick = () => {
    props.handleSubmit(input)
  }

  return (
    <div>
      <input type='text' value={input} onChange={handleChange} />
      <button onClick={onClick}>Add note</button>
    </div>
  )
}