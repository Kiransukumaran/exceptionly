const request = require('request');
const { zoomConfig } = require('../environments');
const { returnEventResponse } = require('../service/google-auth');
const { scheduleEvent } = require('../service/schedule');
const { findFreeSlots } = require('../service/slots');

const listMeetings = async (req, res, next) => {
    try {
        const options = {
            url: `${zoomConfig.apiUrl}/users/${zoomConfig.email}/meetings`,
            method: 'GET',
            auth: {
                bearer: zoomConfig.token,
            },
        };

        request(options, (error, response, body) => {
            if (error) throw error;
            res.send(JSON.parse(body));
        });
    } catch (error) {
        next(error);
    }
};

const listFreeSlots = async (req, res, next) => {
    try {
        const { body } = req;
        returnEventResponse(findFreeSlots, {
            from: body.from,
            to: body.to,
            duration: body.duration,
            res: res
        })
    } catch (error) {
        next(error);
    }
};

const scheduleMeeting = async (req, res, next) => {
    try {
        const { body } = req;
        const options = {
            url: `${zoomConfig.apiUrl}/users/${zoomConfig.email}/meetings`,
            method: 'POST',
            auth: {
                bearer: zoomConfig.token,
            },
            json: true,
            body: {
                start_time: body.date,
                duration: body.duration,
                topic: body.topic,
                meeting_invitees: body.attendees,
                type: 1,
            },
        };

        request(options, async (error, response, responseBody) => {
            if (!error && response.statusCode === 201) {
                returnEventResponse(scheduleEvent, { body, responseBody });
                res.send({
                    message: 'meeting has been successfully created ',
                    responseBody,
                });
            } else {
                res.send({ message: body.message });
            }
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { scheduleMeeting, listMeetings, listFreeSlots };
