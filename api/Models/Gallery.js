const mongoose = require('mongoose');

const GallerySchema = new mongoose.Schema({
    name: { type: String },
    src: { type: String },
    desc: { type: String },
    lastUpdater: { type: String },
    lastUpdatedDate: { type: Date },
});

module.exports = mongoose.model('Gallery', GallerySchema);