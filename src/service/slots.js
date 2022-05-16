const findSlots = require("calendar-slots");
const { google } = require('googleapis');


const findFreeSlots = async (auth, data) => {
    const calendar = google.calendar({ version: 'v3', auth });
    const slots = await findSlots.getSlots({
        auth: auth,
        calendar: calendar,
        from: new Date(data.from),
        to: new Date(data.to),
        slotDuration: data.duration
    })
    return data.res.send(slots);
}

module.exports = {findFreeSlots};
