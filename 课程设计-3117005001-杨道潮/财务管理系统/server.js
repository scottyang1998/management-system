const express = require("express");
const mongoose = require("mongoose");
const app = express(); //实例化app

//引入users.js
const users = require("./router/api/users");

//DB
const db = require("./config/db.js").MongoURI;

//Connect to mongodb
mongoose.connect(db)
        .then(()=>console.log("Mongodb CONNECTED"))
        .catch(err=>console.log(err));

app.get("/", (req, res) => {
    res.send('hello worlll666l');
})

//使用routers
app.use("/api/users",users);

const port = process.env.PORT || 5000;

app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
})