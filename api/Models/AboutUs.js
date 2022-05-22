const mongoose = require('mongoose');

const HakkimizdaSchema = new mongoose.Schema({
    src: { type: String },
    index: { type: String },
    lastUpdater: { type: String },
    lastUpdatedDate: { type: Date },
});

module.exports = mongoose.model('Hakkimizda', HakkimizdaSchema);