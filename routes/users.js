var express = require('express');
var router = express.Router();

var modelUser = require('./../model/model-user-mongo')
var modelLecture = require('./../model/model-lecture-mongo')


var path = require('path');

router.get('/login', function(req, res, next){
    res.sendFile(path.join(__dirname + '/../public/login.html'));
});
router.get('/loginComplete', function(req, res, next){
    res.sendFile(path.join(__dirname + '/../public/loginComplete.html'));
});

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});


//로그인 완료 후에는 항상 Client에서 보내는 데이터 형식은
// {
//     uid: Int,
//     email: String,
//     provider: String,
// }
// 
// {
//     받는 Data형식은 항상 user Object
// }
router.post('/signin', function (req, res, next) {
    var data = req.body;
    console.log(data)

    var uid = data.uid
    var email = data.email
    var provider = data.provider

    var userFindCondition = {
        uid: uid, //uid로만 판단, email은 같은게 잇을수도 있음. 이 경우 어떻게 처리할까?
    }

    modelUser.find(userFindCondition)
        .exec(function(err, user){
            if(user.length == 0){
                console.log('user was not')
                // => 회원가입)
                var newUser = new modelUser({uid: uid, email: email, provider: provider})
                newUser.save(function(err, savedUser){
                    if(err){
                        console.log(err)
                    }
                    else{
                        res.json(savedUser)
                    }
                })   
            }
            if(err){
                console.log(err)
            }
            if(user.length == 1) {
                console.log('user was')
                // => 로그인
                res.json(user[0])
            }
        })    
});


// post로 이러한 Data가 들어옴 -> 이 액션은 수업을 학교에서 받아올때만 실행, 나중에 시간표를 자기가 수정할 때는 실행하지 않음 
// {
//     uid: uid,
//     school: String,
//     timeTable: Array
//     timeTable을 받어서 얘가 어떤 수업을 듣는지 파악, 그 후 듣는 수업의 timeLine에 
//     이벤트가 추가될 경우 알림.(아마?)
// }
router.post('/editTimeTable', function (req, res, next) {
    // NOTE: 일단 send로 'ok'을 보낸다. 그 담에 저장 -> 이건 나중에 수정을 해야하나. 
    res.send('ok')
    var data = req.body

    var uid = data.uid
    var school = data.school
    
    // 업데이트 + 만약 timeTable에 들어온 lectureData가 처음본 lecture일 경우 저장
            // timetable은 [[],[],[],...] 같은 상태이기때문에 이렇게 map을 사용해서 분리.
            data.timeTable.map(function(DayTimeTable, index){
                DayTimeTable.map(function(lecture, index){
                    // 이름이 none이면 수업 없다는 의미
                    if(lecture.lectureName != 'None'){
                        var lectureFindCondition = {
                            code: lecture.code,
                            school: school
                        }
                        // 수업을 찾음
                        modelLecture.find(lectureFindCondition)
                            .exec(function(err, foundLecture){
                                // 그 수업이 없다면 저장 이때, 이걸 듣는사람을 추가. 이 사람.
                                if(foundLecture.length == 0){
                                    var newLecture = new modelLecture({
                                        code: lecture.lectureCode,
                                        teacher: lecture.lectureTeacher,
                                        room: lecture.lectureRoom,
                                        name: lecture.lectureName,
                                        school: school
                                    })
                                    newLecture.student.push(uid) // 일단 uid인데 나중에 objectId로 바꾸자.
                                    newLecture.save()
                                } else{
                                    // 수업이 있다면 듣는 사람만 추가.
                                    foundLecture[0].student.push(uid)
                                    foundLecture[0].save()
                                }
                            })
                    }
                })
            })
})


// 자기 정보를 바꿀땐 여기서 바꿈
// {
//     uid: uid,
//     name: String,
//     nickName: String,
// }
router.post('/edit', function (req, res, next) {
    var data = req.body
    var userFindCondition = {
        uid: data.uid
    }
    modelUser.findOne(userFindCondition)
        .exec(function(err, foundUser){
            foundUser.name = data.name
            foundUser.nickName = data.nickName
            foundUser.save(function(err, savedUser){
                if(err) res.err(err)
                else res.json(savedUser)
            })
        })
})

module.exports = router;
