const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    href: { type: String },
    src: { type: String },
    headline: { type: String },
    desc: { type: String },
    index: { type: String },
    lastUpdater: { type: String },
    lastUpdatedDate: { type: Date },
});

module.exports = mongoose.model('Event', EventSchema);