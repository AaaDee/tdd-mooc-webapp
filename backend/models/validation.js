function validateTodoContent(todo) {
  if (!todo.name) {
    return false
  }

  if (todo.done === undefined) {
    return false
  }

  if (todo.archived === undefined) {
    return false
  }

  return true
}

function validateNewTodo(todo) {
  return validateTodoContent(todo);
}


function validateExistingTodo(todo) {
  if (!validateTodoContent(todo)) {
    return false;
  }
  return !!todo.id;
}

module.exports = {
  validateNewTodo,
  validateExistingTodo
}