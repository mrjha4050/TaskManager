const admin = require('firebase-admin');
const serviceAccount = require('./Taskmanager Firebase Admin SDK.json');  
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;