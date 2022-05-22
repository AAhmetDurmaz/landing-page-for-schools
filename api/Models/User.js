const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    password: { type: String },
    powers: { type: Array },
    lastUpdater: { type: String },
    lastUpdatedDate: { type: String },
});

module.exports = mongoose.model('User', UserSchema);