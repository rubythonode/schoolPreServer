var mongoose = require('mongoose');

var lectureEvalSchema = new Schema({
    school: String,
    code: String,

    lecture: ObjectId,

    editor: ObjectId,

    report: Boolean,
    reportCnt: Number,

    test: Boolean,
    testCnt: Number,

    totalEval: Number
})