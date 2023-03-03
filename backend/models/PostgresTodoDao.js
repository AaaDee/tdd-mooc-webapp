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

}

module.exports = PostgresTodoDao;