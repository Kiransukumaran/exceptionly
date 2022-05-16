const router = require('express').Router();
const { index } = require('../controller/status');

router.get('/', index);

module.exports = router;
