var express = require('express');
var router = express.Router();

/*  */
router.get('/', function(req, res, next) {
  res.send({ server: 'Express and SQL for medical-equipment project' });
});

module.exports = router;
