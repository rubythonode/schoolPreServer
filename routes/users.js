var express = require('express');
var router = express.Router();
var modelUser = require('./../model/model-users');

var path = require('path');

router.get('/login', function(req, res, next){
    res.sendFile(path.join(__dirname + '/../public/login.html'));
})
router.get('/loginComplete', function(req, res, next){
    res.sendFile(path.join(__dirname + '/../public/loginComplete.html'));
})
/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.post('/signin', function (req, res, next) {
    var data = req.body;

    modelUser.signin(data, function (err, user) {
        if(err) {
            console.log(err);
            return next(err);
        }
        res.json(user)
    })
});

router.post('/signup', function (req, res, next) {
    var data = req.body;

    console.log(req.body);
    modelUser.signup(data, function (err, user) {
        if(err) {
            console.log(err);
            return next(err);
        }
        console.log(user)
        res.json(user)
    })
})


module.exports = router;
