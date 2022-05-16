const { google } = require('googleapis');

function listEvents(auth, data) {
    const calendar = google.calendar({ version: 'v3', auth });
    calendar.events.list(
        {
            calendarId: 'primary',
            timeMin: new Date(new Date().setUTCHours(0, 0, 0, 0)).toISOString(),
            timeMax: new Date(
                new Date().setUTCHours(23, 59, 59, 999)
            ).toISOString(),
            maxResults: 10,
            singleEvents: true,
            orderBy: 'startTime',
        },
        (err, res) => {
            if (err) return console.log('The API returned an error: ' + err);
            const events = res.data.items;
            if (events.length) {
                console.log('Events for today:');
                events.map((event) => {
                    const start = event.start.dateTime || event.start.date;
                    const end = event.end.dateTime || event.end.date;
                    console.log(`${start} - ${end} - ${event.summary}`);
                });
            } else {
                console.log('No upcoming events found.');
            }
        }
    );
}

module.exports = { listEvents };
