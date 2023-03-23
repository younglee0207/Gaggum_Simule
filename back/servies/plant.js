const db = require('./db');
const helper = require('../helper');

async function getPlants(){
    const rows = await db.query(
      `SELECT * from plants WHERE plant_isdelete=0`
    );
    const data = helper.emptyOrRows(rows);
  
    return {
      data
    }
  }
  async function getPlantByNumber(param){
    const rows = await db.query(
      `SELECT * from plants WHERE plant_number = ${param} AND plant_isdelete = 0`
    );
    const data = helper.emptyOrRows(rows);
  
    return {
      data
    }
  }
  async function waterPlant(body){
    const rows = await db.query(
      `UPDATE plants
      SET plant_last_watering_date = now()
      WHERE plant_number = ${body.plant_number} AND plant_isdelete = 0`
    );
    const data = helper.emptyOrRows(rows);
  
    return {
      data
    }
  }
module.exports = {
    getPlants,
    getPlantByNumber,
    waterPlant
}