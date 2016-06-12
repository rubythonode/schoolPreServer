var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    uid: String,
    provider: String,
    email: String,

    name: String,
    nickName: String,
    school: String,
    
    timeTable: Array,

    circle: Array,
})

var User = mongoose.model('UserModel',userSchema);

module.exports = User;