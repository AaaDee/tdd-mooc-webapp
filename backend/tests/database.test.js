const PostgresTodoDao = require('../models/PostgresTodoDao')

const todo = {
  name: "do something",
  archived: false,
  done: false,
}

const conf = {
  user: 'webapp',
  password: 'secret'
}

describe("Getting data from database", () => {
  let todos;
  beforeEach(async () => {
    todos = new PostgresTodoDao(conf);
    await todos.db.query("insert into todos (id, name, archived, done) values (1, 'do something', false, false)")
  });

  afterEach(async () => {
    await todos.db.query("delete from todos")
    todos.close();
  });

  it("returns todos", async () => {
    const result = await todos.getAll();
    expect(result[0].name).toBe("do something")
  });
});

describe("Sending data to database", () => {
  let todos;
  beforeEach(async () => {
    todos = new PostgresTodoDao(conf);
  });

  afterEach(async () => {
    await todos.db.query("delete from todos")
    todos.close();
  });

  it("posting a todo", async () => {
    await todos.save(todo);
    const result  = await todos.getAll();
    expect(result[0].name).toBe("do something")
  });

  it("updating a todo", async () => {
    await todos.save(todo);
    const savedTodos = await todos.getAll();
    todos.update({
      ...savedTodos[0],
      done: true
    })
    const result  = await todos.getAll();
    expect(result[0].done).toBe(true)
  });

  it("archiving a done todo", async () => {
    await todos.save({...todo, done: true});
    await todos.archive();
    const result  = await todos.getAll();
    expect(result[0].archived).toBe(true);
  });
});
