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
    console.log('all rows', rows)
    return rows;
  }

  async save(row) {
    const query= await this.db.query(
      `insert into todos (name, archived, done) values ($1, $2, $3) returning id, name, archived, done`,
      [row.name, row.archived, row.done]
    )
    return query.rows[0]
  }

}

module.exports = PostgresTodoDao;