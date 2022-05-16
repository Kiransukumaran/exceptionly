const router = require('express').Router();
const common = require('./common');
const schedule = require('./schedule');

router.use('/status', common);
router.use('/schedule', schedule);
router.get('/auth', (req, res) => {
    res.send(req.query);
});

module.exports = router;
