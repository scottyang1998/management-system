const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const app = express(); //实例化app


//引入users.js
const users = require("./router/api/users");
const profiles = require("./router/api/profiles");

//DB config
const db = require("./config/db.js").MongoURI;

//body-parser中间件
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//passport初始化
app.use(passport.initialize());

require("./config/passport")(passport);

//Connect to mongodb
mongoose.connect(db)
        .then(()=>console.log("Mongodb CONNECTED"))
        .catch(err=>console.log(err));

app.get("/", (req, res) => {
    res.send('hello worlll666l');
})

//使用routers
app.use("/api/users",users); 
app.use("/api/profiles",profiles); 


const port = process.env.PORT || 5000;

app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
})