const conf = {
  user: 'webapp',
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: "secret",
  port: process.env.PGPORT,
}

module.exports = conf;