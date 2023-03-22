const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getDiaries(){
  const rows = await db.query(
    `SELECT * from diaries ORDER BY diary_date DESC`
  );
  const data = helper.emptyOrRows(rows);

  return {
    data
  }
}
async function getDiariesByDate(param){
    console.log(param);
    const rows = await db.query(
      `SELECT * from diaries WHERE diary_date LIKE "${param}%"`
    );
    const data = helper.emptyOrRows(rows);
    console.log(rows);
    return {
      data
    }
  }
  async function getDiariesByName(param){
    console.log(param);
    const rows = await db.query(
      `SELECT * from diaries WHERE diary_date LIKE "${param}%"`
    );
    const data = helper.emptyOrRows(rows);
    console.log(rows);
    return {
      data
    }
  }

module.exports = {
  getDiaries,
  getDiariesByDate,
  getDiariesByName
}