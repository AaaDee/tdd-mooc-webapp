const PostgresTodoDao = require('../models/PostgresTodoDao')

const conf = {
  user: 'webapp',
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: "secret",
  port: process.env.PGPORT,
}


describe("Connecting to database", () => {
  beforeEach(async () => {
    todos = new PostgresTodoDao(conf);
    await todos.db.query("insert into todos (id, name, archived, done) values (1, 'do something', false, false)")
  });

  afterEach(async () => {
    await todos.db.query("delete from todos")
    todos.close();
  });

  it("returns todos", async () => {
    result = await todos.getAll();
    expect(result[0].name).toBe("do something")
  });
});
