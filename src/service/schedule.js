const { google } = require('googleapis');

const createEventBody = (data) => {
    return {
        summary: data.body.topic,
        location: data.responseBody.join_url,
        description: data.body.topic,
        start: {
            dateTime: new Date(data.body.date).toISOString(),
        },
        end: {
            dateTime: new Date(
                new Date(data.body.date).getTime() + data.body.duration * 60000
            ).toISOString(),
        },
        attendees: data.body.attendees,
        reminders: {
            useDefault: true,
        },
    };
};

const scheduleEvent = async (auth, data) => {
    try {
        const calendar = google.calendar({ version: 'v3', auth });
        const eventBody = createEventBody(data);
        const event = await calendar.events.insert({
            auth: auth,
            calendarId: 'primary',
            sendUpdates: 'all',
            resource: eventBody,
        });
        return event;
    } catch (error) {
        console.log(
            'There was an error contacting the Calendar service: ' + error
        );
        return null;
    }
};

module.exports = { scheduleEvent };
