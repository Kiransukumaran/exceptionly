const router = require('express').Router();
const { scheduleMeeting, listMeetings, listFreeSlots } = require('../controller/schedule');

router.post('/', scheduleMeeting);
router.get('/', listMeetings);
router.post('/slots', listFreeSlots);

module.exports = router;
