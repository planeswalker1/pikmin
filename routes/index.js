const router = require('express').Router();

router.get('/', function (req, res, next) {
  return res.render('index');
});

module.exports = router;