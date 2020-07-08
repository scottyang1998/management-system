

# 实验目的

搭建Nodejs+express+MongoDB后台环境搭建(财务管理系统课设)

# 实验平台

**操作系统**

（1） Window版本：Window10

（2） 系统类型：64为操作系统，基于x64的处理器

 **编辑工具**

Vscode

 **框架**

express

 **服务器**

node v14.4.0

 **打包工具**

webpack 

**数据库**

MongoDB v4.2.7

# 实验前准备

1. 安装好vscode等编辑器
2. 下载并安装node.js
3. 下载并安装mongodb



# 实验内容

#### 1. express搭建服务器

1.1 新建一个文件夹，命名为例如node-app

1.2 打开终端，cd到该文件夹目录下，初始化一个package.js

1.3 命令行输入npm init 

![Snipaste_2020-07-08_16-15-20](C:\Users\39567\Desktop\体系结构\3117005001-杨道潮-体系结构\实验三：语言与框架学习(vue+nodejs+express+mongodb)\imgs\Snipaste_2020-07-08_16-15-20.png)



1.4 此时会出现许多问题，根据自己的项目情况完成设置，入口文件命名为server.js

![Snipaste_2020-07-08_16-18-02](C:\Users\39567\Desktop\体系结构\3117005001-杨道潮-体系结构\实验三：语言与框架学习(vue+nodejs+express+mongodb)\imgs\Snipaste_2020-07-08_16-18-02.png)



1.5 初始化完成后，命令行输入touch server.js,创建入口文件

1.6 接下来我们要搭建本地的服务器，但此时先需要借助Express这个框架，于是命令行输入npm install express

![Snipaste_2020-07-08_16-23-29](C:\Users\39567\Desktop\体系结构\3117005001-杨道潮-体系结构\实验三：语言与框架学习(vue+nodejs+express+mongodb)\imgs\Snipaste_2020-07-08_16-23-29.png)

1.7 引入后我们需要在server.js引入express,并实例化app

```javascript
//server.js

const express = require("express")
const app = express()
```

1.8 接下来给它一个端口号，若在本地则为5000,并对app进行listen

```javascript
//server.js

const port = process.env.PORT || 5000;

app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
})
```

1.9 此时本地服务器搭建好了，通过node server.js运行

![Snipaste_2020-07-08_16-36-32](C:\Users\39567\Desktop\体系结构\3117005001-杨道潮-体系结构\实验三：语言与框架学习(vue+nodejs+express+mongodb)\imgs\Snipaste_2020-07-08_16-36-32.png)



1.10 但此时用浏览器是访问不到的，因为我们还没设置路由，因此我们在实例app下设置路由

```javascript
//server.js

app.get("/", (req, res) => {
    res.send('hello world');
})
```

1.11 重启服务器（安装nodemon自动刷新）

![Snipaste_2020-07-08_16-41-31](C:\Users\39567\Desktop\体系结构\3117005001-杨道潮-体系结构\实验三：语言与框架学习(vue+nodejs+express+mongodb)\imgs\Snipaste_2020-07-08_16-41-31.png)



1.12 此时打开网页localhost:5000

![Snipaste_2020-07-08_16-42-37](C:\Users\39567\Desktop\体系结构\3117005001-杨道潮-体系结构\实验三：语言与框架学习(vue+nodejs+express+mongodb)\imgs\Snipaste_2020-07-08_16-42-37.png)



#### 2. 连接mongodb数据库

2.1 搭建好服务器后接下来需要连接mongodb数据库，此时我们先需要安装mongoose来操作mongodb

![Snipaste_2020-07-08_16-50-27](C:\Users\39567\Desktop\体系结构\3117005001-杨道潮-体系结构\实验三：语言与框架学习(vue+nodejs+express+mongodb)\imgs\Snipaste_2020-07-08_16-50-27.png)

2.2 同时在server.js引入mongoose,

```javascript
//server.js

const mongoose = require("mongoose")
```

2.3 在node-app下新建一个文件夹config，在文件夹下新建db.js,专门存储数据库的地址

```javascript
//db.js

module.exports = {
    MongoURI: "mongodb://localhost:27017/ydc2020",
}; 
```

2.4 并在server.js下引入

```javascript
//server.js

//DB config
const db = require("./config/db.js").MongoURI;
```

2.5 连接DB，使用mongoose，提供promise

```javascript
//server.js

//Connect to mongodb
mongoose.connect(db)
        .then(()=>console.log("Mongodb CONNECTED"))
        .catch(err=>console.log(err));
```

2.6 重新刷新服务器，连接上mongodb

![Snipaste_2020-07-08_17-02-33](C:\Users\39567\Desktop\体系结构\3117005001-杨道潮-体系结构\实验三：语言与框架学习(vue+nodejs+express+mongodb)\imgs\Snipaste_2020-07-08_17-02-33.png)



#### 3. 搭建路由

3.1 在node-app下创建文件夹routes，并在此创建文件夹api, 再创建users.js，用于注册和登录接口

3.2 在users.js里引入express并实例化router

```javascript
//users.js

//@login register
const express = require("express");
const router = express.Router();

// $router GET api/users/test
// @desc  返回请求的json数据
// @access public
router.get("/ydc2020",(req,res)=>{
    res.json({msg:"login works"})
})

module.exports = router;
```

3.3 此时需要回到server.js引入users.js,并使用users

```javascript
//server.js

//引入users.js
const users = require("./router/api/users");

//使用routers
app.use("/api/users",users); 

```

3.4 测试是否得到json数据，刷新服务器，打开浏览器，得到返回信息![Snipaste_2020-07-08_17-14-30](C:\Users\39567\Desktop\体系结构\3117005001-杨道潮-体系结构\实验三：语言与框架学习(vue+nodejs+express+mongodb)\imgs\Snipaste_2020-07-08_17-14-30.png)

3.5 测试成功后，我们node-app下新建文件夹models，并在内新建User.js，此文件是登录和注册需要的schema

```javascript
//User.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create UserSchema
const UserSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    avatar:{
        type: String,
    },
    identity:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
})

module.exports = User = mongoose.model("users",UserSchema);
```



#### 搭建注册接口

4.1 设置注册路由,并引入bcrypt模块进行数据加密

```javascript

//$router POST api/users/test
//@desc  返回请求的json数据
//@access public
router.post("/register",(req,res)=>{
    //console.log(req.body);
    //查询数据库是否拥有邮箱
    User.findOne({email:req.body.email})
        .then((user)=>{
            if(user){
                return res.status(400).json("邮箱已被注册")
            }else{
                const avatar = gravatar.url(req.body.email, {s: '200', r:'pg', d:'mm'});

                const newUser = new User({
                    name:req.body.name,
                    email:req.body.email,
                    avatar,
                    password:req.body.password,
                    identity:req.body.identity
                })

                bcrypt.genSalt(10, function(err,salt){
                    bcrypt.hash(newUser.password, salt, (err,hash)=>{
                        //store hash in your password db
                        if(err) throw err;

                        newUser.password = hash;

                        newUser.save()
                                .then(user=>res.json(user))
                                .catch(err=>console.log(err));
                    });
                });
            }
        })
})

```

4.2 使用postman软件进行测试，得到post的json内容

![Snipaste_2020-07-08_17-25-47](C:\Users\39567\Desktop\体系结构\3117005001-杨道潮-体系结构\实验三：语言与框架学习(vue+nodejs+express+mongodb)\imgs\Snipaste_2020-07-08_17-25-47.png)

4.3 用mongodb可视化软件robo 3t看到数据库ydc2020存储了相关的信息





# 实验总结

对MongoDB和Node.js理解：

MongoDB

内存映射文件是OS通过mmap在内存中创建一个文件，并直接映射到虚拟内存。在数据操作的时候，OS会把需要操作的数据直接映射到物理内存中。

MongoDB通过journal进行故障恢复和持久化，系统在内存中分配一块区域给journal使用，称为private view。每隔100ms会刷新privateview到journal。因此发生故障时，丢失的也只是100ms的数据而已。但是开启journal后，虚拟内存的使用也会倍增。



Node.js

Node是服务器程序。本身运行的是Google的V8引擎，用于解释Javascript。它可以直接用Javascript写后台程序，使前台开发者也能快速开发后台代码，即HTML+Javascript+MongoDB，而无需像Tomcat的前台（HTML+Javascript）+后台（Java）+数据库（MySql）。

与Java等不同的是它连接到服务器的方式：

Java是多线程的，一个连接就是一个新线程，每个线程需要2M的配套内存的话，8G内存就只能维持4000个用户，想要达到更高的连接数只能增加增加服务器。

Node.js是单线程的，它支持数万的并发，在处理非计算型高密集I/O请求时，可以有更好的表现。
