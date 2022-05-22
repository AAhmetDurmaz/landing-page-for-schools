const mongoose = require('mongoose');

const TimetableSchema = new mongoose.Schema({
    name: { type: String },
    src: { type: String },
    lastUpdater: { type: String },
    lastUpdatedDate: { type: Date },
});

module.exports = mongoose.model('Timetable', TimetableSchema);