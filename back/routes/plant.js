const express = require('express');
const router = express.Router();
const plants = require('../servies/plant');

/* GET plant. */
router.get('/', async function(req, res, next) {
    try {
      res.json(await plants.getPlants(req.query.page));
    } catch (err) {
      console.error(`Error while getting plant `, err.message);
      next(err);
    }
  });

module.exports = router;