const mongoose = require('mongoose');

const AcademicStaffSchema = new mongoose.Schema({
    name: { type: String },
    role: { type: String },
    href: { type: String },
    src: { type: String },
    desc: { type: String },
    bb: { type: Boolean },
    administration: { type: Boolean },
    lastUpdater: { type: String },
    lastUpdatedDate: { type: Date },
});

module.exports = mongoose.model('AcademicStaff', AcademicStaffSchema);