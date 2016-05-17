/**
 * Created by Cheol on 2016. 5. 5..
 */

var gcloud = require('gcloud');
var config = require('../config');

var ds = gcloud.datastore({
    projectId: config.get('GCLOUD_PROJECT')
});
var kind = 'Lecture';

function create(data, cb) {
    var key = ds.key(kind);
    
    console.log(data);
    var query = ds.createQuery(kind)
            .filter('school', '=', data.school)
            .filter('code', '=', data.code)
            .limit(1)
            
    ds.runQuery(query, function (err, existedLecture) {
        
    })
    
}

// [START exports]
module.exports = {
    create: create,
    read: read,
    update: update,
    delete: _delete
};
// [END exports]
