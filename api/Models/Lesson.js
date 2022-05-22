const mongoose = require('mongoose');

const LessonSchema = new mongoose.Schema({
    semester: { type: Number },
    name: { type: String },
    theorical: { type: Number },
    pratical: { type: Number },
    credit: { type: Number },
    akts: { type: Number },
    lastUpdater: { type: String },
    lastUpdatedDate: { type: Date },
});

module.exports = mongoose.model('Lesson', LessonSchema);