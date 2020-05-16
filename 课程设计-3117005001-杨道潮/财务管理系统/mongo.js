const mongoose = require('mongoose');


var db = mongoose.connect('mongodb://localhost:27017/finansys').connection;


//一旦建立连接，则会触发
db.on('connected', function() {
    console.log('Mongoose connected to ' + uri);
});
//一旦该连接发生错误，则会触发
db.on('error', function(err) {
    console.log('Mongoose connection error: ' + err);
});
//一旦该连接被关闭，则会触发
db.on('disconnected', function() {
    console.log('Mongoose disconnected');
});

module.exports = mongoose;