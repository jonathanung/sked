const Calendar = require('../models/calendar-model');
const User = require('../models/user-model');
const Event = require('../models/event-model');
const jwt = require('jsonwebtoken');

class CalendarController {
    // Create a new calendar
    createCalendar = async (req, res) => {
        if (!req.cookies.usertoken) {
            return res.status(400);
        }
        const userData = jwt.decode(req.cookies.usertoken, { complete: true }), userID = userData.payload.id;
        let user = await User.findOne({ _id: userID }), { ...data } = req.body;

        data.user = user;

        try {
            const newCalendar = await new Calendar(data).save()
            // const calendarArray = await User.find({ _id: userID }).calendars;
            //next project: optimize the database?
            const updatedUser = await User.findOneAndUpdate({ _id: userID }, { $push: { calendars: newCalendar } })
            res.json(newCalendar);
        } catch (err) {
            res.json(err);
        }
    };

    getOneCalendar = async (req, res) => {
        if (!req.cookies.usertoken) {
            return res.status(400);
        }
        const calendar = await Calendar.findOne({ _id: req.params.id })
            .then(calendar => res.json(calendar))
            .catch(err => res.json(err))
    }

    getUserCalendars = async (req, res) => {
        if (!req.cookies.usertoken) {
            return res.status(400);
        }
        const userData = jwt.decode(req.cookies.usertoken, { complete: true }), userID = userData.payload.id;
        let user = await User.findOne({ _id: userID }).sort({createdAt : 1})
        Calendar.find({ user: user }).sort({ startTime: 1 })
            .then(calendar => res.json(calendar))
            .catch(err => res.json(err))
    }

    getCalendarEvents = async (req, res) => {
        if (!req.cookies.usertoken) {
            return res.status(400);
        }
        const userData = jwt.decode(req.cookies.usertoken, { complete: true }), userID = userData.payload.id;
        
        let calendarID = req.params.id;

        const calendar = await Calendar.findById(calendarID)
            .then(calendar => {
                if (calendar.user !== userID) {
                    return res.status(400)
                }
            })
            .catch(err => { return (res.json(err)) })
            
        Event.find({ calendar: calendar }).sort({ startTime: 1 })
            .then(events => res.json(events))
            .catch(err => res.json(err))

    }

    // Update an calendar
    updateCalendar = async (req, res) => {
        if (!req.cookies.usertoken) {
            return res.status(400);
        }

        //need to add user verification! -> is user in calendar approved list, calendar owner or calendar owner?

        const userData = jwt.decode(req.cookies.usertoken, { complete: true }), userID = userData.payload.id;
        let { ...data } = req.body;

        Calendar.findByIdAndUpdate(req.params.id, data)
            .then(calendar => res.json(calendar))
            .catch(err => res.json(err));
    };

    // Delete an calendar
    deleteCalendar = async (req, res) => {
        if (!req.cookies.usertoken) {
            return res.status(400);
        }

        //check for verification? {same as the update calendar verifications}

        const calendar = await Calendar.findById(req.params.id);
        const updatedEvents = await Event.deleteMany({ calendar: calendar })
        Calendar.findByIdAndDelete(req.params.id)
            .then(calendar => res.json(calendar))
            .catch(err => res.json(err));
        
    };
}

module.exports = new CalendarController();
