const db = require('./db');
const helper = require('../helper');

async function getPlants(){
    const rows = await db.query(
      `SELECT * from plants`
    );
    const data = helper.emptyOrRows(rows);
  
    return {
      data
    }
  }
module.exports = {
    getPlants,

}