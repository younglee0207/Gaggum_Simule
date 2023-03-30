const db = require("./db");
const helper = require("../helper");

async function getPlants() {
  try {
    const rows = await db.query(`SELECT * from plants WHERE plant_isdelete=0`);
    const data = helper.emptyOrRows(rows);
    return {
      data,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
async function getWaterNeedPlant() {
  try {
    const rows = await db.query(
      `SELECT * from plants WHERE (curdate()-plant_last_watering_date)>=plant_watering_cycle;`
    );
    const data = helper.emptyOrRows(rows);

    return {
      data,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
async function getPlantByNumber(param) {
  try {
    const rows = await db.query(
      `SELECT * from plants WHERE plant_number = ${param} AND plant_isdelete = 0`
    );
    const data = helper.emptyOrRows(rows);

    return {
      data,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
async function waterPlant(body) {
  try {
    const rows = await db.query(
      `UPDATE plants
        SET plant_last_watering_date = now()
        WHERE plant_number = ${body.plant_number} AND plant_isdelete = 0`
    );
    const data = helper.emptyOrRows(rows);

    return {
      data,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
async function editPlant(body) {
  try {
    const rows = await db.query(
      `UPDATE plants
        SET plant_name = ${body.plant_name}, plant_memo = ${body.plant_memo}, plant_watering_cycle = ${body.plant_watering_cycle}, plant_watering_amount = ${body.plant_watering_amount} 
        WHERE plant_number = ${body.plant_number} AND plant_isdelete = 0`
    );
    const data = helper.emptyOrRows(rows);

    return {
      data,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
async function deletePlant(body) {
  try {
    const rows = await db.query(
      `UPDATE plants
        SET plant_isdelete = 1
        WHERE plant_number = ${body.plant_number} AND plant_isdelete = 0`
    );
    const data = helper.emptyOrRows(rows);

    return {
      data,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
async function createPlant(body) {
  try {
    const rows = await db.query(
      `식물등록쿼리문`
    );
    const data = helper.emptyOrRows(rows);

    return {
      data,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
module.exports = {
  getPlants,
  getPlantByNumber,
  waterPlant,
  getWaterNeedPlant,
  editPlant,
  deletePlant,
  createPlant,
};
