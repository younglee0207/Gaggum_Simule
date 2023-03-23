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
  async function getPlantByNumber(param){
    const rows = await db.query(
      `SELECT * from plants WHERE plant_number = ${param}`
    );
    const data = helper.emptyOrRows(rows);
  
    return {
      data
    }
  }
module.exports = {
    getPlants,

}