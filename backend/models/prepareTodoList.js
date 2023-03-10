async function prepareTodoList(dao) {
  const allTodos = await dao.getAll();
  return allTodos.filter(todo => !todo.archived);
}

module.exports = prepareTodoList;