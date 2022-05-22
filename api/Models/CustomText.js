const mongoose = require('mongoose');

const CTextSchema = new mongoose.Schema({
    href: { type: String },
    src: { type: String },
    headline: { type: String },
    desc: { type: String },
    index: { type: String },
    lastUpdater: { type: String },
    lastUpdatedDate: { type: Date },
});

module.exports = mongoose.model('CustomText', CTextSchema);