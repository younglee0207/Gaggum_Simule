const express = require('express');
const router = express.Router();
const turtles = require('../servies/turtle');

/* GET programming languages. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await turtles.getTurtle(req.query.page));
    console.log("turtle!");
  } catch (err) {
    console.error(`Error while getting programming languages `, err.message);
    next(err);
  }
});

module.exports = router;