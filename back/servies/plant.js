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
  async function getWaterNeedPlant(){
    const rows = await db.query(
      `SELECT * from plants WHERE (curdate()-plant_last_watering_date)>=plant_watering_cycle;`
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
  async function editPlant(body){
    const rows = await db.query(
      `UPDATE plants
      SET plant_name = ${body.plant_name}, plant_memo = ${body.plant_memo}, plant_watering_cycle = ${body.plant_watering_cycle}, plant_watering_amount = ${body.plant_watering_amount} 
      WHERE plant_number = ${body.plant_number} AND plant_isdelete = 0`
    );
    const data = helper.emptyOrRows(rows);
  
    return {
      data
    }
  }
  async function deletePlant(body){
    const rows = await db.query(
      `UPDATE plants
      SET plant_isdelete = 1
      WHERE plant_number = ${body.plant_number} AND plant_isdelete = 0`
    );
    const data = helper.emptyOrRows(rows);
  
    return {
      data
    }
  }
  async function createPlant(body){
    const rows = await db.query(
      `UPDATE plants
      SET plant_isdelete = 1
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
    waterPlant,
    getWaterNeedPlant,
    editPlant,
    deletePlant,
    createPlant
    
}