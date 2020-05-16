const express = require('express');
const app = express();


//DB config
//const db = require('./config/key').mongoURI;



app.get("/", (req, res) => {
    res.send('hello worlll666l');
})

// const port = process.env.PORT || 5000;

// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// })
//监听5000端口
var server = app.listen(5000, function() {
    console.log('Listening on port %d', server.address().port);
});

const mongoose = require('mongoose');


var db = mongoose.connect('mongodb://localhost:27017/finansys').connection;


//Connect to mongodb
mongoose.connect(db)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

module.exports = mongoose;