const pg = require('pg');

const defaultConf = {
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
}


class PostgresTodoDao {
  constructor (testingConf) {
    const conf = testingConf ?? defaultConf;
    this.db = new pg.Pool(conf);
  }

  close() {
    this.db.end();
  }

  async getAll() {
    const { rows } = await this.db.query(
      `select id, name, archived, done from todos`
    );
    return rows;
  }

  async save(row) {
    const query= await this.db.query(
      `insert into todos (name, archived, done) values ($1, $2, $3) returning id, name, archived, done`,
      [row.name, row.archived, row.done]
    )
    return query.rows[0]
  }

  async update(row) {
    const query = await this.db.query(
      `update todos
       set name = $2, archived = $3, done = $4
       where id = $1
       returning id, name, archived, done
       `,
      [row.id, row.name, row.archived, row.done]
    )
    return query.rows[0]
  }

}

module.exports = PostgresTodoDao;