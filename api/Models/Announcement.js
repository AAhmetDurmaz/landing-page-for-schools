const mongoose = require('mongoose');

const AnnouncementSchema = new mongoose.Schema({
    href: { type: String },
    src: { type: String },
    headline: { type: String },
    index: { type: String },
    lastUpdater: { type: String },
    lastUpdatedDate: { type: Date },
});

module.exports = mongoose.model('Announcement', AnnouncementSchema);