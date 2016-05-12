var nconf = module.exports = require('nconf');
var path = require('path');

nconf
// 1. Command-line arguments
    .argv()
    // 2. Environment variables
    .env([
      'DATA_BACKEND',
      'GCLOUD_PROJECT',
      'PORT'
    ])
    // 3. Config file
    .file({ file: path.join(__dirname, 'config.json') })
    // 4. Defaults
    .defaults({

      // This is the id of your project in the Google Cloud Developers Console.
      GCLOUD_PROJECT: 'schoolpre-1302',

      // MongoDB connection string
      // https://docs.mongodb.org/manual/reference/connection-string/


      // Port the HTTP server
      PORT: 8080
    });

// Check for required settings
checkConfig('GCLOUD_PROJECT');

// if (nconf.get('DATA_BACKEND') === 'cloudsql') {
//   checkConfig('MYSQL_USER');
//   checkConfig('MYSQL_PASSWORD');
//   checkConfig('MYSQL_HOST');
// } else if (nconf.get('DATA_BACKEND') === 'mongodb') {
//   checkConfig('MONGO_URL');
//   checkConfig('MONGO_COLLECTION');
// }

function checkConfig (setting) {
  if (!nconf.get(setting)) {
    throw new Error('You must set the ' + setting + ' environment variable or' +
        ' add it to config.json!');
  }
}
