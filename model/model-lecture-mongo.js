var mongoose = require('mongoose');

var lectureSchema = new mongoose.Schema({
    school: String,
    code: String,
    teacher: String,
    room: String,
    name: String,

    evaluation: Array,
    timeLine: Array,

    student: Array, // 아마 이걸 듣는 user을 저장해야 할듯. -> objectID로도 충분    
})

var Lecture = mongoose.model('LectureModel',lectureSchema);

module.exports = Lecture;