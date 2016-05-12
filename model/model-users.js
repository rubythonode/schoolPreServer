/**
 * Created by Cheol on 2016. 5. 5..
 */

var gcloud = require('gcloud');
var config = require('../config');
var crypto = require('crypto');
const secret = 'schoolPre';

var ds = gcloud.datastore({
    projectId: config.get('GCLOUD_PROJECT')
});
var kind = 'User';



// Translates from Datastore's entity format to
// the format expected by the application.
//
// Datastore format:
//   {
//     key: [kind, id],
//     data: {
//       property: value
//     }
//   }
//
// Application format:
//   {
//     id: id,
//     property: value
//   }


// Creates a new book or updates an existing book with new data. The provided
// data is automatically translated into Datastore format. The book will be
// queued for background processing.
// [START update]
function update (id, data, cb) {
    var key;
    if (id) {
        key = ds.key([kind, parseInt(id, 10)]);
    } else {
        key = ds.key(kind);
    }

    var entity = {
        key: key,
        data: data
    };

    ds.save(
        entity,
        function (err) {
            data.id = entity.key.id;
            cb(err, err ? null : data);
        }
    );
}
// [END update]

function read (id, cb) {
    var key = ds.key([kind, parseInt(id, 10)]);
    ds.get(key, function (err, entity) {
        if (err) {
            return cb(err);
        }
        if (!entity) {
            return cb({
                code: 404,
                message: 'Not found'
            });
        }
        cb(null, fromDatastore(entity));
    });
}

function _delete (id, cb) {
    var key = ds.key([kind, parseInt(id, 10)]);
    ds.delete(key, cb);
}


function create(data, cb) {
    var key = ds.key(kind);

    console.log(data)
    var query = ds.createQuery(kind)
        .filter('email', '=', data.email)
        .limit(1)

    ds.runQuery(query, function (err, existedUser) {
        if(err){
            cb(err)
        }
        if(existedUser.length != 0){
            cb({message: 'existed Email'})
        }
        else {
            data.created = new Date()
            data.pw = crypto.createHmac('sha256', secret)
                .update(data.pw)
                .digest('hex');
            var entity = {
                key: key,
                data: data
            }
            ds.save(entity, function (err) {
                if(err) {
                    cb(err)
                }
                cb(err, entity)
            })
        }
    })
}

function signin(data, cb) {

    console.log(data)
    var query = ds.createQuery(kind)
        .filter('email', '=', data.email)
        .filter('pw', '=', data.pw)
        .limit(1)

    ds.runQuery(query, function (err, foundUser) {
        console.log(foundUser)
        if(err) {
            cb(err)
        }
        if(foundUser) {
            cb(err,foundUser[0])
        }
        else {
            cb({message: 'cannot found user'})
        }
    })
}
// [START exports]
module.exports = {
    create: create,
    read: read,
    update: update,
    delete: _delete,
    signin: signin
};
// [END exports]
