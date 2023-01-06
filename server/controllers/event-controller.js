const Event = require('../models/event-model');
const Calendar = require('../models/calendar-model')
const User = require('../models/user-model');
const jwt = require('jsonwebtoken');

class EventController {
    // Create a new event
    createEvent = async (req, res) => {
        if (!req.cookies.usertoken) {
            return res.status(400);
        }
        const userData = jwt.decode(req.cookies.usertoken, { complete: true }), userID = userData.payload.id;
        let user = await User.findOne({ _id: userID }), { ...data } = req.body;

        if (req.body.startTime >= req.body.endTime) {
            return res.status(400).send({ error: "Start time must be before end time" });
        }
    
        data.user = user;

        if (data.calendar) {
            let calendar = await Calendar.findOne({_id: data.calendar})
            data.calendar = calendar;
        }
    
        try {
            const newEvent = await new Event(data).save()
            //next project: optimize the database?
            const updatedUser = await User.findOneAndUpdate({ _id: userID }, { $push: { events: newEvent } })
            if (data.calendar) {
                const updatedCalendar = await Calendar.findOneAndUpdate({_id: data.calendar._id}, {$push: {events: newEvent} })
            }
            res.json(newEvent);
        } catch (err) {
            res.json(err);
        }
    };

    getUserEvents = async (req, res) => { 
        if (!req.cookies.usertoken) {
            return res.status(400);
        }
        const userData = jwt.decode(req.cookies.usertoken, { complete: true }), userID = userData.payload.id;
        let user = await User.findOne({ _id: userID })
        Event.find({ user: user }).sort({ startTime: 1 })
            .then(event => res.json(event))
            .catch(err => res.json(err))
    }

    getEventCalendar = async (req, res) => {
        if (!req.cookies.usertoken) {
            return res.status(400);
        }
        const event = await Event.findById(req.params.id)
        Calendar.findById(event.calendar)
            .then(calendar => res.json(calendar))
            .catch(err => res.json(err))
    }


    // Update an event
    updateEvent = async (req, res) => {
        if (!req.cookies.usertoken) {
            return res.status(400);
        }

        //need to add user verification! -> is user in calendar approved list, calendar owner or event owner?

        const userData = jwt.decode(req.cookies.usertoken, { complete: true }), userID = userData.payload.id;
        let { ...data } = req.body;
        
        if (req.body.startTime >= req.body.endTime) {
            return res.status(400).send({ error: "Start time must be before end time" });
        }

        if (!data.calendar) {
            await Event.findByIdAndUpdate(req.params.id, {$unset: {calendar: 1}})
        }

        Event.findByIdAndUpdate(req.params.id, data)
            .then(event => res.json(event))
            .catch(err => res.json(err));
    };

    // Delete an event
    deleteEvent = async (req, res) => {
        if (!req.cookies.usertoken) {
            return res.status(400);
        }

        //check for verification? {same as the update event verifications}

        Event.findByIdAndDelete(req.params.id)
            .then(event => res.json(event))
            .catch(err => res.json(err));
    };
}

module.exports = new EventController();

