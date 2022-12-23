const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Event name is required!"]
    },
    description: {
        type: String,
    },
    location: {
        type: String,
    },
    startTime: {
        type: Date,
        required: [true, "Start Time is required!"]
    },
    endTime: {
        type: Date,
        required: [true, "End Time is required!"]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true],
        ref: "User"
    },
    calendar: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Calendar"
    }
}, { timestamps: true }
);

module.exports = mongoose.model('Event', EventSchema);