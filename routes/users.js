var express = require('express');
var router = express.Router();
var modelUser = require('./../model/model-users');

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
    modelUser.create(data, function (err, user) {
        if(err) {
            console.log(err);
            return next(err);
        }
        res.json(user)
    })
})


module.exports = router;
