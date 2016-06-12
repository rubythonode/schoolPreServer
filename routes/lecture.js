var express = require('express');
var router = express.Router();
var modelLecture = require('./../model/model-lecture-mongo');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

// Lecture을 처음부터 다 가져올것인가 -> 수업 가져오는 bot을 만들어야함, 즉 학교 수업을 전부 볼수잇는 ID가 필요
// 누군가가 새로 가입하면 그 사람의 수업 정보를 가지고 새로 lecture을 만들것인가? -> bot 없어도 됨. 
// 다만 누군가가 아직 등록하지 않은 수업을 볼려고 하면 문제가 생김.


// 수업 읽어 들이기
router.get('/:school/:lectureCode', function (req, res, next) {
    var data = req.body;

    // 년도가 바뀌어도 lectureCode가 바뀌는지 안바뀌는지가 중요. 
    // 바뀐다면 안바뀌는건 무엇일까?  
    var lectureFindCondition = {
        school: req.param.school,
        lectureCode: req.param.school
    }
    modelUser.read(lecture, function (err, user) {
        if(err) {
            console.log(err);
            return next(err);
        }
        res.json(user)
    })
});

router.post('/:school/:lectureCode/eval', function (req, res, next){
    var data = req.body;

    var lectureFindCondition = {
        school: req.param.school,
        lectureCode: req.param.school
    }
})


// 수업애 글쓰기. ex) 과제, 시험, 타임라인
router.post('/:school/:lectureCode/timeLine', function (req, res, next) {
    var data = req.body;

    console.log(req.body);
    modelUser.update(data, function (err, user) {
        if(err) {
            console.log(err);
            return next(err);
        }
        console.log(user)
        res.json(user)
    })
});


module.exports = router;
