const PostgresTodoDao = require('../models/PostgresTodoDao')
const conf = require('./configuration')

async function deleteAll() {
  const dao = new PostgresTodoDao(conf);
  await dao.db.query("delete from todos")
  dao.close()
}

module.exports = deleteAll