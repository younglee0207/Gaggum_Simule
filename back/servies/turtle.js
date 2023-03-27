const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getTurtle(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * from turtles LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}
async function getTurtleByKey(body){
    console.log(body.turtle_key);
    const rows = await db.query(
      `SELECT turtle_number from turtles WHERE turtle_key = "${body.turtle_key}"`
    );
    const data = helper.emptyOrRows(rows);
    console.log(rows);
    return {
      data
    }
  }

module.exports = {
  getTurtle,
  getTurtleByKey
}