const PostgresTodoDao = require('../models/PostgresTodoDao')
const conf = {
  user: 'webapp',
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: "secret",
  port: process.env.PGPORT,
}

const todo = {
  name: "do something",
  archived: false,
  done: false,
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
});
